"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginFormData, loginSchema } from "@/lib/validation/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginPage() {
     const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
      } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
      });

 const onSubmit = async (data: LoginFormData) => {
   
    console.log(data);
    
  };


   return (
     <main className="flex min-h-screen items-center justify-center p-4">
       <Card className="w-full max-w-md shadow-md">
         <CardHeader >
           <CardTitle className='text-center text-2xl'> ورود به سایت</CardTitle>
         </CardHeader>
 
         <CardContent>
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
 
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
                ورود
             </Button>
           </form>
         </CardContent>
       </Card>
     </main>
 ) 
}

export default LoginPage
