import { Schema, Document } from "mongoose";
import { model } from "mongoose";

export interface JournalEntry extends Document {
  title: string;
  content: string;
  userName: string;
  createdAt: Date;
}

export const JournalEntrySchema: Schema<JournalEntry> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<JournalEntry>("JournalEntry", JournalEntrySchema);
