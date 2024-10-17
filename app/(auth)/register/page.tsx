"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { z } from "zod";
import Link from "next/link";

const formSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string().email(),
  })
  .and(passwordMatchSchema);

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const onSubmit = (data: z.infer<typeof formSchema>) => {};

  return (
    <div className='min-h-screen bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center text-green-800'>
            Register
          </CardTitle>
          <CardDescription className='text-center'>
            Your sustainable auction marketplace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <fieldset
                disabled={form.formState.isSubmitting}
                className='flex flex-col gap-2'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Mail className='absolute left-3 top-2 h-5 w-5 text-gray-400' />
                          <Input
                            {...field}
                            type='email'
                            placeholder='Enter your email'
                            className='pl-10'
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Lock className='absolute left-2 top-2 h-5 w-5 text-gray-400' />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder='Password'
                            className='pl-10'
                          />
                          <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-3 top-2 text-gray-400'
                          >
                            {showPassword ? (
                              <EyeOff className='h-5 w-5' />
                            ) : (
                              <Eye className='h-5 w-5' />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='passwordConfirm'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Lock className='absolute left-2 top-2 h-5 w-5 text-gray-400' />
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder='Confirm Password'
                            className='pl-10'
                          />
                          <button
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className='absolute right-3 top-2 text-gray-400'
                          >
                            {showConfirmPassword ? (
                              <EyeOff className='w-5 h-5' />
                            ) : (
                              <Eye className='w-5 h-5' />
                            )}
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='mt-4 w-full bg-green-600 hover:bg-green-700'
                >
                  Login
                </Button>
              </fieldset>
            </form>
          </Form>
        </CardContent>

        <CardFooter className='flex-col'>
          <div className='text-muted-foreground text-sm'>
            Already have a account?{" "}
            <Link href={"/login"} className='underline'>
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
