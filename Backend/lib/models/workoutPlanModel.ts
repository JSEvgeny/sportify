import * as mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";
import Exercise, { IExercise } from "./exerciseModel";

export interface IWorkoutPlan extends Document {
    userAccount: string;
    title: string;
    description?: string;
    createdAt: Date;
    exercises: IExercise[];
}

const WorkoutPlanSchema: Schema<IWorkoutPlan> = new Schema({
    userAccount: {
        type: Schema.Types.ObjectId,
        ref: "UserAccount"
    },
    title: {
        type: String,
        required: "Plan title is required"
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }]
});

const WorkoutPlan: Model<IWorkoutPlan> = mongoose.model<IWorkoutPlan>("WorkoutPlan", WorkoutPlanSchema);

export default WorkoutPlan;
