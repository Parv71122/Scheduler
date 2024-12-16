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
import { handleBookingAction } from "../../actions/bookingAction"

export function AddBooking() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create A Booking</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[700px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create A Booking</DialogTitle>
                    <DialogDescription>
                        Create a booking from here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <section>
                    <Form action={handleBookingAction} className="flex flex-col gap-4">
                        <div>
                            <Label className='inline-block mb-4' htmlFor='fullname'>Name</Label>
                            <Input type="text" id='fullname' name='fullname' placeholder='Enter your Full Name' />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='contactNo'>Contact Number</Label>
                            <Input type="tel" id='contactNo' name='contactNo' placeholder='Enter your Contact Number' />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='members'>Number of Members</Label>
                            <Input type="number" min={0} id='members' name='members' placeholder='Enter Number of Members' />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='time'>Time</Label>
                            <Input type="time" id='time' name='time' />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='date'>Date</Label>
                            <Input type="date" id='date' name='date' />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='table'>Table</Label>
                            <Input type="text" id='table' name='table' placeholder='Enter Allotted Table' />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='reference'>Reference</Label>
                            <Input type="text" id='reference' name='reference' placeholder='Enter Reference Code or Name' />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='advance'>Advance Payment</Label>
                            <Input type="number" min={0} id='advance' name='advance' placeholder='Enter Advance Amount' />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='remarks'>Remarks</Label>
                            <Input type="text" id='remarks' name='remarks' placeholder='Enter any Remarks or Special Requests' />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='status'>Status</Label>
                            <select id="status" name="status">
                                <option value="confirmed">Confirmed</option>
                                <option value="processing">Processing</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <DialogClose asChild>
                            <Button type="submit">Submit</Button>
                        </DialogClose>
                    </Form>
                </section>
            </DialogContent>
        </Dialog>
    )
}
