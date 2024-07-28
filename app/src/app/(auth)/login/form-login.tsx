"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginBody, LoginBodyType,  } from "@/schemaValidations/auth.schema"
import { toast, useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import { useAppContext } from '@/app/app-provider'

import authApiRequest from "@/apiRequests/auth"
const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { setUser } = useAppContext()
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email : "",
      password : "",
    },
  })
  async function onSubmit(values: LoginBodyType) {
    if (loading) return
    setLoading(true)
    try {
      const result = await authApiRequest.login(values)
      await authApiRequest.auth({
        sessionToken: result.payload.data.token,
        expiresAt: result.payload.data.expiresAt
      })
      toast({
        description: result.payload.message
      })
      setUser(result.payload.data.account)
      router.push('/')
      router.refresh()
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className='space-y-2 max-w-[600px] flex-shrink-0 w-full'>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button className='!mt-8 w-full' type="submit">Sign In</Button>
      </form>
    </Form>
  )
}

export default LoginForm