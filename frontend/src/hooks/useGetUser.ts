import {useQuery} from "@tanstack/react-query"
import { getUserService } from "../services/userService"

const useGetUser = () => useQuery({
    queryKey: ['users'],
    queryFn: getUserService,
    retry: 2,
})


export default useGetUser