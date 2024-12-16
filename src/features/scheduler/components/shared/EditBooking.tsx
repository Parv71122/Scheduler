import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Form from "next/form"
import { handleUpdateBookingAction } from "../../actions/bookingAction"

interface EditBookingProps {
    booking: {
        _id: string; // Ensure this is included
        fullname: string;
        contactNo: string;
        members: string;
        time: string;
        date: string;
        table: string;
        reference: string;
        advance: string;
        remarks?: string;
        status: string;
    };
}

export function EditBooking({ booking }: EditBookingProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <p>Edit Booking Details</p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[700px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Booking</DialogTitle>
                    <DialogDescription>
                        Update your booking details below. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <section>
                    <Form action={handleUpdateBookingAction} className="flex flex-col gap-4">
                        {/* Hidden Field for Booking ID */}
                        <input type="hidden" name="bookingId" value={booking._id} />

                        {/* Fields */}
                        <div>
                            <Label className='inline-block mb-4' htmlFor='fullname'>Name</Label>
                            <Input
                                type="text"
                                id='fullname'
                                name='fullname'
                                placeholder='Enter your Full Name'
                                defaultValue={booking.fullname}
                                required
                            />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='contactNo'>Contact Number</Label>
                            <Input
                                type="tel"
                                id='contactNo'
                                name='contactNo'
                                placeholder='Enter your Contact Number'
                                defaultValue={booking.contactNo}
                                required
                            />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='members'>Number of Members</Label>
                            <Input
                                type="number"
                                min={0}
                                id='members'
                                name='members'
                                placeholder='Enter Number of Members'
                                defaultValue={booking.members}
                                required
                            />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='time'>Time</Label>
                            <Input
                                type="time"
                                id='time'
                                name='time'
                                defaultValue={booking.time}
                                required
                            />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='date'>Date</Label>
                            <Input
                                type="date"
                                id='date'
                                name='date'
                                defaultValue={booking.date}
                                required
                            />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='table'>Table</Label>
                            <Input
                                type="text"
                                id='table'
                                name='table'
                                placeholder='Enter Allotted Table'
                                defaultValue={booking.table}
                            />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='reference'>Reference</Label>
                            <Input
                                type="text"
                                id='reference'
                                name='reference'
                                placeholder='Enter Reference Code or Name'
                                defaultValue={booking.reference}
                            />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='advance'>Advance Payment</Label>
                            <Input
                                type="number"
                                min={0}
                                id='advance'
                                name='advance'
                                placeholder='Enter Advance Amount'
                                defaultValue={booking.advance}
                            />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='remarks'>Remarks</Label>
                            <Input
                                type="text"
                                id='remarks'
                                name='remarks'
                                placeholder='Enter any Remarks or Special Requests'
                                defaultValue={booking.remarks}
                            />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='status'>Status</Label>
                            <select id="status" name="status" defaultValue={booking.status}>
                                <option value="confirmed">Confirmed</option>
                                <option value="processing">Processing</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <DialogClose asChild>
                            <Button type="submit">Submit</Button>
                        </DialogClose>
                    </Form>
                </section>

            </DialogContent>
        </Dialog>
    );
}
