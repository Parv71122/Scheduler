interface UserDetails extends JwtPayload {
    user?: {
        id?:string
        fullname?: string;
        email?: string
    };
}

type Bookings = {
    user_id: string
    name: string
    contactNo: number
    members: number
    time: string
    date: string
    reference: string
    advance: number
    remarks: string
    status: "confirmed" | "processing" | "cancelled"
  }
  