import db from "./db";

export function createUser(email: string, password: string) {
  db.prepare(`SELECT COUNT(*) as count FROM users WHERE email = ?`).get(email);
  const result = db
    .prepare(`INSERT INTO users (email,password) VALUES (?,?)`)
    .run(email, password);
  return result.lastInsertRowid;
}
