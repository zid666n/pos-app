import type { TPaymentResponse, TRequestPayload } from "./PaymentInterface.ts";
import type PaymentInterface from "./PaymentInterface.ts";
import MidtransClient from "midtrans-client";

class Midtrans implements PaymentInterface {
    private static me: Midtrans | null

    private snap: MidtransClient.Snap | null

    constructor() {
        this.snap = new MidtransClient.Snap({
            clientKey: process.env.MIDTRANS_CLIENT_KEY || "client-key",
            isProduction: Boolean(process.env.MIDTRANS_IS_PRODUCTION) || false,
            serverKey: process.env.MIDTRANS_SERVER_KEY || "server-key"
        })
    }

    static getInstance() {
        if (this.me === null) {
            this.me = new this()
        }

        return this.me
    }

    async pay<T>(payload: TRequestPayload): Promise<TPaymentResponse<T>> {
        const parameter = {
            transaction_details: {
                order_id: String(payload.transactionDetails.order_id),
                gross_amount: Number(payload.transactionDetails.total)
            },
            item_details: payload.itemDetails,
            enable_payments: ['gopay']
        }

        if (this.snap === null) throw new Error(`Init First! Midtrans payment error`)
        const res = await this.snap.createTransaction(parameter)

        return {
            orderId: Number(payload.transactionDetails.order_id),
            items: payload.itemDetails,
            grossAmount: Number(payload.transactionDetails.gross_amount),
            paymentGateway: res as T
        }
    }
}

export default Midtrans