"use server";

import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existUser) {
    return {
      error: "این ایمیل قبلا ثب شده است",
    };
  }

  const hashedPass = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPass,
    },
  });

  return {
    success: true,
    user,
  };
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
     const user = await prisma.user.findUnique({
        where : {email:data.email}
    })
    if(!user){
        return {
            error : 'ایمیل یا رمز عبور اشتباه است'
        }
    }

    const inValidPass = await bcrypt.compare(data.password,user.password)
     if(!inValidPass){
        return {
            error : 'ایمیل یا رمز عبور اشتباه است'
        }
    }

    const session = await prisma.session.create({
        data : {
            userId : user.id,
            expiresAt : new Date(Date.now()+7*24*60*60*1000)
        }
    })
    const cookieStore = await cookies();

    cookieStore.set('session',session.id,{
        httpOnly:true,
        secure :process.env.NODE_ENV==='production',
        sameSite:'lax',
        expires:session.expiresAt,
        path:'/'
    })

    return{
        success:true,
       
    }
}
