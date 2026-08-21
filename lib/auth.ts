import prisma from "@/prisma/client";
import { cookies } from "next/headers";



export async function getCurrentUser(){
    const cookieStor = await cookies();

    const sessionId= cookieStor.get('session')?.value;

    if(!sessionId) return null;

    const session = await prisma.session.findUnique({
        where:{
            id:sessionId
        },
        include : {
            user : true
        }
    });

    if(!session) return null;

    if(session.expiresAt < new Date()) return null;

    return session.user;

}