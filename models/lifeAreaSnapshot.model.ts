import { Schema, Document } from "mongoose";
import { model } from "mongoose";

export interface LifeArea {
    label: string;
    icon: string;
    value: number;
}

export interface LifeAreaSnapshot extends Document {
    title: string;
    lifeareas: LifeArea[];
    createdAt: Date;
    userId: string;
}

export const LifeAreaSnapshotSchema: Schema<LifeAreaSnapshot> = new Schema({
    title: { type: String, required: true },
    lifeareas: { type: [{label: String, icon: String, value: Number}], required: true },
    createdAt: { type: Date, default: Date.now },
    userId: { type: String, required: true },
});

export default model<LifeAreaSnapshot>("LifeAreaSnapshot", LifeAreaSnapshotSchema);
