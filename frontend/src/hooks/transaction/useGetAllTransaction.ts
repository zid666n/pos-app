import { useQuery } from "@tanstack/react-query"
import { getTransactionService } from "../../services/transactionService"

const useGetAllTransaction = () => useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactionService,
    retry: 2,
})

export default useGetAllTransaction