export type TRequestPayload = {
    transactionDetails: Record<string, string|boolean|number>,
    itemDetails: Record<string, string|boolean|number>[]
}

export type TPaymentResponse<T> = {
    orderId: number,
    grossAmount: number,
    paymentGateway: T,
    items: Record<string, any>[],
}

export default interface PaymentInterface {
    pay<T>(payload: TRequestPayload): Promise<TPaymentResponse<T>>
}
