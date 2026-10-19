import {useQuery} from "@tanstack/react-query"
import { allCategoryService } from "../../services/categoryService"

const useGetCategory = () => useQuery({
    queryKey: ['categories'],
    queryFn: allCategoryService,
    retry: 2,
})


export default useGetCategory