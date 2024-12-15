import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define the type for booking props
interface ViewBookingProps {
  booking: {
    fullname: string;
    contactNo: string;
    members: string;
    time: string;
    date: string;
    reference: string;
    advance: string;
    remarks?: string;
    status: string;
  };
}

const ViewBooking = ({ booking }: ViewBookingProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Booking Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>
            View all the details of the booking below.
          </DialogDescription>
        </DialogHeader>
        <section className="flex flex-col gap-4">
          <div>
            <strong>Name:</strong> {booking.fullname}
          </div>
          <div>
            <strong>Contact Number:</strong> {booking.contactNo}
          </div>
          <div>
            <strong>Number of Members:</strong> {booking.members}
          </div>
          <div>
            <strong>Time:</strong> {booking.time}
          </div>
          <div>
            <strong>Date:</strong> {booking.date}
          </div>
          <div>
            <strong>Reference:</strong> {booking.reference}
          </div>
          <div>
            <strong>Advance Payment:</strong> ${booking.advance}
          </div>
          <div>
            <strong>Remarks:</strong> {booking.remarks || "N/A"}
          </div>
          <div>
            <strong>Status:</strong> {booking.status}
          </div>
        </section>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBooking;
