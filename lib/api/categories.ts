import { Category } from "@/types/category";
import { api } from "../api";




export async function getCategories():Promise<Category[]>{
     
    const res = await api.get<Category[]>('/categories')

    return res.data
}


export async function deleteCategoy(id:number){
     
   await api.delete(`/categories/${id}`);
}

export async function updateCategory(id:number,name:string):Promise<Category>{
    const res = await api.put<Category>(`/categories/${id}`,{name});

    return res.data

}