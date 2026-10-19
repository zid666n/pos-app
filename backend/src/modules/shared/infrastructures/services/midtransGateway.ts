import Midtrans from "../../../../core/payment/Midtrans.ts"
import MidtransClient from "midtrans-client"

const midtransGateway = async () => {
    const instance = await Midtrans.getInstance()

    instance.createTransaction({
        transaction_details: {
            order_id: '1',
            gross_amount: 1000
        }
    })
}

export default midtransGateway