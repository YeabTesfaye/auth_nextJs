import db, { Training } from "./db";

export function getTrainings(): Training[] {
  const stmt = db.prepare("SELECT * FROM trainings");
  return stmt.all() as Training[];
}
