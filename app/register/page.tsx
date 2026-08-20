"use client"

import { RegisterFormData, registerSchema } from '@/lib/validation/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { registerUser } from '@/actions/auth'

 function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const result = await registerUser(data)
    if(result.error){
      setError('email',{
        type:'server',
        message:result.error
      })
      return;

    }
    console.log(result);
    
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader >
          <CardTitle className='text-center text-2xl'>ثبت نام</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">نام</Label>

              <Input
                id="name"
                placeholder="نام خود را وارد کنید"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>

              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>

              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password")}
              />

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              ثبت نام
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
) 
}          

export default RegisterPage
