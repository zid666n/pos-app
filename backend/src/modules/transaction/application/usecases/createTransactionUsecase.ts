import createTransactionService, { type TCreateTransactionPayload } from "../../../shared/infrastructures/services/createTransactionService.ts"

const createTransactionUsecase = async (p: TCreateTransactionPayload) => {
    const result = await createTransactionService(p)
}

export default createTransactionUsecase