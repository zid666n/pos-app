import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError.ts"
import { findUser } from "../../infrastructures/repositories/userRepository.ts"

const findUserUsecase = async (id: number) => {
    const user = await findUser(id)

    if (!user) throw new ItemNotFoundError("User")

    return user
}

export default findUserUsecase