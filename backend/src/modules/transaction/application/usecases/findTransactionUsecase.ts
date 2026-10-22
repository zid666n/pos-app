import findTransactionService from "../../../shared/infrastructures/services/findTransactionService.ts"

const findTransactionUsecase = async (id: number) => {
    return await findTransactionService(id)
}

export default findTransactionUsecase