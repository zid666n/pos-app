import prisma from "../src/core/databases/prisma.ts"
import { userSeeder } from "../src/core/databases/seeder/userSeeder.ts"

async function main () {
    await userSeeder()
}

main()
.catch((e: Error) => {
    console.error(e)
    process.exit(1)
})
.finally(async () => {
    await prisma.$disconnect()
})