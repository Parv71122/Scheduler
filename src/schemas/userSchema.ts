import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    fullname: string;
    email: string;
    password: string
}

const UserSchema: Schema<IUser> = new Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
