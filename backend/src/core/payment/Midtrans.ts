import type { TRequestPayload } from "./PaymentInterface.ts";
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

    pay(payload: TRequestPayload): void {
        const parameter = {
            transaction_details: {
                gross_amount: Number(payload.transactionDetails.total)
            },
            item_details: payload.itemDetails,
            enable_payments: ['gopay']
        }
    }
}

export default Midtrans