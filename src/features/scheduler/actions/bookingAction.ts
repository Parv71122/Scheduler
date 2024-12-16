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
    const table = formData.get('table');
    const reference = formData.get('reference');
    const advance = formData.get('advance');
    const remarks = formData.get('remarks');
    const status = formData.get('status');
    const user_id = userDetails?.user?.id
    const requestBody = {
        user_id, fullname, contactNo, members, time, date, table, reference, advance, remarks, status
    }
    console.log("🚀 ~ handleBookingAction ~ requestBody:", requestBody)

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

const handleUpdateBookingAction = async (formData: FormData): Promise<void> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    const userDetails = jwt.decode(token?.value as unknown as string) as UserDetails;
    
    const bookingId = formData.get('bookingId'); // Assuming you pass the booking ID in the form data
    const fullname = formData.get('fullname') as string;
    const contactNo = formData.get('contactNo') as string;
    const members = formData.get('members') as string;
    const time = formData.get('time') as string;
    const date = formData.get('date') as string;
    const table = formData.get('table') as string;
    const reference = formData.get('reference') as string;
    const advance = formData.get('advance') as string;
    const remarks = formData.get('remarks') as string;
    const status = formData.get('status') as string;
    const user_id = userDetails?.user?.id;
    console.log("User ID:", user_id);
    console.log("Booking ID:", bookingId);
    // console.log("Request Body:", requestBody);

    // Create request body
    const requestBody = {
        user_id,
        fullname,
        contactNo,
        members,
        time,
        date,
        table,
        reference,
        advance,
        remarks,
        status
    };

    console.log("🚀 ~ handleUpdateBookingAction ~ requestBody:", requestBody);

    // Validate fields
    const validatedFields = bookingValidationSchema.safeParse(requestBody);

    try {
        if (!validatedFields.success) {
            console.error(validatedFields.error.flatten().fieldErrors);
            // Optionally notify user about validation errors
            return; // Early return on validation failure
        }

        await connectToDatabase();

        // Find and update the booking
        const updatedBooking = await Bookings.findOneAndUpdate(
            { _id: bookingId, user_id }, // Ensure the user owns the booking
            requestBody,
            { new: true } // Return the updated document
        );

        if (!updatedBooking) {
            throw new Error("Booking not found or you do not have permission to update this booking.");
        }

        revalidatePath('/bookings');

    } catch (error) {
        console.error("Error updating booking:", error);
    }
};


export { getAllUserBookings, handleBookingAction, handleDeleteBookingAction, handleUpdateBookingAction };