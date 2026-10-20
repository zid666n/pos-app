import { useQuery } from "@tanstack/react-query"
import { allProductService } from "../../services/productService"

const useGetProduct = () => useQuery({
    queryKey: ['products'],
    queryFn: allProductService,
    retry: 2,
})

export default useGetProduct