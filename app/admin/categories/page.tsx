"use client"

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteCategoy, getCategories } from "@/lib/api/categories";
import { Category } from "@/types/category";
import {Pencil, Trash2} from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default  function CategoriesPage() {

  const [selectedCategory,setSelectedCategory] = useState<Category|null>(null)

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
                <Button variant={"outline"} size={'icon'}>
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

      <AlertDialog
        open = {!!selectedCategory}
        onOpenChange={(open)=>{
          if(!open){
            setSelectedCategory(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
                حذف دسته بندی
            </AlertDialogTitle>
             <AlertDialogDescription>
                 آیا مطمنی میخواهی دسته بندی {" "}
                 <strong>{selectedCategory?.name}</strong>{" "}
                 را حذف کنی؟
             </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              لغو
            </AlertDialogCancel>
            <AlertDialogAction
             onClick={()=>{if(selectedCategory){
              deleteMutation.mutate(selectedCategory.id);
              setSelectedCategory(null)
             }}}
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>

      </AlertDialog>
    </main>
  );
}
