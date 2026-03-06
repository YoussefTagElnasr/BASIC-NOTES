import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaBetterSqlite3  } from "@prisma/adapter-better-sqlite3";


const adapter = new PrismaBetterSqlite3 ({
  url: "file:./DB/notes.db",
});
const prisma = new PrismaClient({ adapter });

export default prisma;