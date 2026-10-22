import bcrypt from "bcrypt"

const hashService = async (val: string) => {
    return bcrypt.hash(val, 10)
}

export default hashService