import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { string } from "zod";



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

export async function PUT(request:Request,{params}:{params:Promise<{id:string}>}){

    const {id} = await params;

    const body : {name:string} = await request.json();

    const category = await prisma.category.update({
        where : {
            id : Number(id) 
        },
        data : {
            name : body.name
        }
    });

    return NextResponse.json(category);



}