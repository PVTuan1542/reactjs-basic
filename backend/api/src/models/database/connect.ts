import { Pool } from "pg";
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "SocialNetwork",
  password: "123456",
  port: 5432,
});
pool.on("error", (err: any, client: any) => {
  console.error("Error:", err);
});

export default pool
