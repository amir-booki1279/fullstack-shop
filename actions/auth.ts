"use server"

import prisma from "@/prisma/client"
import bcrypt from 'bcrypt'

export async function registerUser(data:{
    name:string,
    email:string,
    password:string
}){

    const existUser = await prisma.user.findUnique({
        where : {email:data.email}
    })
    if(existUser){
        return {
            error : 'این ایمیل قبلا ثب شده است'
        }
    }

    const hashedPass = await bcrypt.hash(data.password,10)

    const user = await prisma.user.create({
        data : {
            name :data.name,
            email : data.email,
            password : hashedPass
        }
    })

    return {
        success:true,
        user
    }

}