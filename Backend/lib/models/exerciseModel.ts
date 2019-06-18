import * as mongoose from "mongoose";
import { Schema, Model, Document} from "mongoose";

export interface IExercise {
    title: string,
    description?: string
    sets: number;
    reps: number;
}