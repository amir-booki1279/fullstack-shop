import prisma from "@/prisma/client";
import { NextResponse } from "next/server";



export async function DELETE(request:Request,{params}:{params:Promise<{id:string}>}){

    const {id} = await params;

    await prisma.category.delete({
        where:{
            id : Number(id)
        }
    });

    return NextResponse.json({
        message : 'Category Deleted Successfuly'
    })
}