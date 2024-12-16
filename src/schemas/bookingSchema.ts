import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
    _id: string;
    user_id: string;
    fullname: string;
    contactNo: string;
    members: string;
    time: string;
    date: string;
    table: string;
    reference: string;
    advance: string;
    remarks?: string;
    status: "confirmed" | "processing" | "cancelled";
}

const bookingSchema = new Schema<IBooking>({
    user_id: { type: String, required: true },
    fullname: { type: String, required: true },
    contactNo: { type: String, required: true },
    members: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    table: { type: String, required: false },
    reference: { type: String, required: false },
    advance: { type: String, required: true },
    remarks: { type: String, required: false },
    status: { 
        type: String, 
        enum: ["confirmed", "processing", "cancelled"], 
        required: true 
    }
});

const Bookings = mongoose.models.Bookings || mongoose.model<IBooking>('Bookings', bookingSchema);

export default Bookings;
