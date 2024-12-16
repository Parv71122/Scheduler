import { z } from 'zod';

const bookingValidationSchema = z.object({
    fullname: z.string().min(1, { message: 'Full name is required.' }),
    contactNo: z.string()
        .min(10, { message: 'Contact number must be at least 10 digits.' })
        .max(15, { message: 'Contact number must not exceed 15 digits.' })
        .regex(/^[0-9]+$/, { message: 'Contact number must contain only digits.' }),
    members: z.string()
        .min(1, { message: 'Number of members must be at least 1.' }),
    time: z.string().min(1, { message: 'Time is required.' }),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format.',
    }),
    table: z.string().optional(),
    reference: z.string().optional(),
    advance: z.string()
        .min(0, { message: 'Advance payment must be a non-negative number.' }),
    remarks: z.string().optional(),
    status: z.enum(['confirmed', 'processing', 'cancelled'], {
        errorMap: () => ({ message: 'Status must be one of confirmed, processing, or cancelled.' }),
    }),
});

export default bookingValidationSchema;
