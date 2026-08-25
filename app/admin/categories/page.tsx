"use client"

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteCategoy, getCategories, updateCategory } from "@/lib/api/categories";
import { Category } from "@/types/category";
import {Pencil, Trash2} from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { string } from "zod";
import { Input } from "@/components/ui/input";
import AppDialog from "@/components/shared/AppDialog";

export default  function CategoriesPage() {

  const [selectedCategory,setSelectedCategory] = useState<Category|null>(null)
  const [editCategory,setEditCategory] = useState<Category|null>(null)
  const [editName,setEditName] = useState('')



  const {
    data: categories,
    isLoading,
    isError,
  } =  useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn : deleteCategoy,

    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey : ['categories']
      })
    }
  })

  const updateMutation = useMutation({
    mutationFn : ({id,name}:{id:number,name:string})=> updateCategory(id,name),
    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey : ['categories']

      })
      setEditCategory(null);
      setEditName('')
    }
  })

  if (isLoading) return <div>درحال دریافت دسته بندی ها...</div>;
  if (isError) return <div>خطا در دیافت اطلاعات</div>;

  return (
    <main className="p-10 max-w-5xl mx-auto">
      <div className="mb-6 flex justify-center">
        <h1 className="text-2xl font-bold">مدیریت دسته بندی</h1>
      </div>

      <Table dir="rtl" className="w-full text-xl">
        <TableHeader>
          <TableRow>
            <TableCell>نام</TableCell>
            <TableCell>تاریخ ایجاد</TableCell>
            <TableCell>عملیات</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                {new Date(category.createdAt).toLocaleDateString(
                  "fa-IR",
                )}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button onClick={()=>{
                  setEditCategory(category)
                  setEditName(category.name) 
                }}
                 variant={"outline"} size={'icon'}>
                    <Pencil className="h-4 w-4"/>
                </Button>
                 <Button onClick={()=>setSelectedCategory(category)} 
                 disabled={deleteMutation.isPending} variant={"destructive"} size={'icon'}>
                    <Trash2 className="h-4 w-4"/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

     

      <AppDialog 
        open = {!!selectedCategory}
        onOpenChange={(open)=>{
          if(!open){
            setSelectedCategory(null)
          }
        }}
        title=" حذف دسته بندی"
        description={` آیا مطمنی میخواهی دسته بندی 
                 ${selectedCategory?.name}
                 را حذف کنی؟`}
                 footer ={
                  <>
                   <Button onClick={()=>{
                  setSelectedCategory(null)
                  
                }}
                 variant={"outline"} size={'icon'}>
                   لغو
                </Button>
                  <Button onClick={()=>{
                    if(!selectedCategory) return;
                    deleteMutation.mutate(selectedCategory.id);
                    setSelectedCategory(null);
                  
                  }} 
                 disabled={deleteMutation.isPending} variant={"destructive"} size={'icon'}>
                    
                    {deleteMutation.isPending ? <span>درحال حذف...</span>:<span>حذف</span>}
                </Button>
                  </>
                 }
      />

      <AppDialog
        open = {!!editCategory}
         onOpenChange={(open)=>{
          if(!open){
            setEditCategory(null)
          }
        }}
        title=" ویرایش دسته بندی"
        description=" نام دسته بندی را تغییر دهید"
        footer={
          <>
           <Button
           onClick={()=>setEditCategory(null)}
          variant={'outline'}>
              لغو
          </Button>
          
          <Button
          variant={'outline'}
           disabled = {updateMutation.isPending || !editName.trim()}
             onClick={(e)=>{
              e.preventDefault();

              if(!editCategory) return;

              updateMutation.mutate({
                id:editCategory.id,
                name:editName.trim()
              })
             }}
          >
                    {updateMutation.isPending ? <span>درحال ذخیره...</span>:<span>ذخیره</span>}

          </Button>
          </>
        }
      >
       <Input
       value={editName}
       onChange={(e)=>setEditName(e.target.value)}
       placeholder="نام دسته بندی"
       />
      </AppDialog>

    
    </main>
  );
}
