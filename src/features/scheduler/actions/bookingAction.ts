"use server"

import { connectToDatabase } from "@/lib/mongoose"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import bookingValidationSchema from "../validation/bookingValidation"
import Bookings from "@/schemas/bookingSchema"
import { revalidatePath } from "next/cache"
import mongoose from "mongoose"

const handleBookingAction = async (formData: FormData) => {

    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    const userDetails = jwt.decode(token?.value as unknown as string) as UserDetails

    const fullname = formData.get('fullname');
    const contactNo = formData.get('contactNo');
    const members = formData.get('members');
    const time = formData.get('time');
    const date = formData.get('date');
    const reference = formData.get('reference');
    const advance = formData.get('advance');
    const remarks = formData.get('remarks');
    const status = formData.get('status');
    const user_id = userDetails?.user?.id
    const requestBody = {
        user_id, fullname, contactNo, members, time, date, reference, advance, remarks, status
    }

    const validatedFields = bookingValidationSchema.safeParse(requestBody)

    try {
        if (!validatedFields.success) {
            console.error(validatedFields.error.flatten().fieldErrors)
            return
        } else {
            await connectToDatabase()
            const newBooking = await Bookings.create(requestBody)
            await newBooking.save()
            revalidatePath('/bookings')
        }
    } catch (error) {
        console.log(error)
    }

}

const getAllUserBookings = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    const userDetails = jwt.decode(token?.value as unknown as string) as UserDetails;

    if (!token || !userDetails) {
        throw new Error("Unauthorized: No token or user details found.");
    }

    const user_id = userDetails?.user?.id;

    try {
        await connectToDatabase();
        const bookings = await Bookings.find({ user_id }).exec();
        return bookings.map(booking => booking.toObject());
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        throw new Error("Error fetching bookings");
    }
};

const handleDeleteBookingAction = async (bookingId: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    const userDetails = jwt.decode(token?.value as unknown as string) as UserDetails;

    if (!token || !userDetails) {
        throw new Error("Unauthorized: No token or user details found.");
    }

    const user_id = userDetails?.user?.id;

    // Validate bookingId
    console.log("🚀 ~ handleDeleteBookingAction ~ bookingId:", bookingId)
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        throw new Error("Invalid booking ID format.");
    }

    try {
        await connectToDatabase();

        // Find the booking by ID and ensure it belongs to the user
        const booking = await Bookings.findOne({ _id: bookingId, user_id });

        if (!booking) {
            throw new Error("Booking not found or you do not have permission to delete this booking.");
        }

        // Delete the booking
        await Bookings.deleteOne({ _id: bookingId });

        // Optionally revalidate the bookings page or any other related paths
        revalidatePath('/bookings');

        return { success: true, message: "Booking deleted successfully." };
    } catch (error) {
        console.error("Error deleting booking:", error);
        throw new Error("Error deleting booking");
    }
};

export { getAllUserBookings, handleBookingAction, handleDeleteBookingAction };