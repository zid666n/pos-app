import prisma from "../../../../core/databases/prisma.ts"
export type TUser = {
    id: number,
    name: string,
    email: string,
}

export type TUserPayload = {
    name: string,
    email: string,
    password: string|null
}

export const getUsers = async (): Promise<TUser[]> => {
    const rows = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true
        },
        orderBy: {
            id: "desc"
        }
    })

    return rows
}

export const findUser = async (id: number): Promise<TUser|null> => {
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            created_at: true,
            email: true,
            name: true,
            updated_at: true
        },
        where: {
            id: id
        }
    })

    return user
}

export const createUser = async (payload: TUserPayload & {password: string}): Promise<TUser> => {
    const res = await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: payload.password
        }
    })
    
    return res
}

export const updateUser = async (id: number, payload: TUserPayload): Promise<void> => {
    const data = {
        name: payload.name,
        email: payload.email
    }

    await prisma.user.update({
        select: {
            id: true,
            name: true,
            email: true
        },
        data: payload.password ? {...data, password: payload.password} : data,
        where: {
            id: id
        }
    })
}

export const deleteUser = async (id: number): Promise<void> => {
    await prisma.user.delete({
        select: {
            id: true
        },
        where: {
            id: id
        }
    })
}