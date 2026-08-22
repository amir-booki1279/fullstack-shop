"use client"

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCategories } from "@/lib/api/categories";
import { Category } from "@/types/category";
import {Pencil, Trash2} from 'lucide-react'
import { useQuery } from "@tanstack/react-query";

export default  function CategoriesPage() {
  const {
    data: categories,
    isLoading,
    isError,
  } =  useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

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
                 <Button variant={"destructive"} size={'icon'}>
                    <Trash2 className="h-4 w-4"/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
