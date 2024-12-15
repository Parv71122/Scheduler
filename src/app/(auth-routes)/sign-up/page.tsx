import React from 'react'
import Form from 'next/form'
import { submitSignupValues } from '@/features/users/actions/userActions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
const SignupRoute = () => {
    return (
        <main className='wrapper center'>
            <section className="box center">
                <div className='w-1/2 mx-auto p-8 border shadow-lg rounded-lg'>
                <h2 className="text-center text-2xl font-semibold mb-6">Sign Up</h2> {/* Heading added here */}
                    <Form action={submitSignupValues} className='flex flex-col gap-4'>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='fullname'>Name</Label>
                            <Input type="text" id='fullname' name='fullname' placeholder='Enter your Full Name' />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='email'>Email</Label>
                            <Input type="text" id='email' name='email' placeholder='Enter your Email Address' />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='fullname'>Password</Label>
                            <Input id='password' name='password' type="password" placeholder='Enter your Password' />
                        </div>
                        <Button type="submit">Submit</Button>
                    </Form>
                </div>
            </section>
        </main>
    )
}

export default SignupRoute
