export type TRequestPayload = {
    transactionDetails: Record<string, string|boolean|number>,
    itemDetails: Record<string, string|boolean|number>[]
}

export default interface PaymentInterface {
    pay(payload: TRequestPayload): void 
}
