import React from 'react'
import Form from 'next/form'
import { submitLoginValues } from '@/features/users/actions/userActions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'


const LoginRoute = () => {
    return (
        <main className='wrapper center'>
            <section className="box center">
                <div className='w-1/2 mx-auto p-8 border shadow-lg rounded-lg'>
                    <h2 className="text-center text-2xl font-semibold mb-6">Sign In</h2> {/* Heading added here */}
                    <Form action={submitLoginValues} className='flex flex-col gap-4'>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='email'>Email</Label>
                            <Input type="text" id='email' name='email' placeholder='Enter your Email Address' />
                        </div>
                        <div>
                            <Label className='inline-block mb-4' htmlFor='password'>Password</Label>
                            <Input id='password' name='password' type="password" placeholder='Enter your Password' />
                        </div>
                        <Button type="submit">Submit</Button>
                    </Form>
                </div>
            </section>
        </main>
    )
}

export default LoginRoute
