import loginService, { type TLoginPayload } from "../../../shared/infrastructures/services/loginService.ts"

const useLoginUsecase = async (payload: TLoginPayload) => {
    const res = await loginService(payload)

    return res
}

export default useLoginUsecase