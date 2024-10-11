import db from "./db";
interface existingUserInterface {
  count: number;
}
export function createUser(email: string, password: string) {
  const existingUser = db
    .prepare(`SELECT COUNT(*) as count FROM users WHERE email = ?`)
    .get(email) as existingUserInterface;
  if (existingUser.count > 0) {
    throw new Error("Email is already in use.");
  }
  const result = db
    .prepare(`INSERT INTO users (email,password) VALUES (?,?)`)
    .run(email, password);
  console.log(result);
  return result.lastInsertRowid;
}
