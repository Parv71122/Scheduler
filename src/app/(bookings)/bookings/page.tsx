import { getAllUserBookings } from '@/features/scheduler/actions/bookingAction'
import { AddBooking } from '@/features/scheduler/components/shared/AddBooking'
import { DataTable } from '@/features/scheduler/components/shared/BookingTable'
import React from 'react'

const BookingRoute = async () => {
    const userBookings = await getAllUserBookings()
    const plainBookings = userBookings.map(booking => ({
        ...booking,
        _id: booking._id.toString(), // Convert ObjectId to string
    }));

    return (
        <main className='wrapper'>
            <section className='box'>
                <AddBooking />
                <DataTable userBookings={plainBookings} />
            </section>
        </main>
    )
}

export default BookingRoute