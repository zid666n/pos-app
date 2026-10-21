import allTransactionService from "../../../shared/infrastructures/services/allTransactionService.ts"

const getAllTransactionUsecase = async () => {
    return await allTransactionService()
}

export default getAllTransactionUsecase