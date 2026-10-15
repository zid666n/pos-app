import type { TPaymentResponse, TRequestPayload } from "./PaymentInterface.ts";
import type PaymentInterface from "./PaymentInterface.ts";

class PaymentAdapter {
    private payment: PaymentInterface
    
    constructor(instance: PaymentInterface) {
        this.payment = instance
    }

    async createTransaction<T>(parameter: TRequestPayload): Promise<TPaymentResponse<T>> {
        const res = await this.payment.pay<T>(parameter)

        return {
            orderId: res.orderId,
            items: res.items,
            grossAmount: res.grossAmount,
            paymentGateway: res as T
        }
    }
}

export default PaymentAdapter