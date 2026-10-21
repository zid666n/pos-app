import Database from "../databases/Database.ts"
import ItemNotFoundError from "../../application/exceptions/ItemNotFoundError.ts"
import Midtrans from "../../../../core/payment/Midtrans.ts"
import type { TProduct } from "../../../product/infrastructures/repositories/productRepository.ts"
import ApplicationException from "../../application/exceptions/ApplicationException.ts"
import type { RowDataPacket } from "mysql2"
import generateOrderNumber from "../../application/services/generateOrderNumber.ts"

export type TTransactionResult = {
    item_details: {
        product_id: number,
        name: string,
        quantity: number,
        price: number
    }[]
    ,
    payment_details: {
        cashReceive: number,
        changes: number,
        total: number,
    },
    payment_gateway: null | {
        token: string,
        redirect_url: string
    },
    transaction_details: {
        status: string,
        orderNumber: string
    }
}

export type TCreateTransactionPayload = {
    order_number: string
    user_id: number
    payment_method: number
    tax: number
    pay: number,
    items: {
        product_id: number,
        quantity: number,
    }[]
}

type TOrder = {
    order_number: string,
    user_id: number,
    payment_method: number,
    subtotal: number,
    tax: number,
    total: number
}

const createTransactionService = async (p: TCreateTransactionPayload): Promise<TTransactionResult> => {
    const connection = await Database.transaction()
    
    try {
        let change: number = 0
        let status = "pending"
        const TAX_RATE = 0.1
        let paymentGateway = null

        const itemDetails = await Promise.all(
            p.items.map(async product => {
                const [res] = await Database.query<(TProduct|null) & RowDataPacket[]>(`SELECT * FROM products WHERE id = ?`, [product.product_id])
        
                if(!res) throw new ItemNotFoundError("Product")

                return {
                    product_id: product.product_id,
                    name: res.name,
                    price: res.price,
                    quantity: product.quantity
                }
            })
        )

        const grossAmount = itemDetails.reduce((acc, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;

            return Number(acc) + (price * quantity);
        }, 0);

        if (Number(p.pay) < grossAmount) throw new ApplicationException("Cash less then the total..", 400);

        if (p.payment_method === 2) {
            change = Number(p.pay) - Number(grossAmount)
            status = 'settlement'

        } else if (p.payment_method === 1) {
            const instance = Midtrans.getInstance()
    
            const param = {
                transaction_details: {
                    gross_amount: grossAmount,
                    order_id: 'trx-0'
                },
                items_details: p.items,
                enable_payments: ['gopay'],
            } as any
    
            paymentGateway = await instance.createTransaction(param)
        }

        const result = await Database.insert<TOrder>([
            'order_number',
            'user_id',
            'payment_method',
            'subtotal',
            'pay',
            'tax',
            'total'
        ], [
            await generateOrderNumber(),
            p.user_id,
            p.payment_method,
            grossAmount,
            p.pay,
            p.tax,
            grossAmount
        ], 'orders')

        await connection.commit()
        await connection.release()

        return {
            item_details: itemDetails,
            transaction_details: {
                orderNumber: result.order_number,
                status: status
            },
            payment_details: {
                cashReceive: p.pay,
                changes: change,
                total: grossAmount
            },
            payment_gateway: paymentGateway
        }
    } catch (error) {
        await connection.rollback()
        await connection.release()

        throw error
    }
}

export default createTransactionService