/**
 * Prisma ORM for Database
 */

import { PrismaClient } from "@prisma/client";
// orgiinal Implementation Start
//const prisma = new PrismaClient();
// orgiinal Implementation Start

// Alternative Implementation reuse connection
const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
export default prisma;
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
