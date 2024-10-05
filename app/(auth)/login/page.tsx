"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Facebook, Github, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  return (
    <div className='min-h-screen bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center text-green-800'>
            Welcome to EcoBid
          </CardTitle>
          <CardDescription className='text-center'>
            Your sustainable auction marketplace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='login'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='login'>Login</TabsTrigger>
              <TabsTrigger value='register'>Register</TabsTrigger>
            </TabsList>
            <TabsContent value='login'>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div>
                  <Label htmlFor='email'>Email</Label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                    <Input
                      id='email'
                      type='email'
                      placeholder='Enter your email'
                      className='pl-10'
                      {...register("email", { required: "Email is required" })}
                    />
                  </div>
                  {errors.email && (
                    <p className='text-red-500 text-sm mt-1'>
                      {/* {errors.email.message} */}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor='password'>Password</Label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                    <Input
                      id='password'
                      type={showPassword ? "text" : "password"}
                      placeholder='Enter your password'
                      className='pl-10'
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-3 text-gray-400'
                    >
                      {showPassword ? (
                        <EyeOff className='h-5 w-5' />
                      ) : (
                        <Eye className='h-5 w-5' />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className='text-red-500 text-sm mt-1'>
                      {/* {errors.password.message} */}
                    </p>
                  )}
                </div>
                <Button
                  type='submit'
                  className='w-full bg-green-600 hover:bg-green-700'
                >
                  Login
                </Button>
              </form>
            </TabsContent>
            <TabsContent value='register'>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div>
                  <Label htmlFor='name'>Full Name</Label>
                  <div className='relative'>
                    <User className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                    <Input
                      id='name'
                      type='text'
                      placeholder='Enter your full name'
                      className='pl-10'
                      {...register("name", {
                        required: "Full name is required",
                      })}
                    />
                  </div>
                  {errors.name && (
                    <p className='text-red-500 text-sm mt-1'>
                      {/* {errors.name.message} */}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor='email'>Email</Label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                    <Input
                      id='email'
                      type='email'
                      placeholder='Enter your email'
                      className='pl-10'
                      {...register("email", { required: "Email is required" })}
                    />
                  </div>
                  {errors.email && (
                    <p className='text-red-500 text-sm mt-1'>
                      {/* {errors.email.message} */}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor='password'>Password</Label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                    <Input
                      id='password'
                      type={showPassword ? "text" : "password"}
                      placeholder='Create a password'
                      className='pl-10'
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-3 text-gray-400'
                    >
                      {showPassword ? (
                        <EyeOff className='h-5 w-5' />
                      ) : (
                        <Eye className='h-5 w-5' />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className='text-red-500 text-sm mt-1'>
                      {/* {errors.password.message} */}
                    </p>
                  )}
                </div>
                <Button
                  type='submit'
                  className='w-full bg-green-600 hover:bg-green-700'
                >
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-white px-2 text-gray-500'>
                Or continue with
              </span>
            </div>
          </div>
          <div className='flex space-x-4'>
            <Button variant='outline' className='w-full'>
              <Facebook className='mr-2 h-4 w-4' />
              Facebook
            </Button>
            <Button variant='outline' className='w-full'>
              <Github className='mr-2 h-4 w-4' />
              Google
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
