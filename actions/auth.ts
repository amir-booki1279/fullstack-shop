"use server";

import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

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

    return{
        success:true,
        user : {
            id : user.id,
            name : user.name,
            email : user.email,
            role : user.role
        }
    }
}
