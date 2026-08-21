import { Category } from "@/types/category";
import { api } from "../api";



export async function getCategories():Promise<Category[]>{
     
    const res = await api.get<Category[]>('/categories')

    return res.data
}