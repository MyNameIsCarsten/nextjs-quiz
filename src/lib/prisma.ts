import { PrismaClient } from '@prisma/client';

// Prisma is a typesafe database client for typescript & node
// Used for ORM (Object-Relational Mapping) - Objects are saved in relational database
// SQL is being used as language for querying and updating the database
// SQlite = relational database
const prisma = new PrismaClient({
    log: ['query'], // Logs all executed SQL queries
});
export default prisma;