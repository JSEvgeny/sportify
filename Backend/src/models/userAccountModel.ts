import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import { Schema, Document, Model } from "mongoose";
import { IWorkoutPlan } from "./workoutPlanModel";

export interface IUserAccount extends Document {
    login: string;
    email: string;
    password: string;
    confirmed: boolean;
    createdAt: Date;
    workoutPlans: IWorkoutPlan[];
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserAccountSchema = new Schema<IUserAccount>({
    login: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    timestamps: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date
        }
    },
    workoutPlans: [{ type: Schema.Types.ObjectId, ref: "WorkoutPlan" }]
});

UserAccountSchema.pre<IUserAccount>("save", function(next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return next();

    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
});

UserAccountSchema.pre<IUserAccount>("update", function(next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return next();

    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
});

UserAccountSchema.methods.comparePassword = function(candidatePassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, success) => {
            if (err) return reject(err);
            return resolve(success);
        });
    });
};

const UserAccount: Model<IUserAccount> = mongoose.model<IUserAccount>("UserAccount", UserAccountSchema);

export default UserAccount;
