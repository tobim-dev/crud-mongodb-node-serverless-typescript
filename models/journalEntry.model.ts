import { Schema, Document } from "mongoose";
import { model } from "mongoose";

export interface JournalEntry extends Document {
  title: string;
  content: string;
  date: Date;
  entryDayTime: "Morning" | "Evening";
  createdAt?: Date;
  userId: string;
}

export const JournalEntrySchema: Schema<JournalEntry> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  entryDayTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
});

export default model<JournalEntry>("JournalEntry", JournalEntrySchema);
