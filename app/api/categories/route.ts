import { requireAdmin } from "@/lib/auth";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function GET(){
    await requireAdmin()
    const categories = await prisma.category.findMany({
        orderBy:{
            createdAt : 'desc'
        }
    });
    return NextResponse.json(categories)
}