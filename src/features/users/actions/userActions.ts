"use server"

import { connectToDatabase } from "@/lib/mongoose"
import User from "@/schemas/userSchema"
import bcrypt from 'bcrypt'
import { signupFormSchema } from "../validation/FormValidation"
import { redirect } from "next/navigation"
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers"

const submitSignupValues = async (formData: FormData): Promise<void> => {
    const fullname = formData.get('fullname') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const hashedPassword = bcrypt.hashSync(password, 12)
    const requestBody = { fullname, email, password: hashedPassword }

    const validatedFields = signupFormSchema.safeParse({
        fullname: fullname,
        email: email,
        password: password
    })

    try {
        if (!validatedFields.success) {
            console.error(validatedFields.error.flatten().fieldErrors)
            return
        } else {
            await connectToDatabase()
            const newUser = await User.create(requestBody)
            await newUser.save()
        }
    } catch (error) {
        console.log(error)
    }
    redirect('/login')
}

const submitLoginValues = async (formData: FormData): Promise<void> => {
    const email = formData.get('email') as string
    const enteredPassword = formData.get('password') as string
    const cookieStore = await cookies()
    try {
        await connectToDatabase()
        const user = await User.findOne({ email })
        if (!user) {
            console.error("User not found")
            return
        }
        const isPasswordValid = bcrypt.compareSync(enteredPassword, user.password)
        if (!isPasswordValid) {
            console.error("Invalid password")
            return
        }
        const jwtDetails = {
            id: user._id,
            fullname: user.fullname,
            email: user.email
        }
        const token = jwt.sign({ user: jwtDetails }, process.env.JWT_SECRET as string)
        cookieStore.set('token', token, { path: '/' })
    } catch (error) {
        console.log(error)
    }
    redirect('/')
}

const handleLogoutAction = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    redirect('/login')
}

export { submitSignupValues, submitLoginValues, handleLogoutAction }
