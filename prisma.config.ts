import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    url: "file:./DB/notes.db"
  }
});