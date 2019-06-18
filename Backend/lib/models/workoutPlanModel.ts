import * as mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";

export interface IWorkoutPlan extends Document {
    userAccountId: string;
    title: string;
    description?: string;
    createdAt: Date;
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
    }
});

const WorkoutPlan: Model<IWorkoutPlan> = mongoose.model<IWorkoutPlan>("WorkoutPlan", WorkoutPlanSchema);

export default WorkoutPlan;
