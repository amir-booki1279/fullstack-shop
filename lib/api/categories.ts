import { Category } from "@/types/category";
import { api } from "../api";
import { requireAdmin } from "../auth";



export async function getCategories():Promise<Category[]>{
     await requireAdmin()
    const res = await api.get<Category[]>('/categories')

    return res.data
}