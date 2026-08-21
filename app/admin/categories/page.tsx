"use client"

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
    <main className="p-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">مدیریت دسته بندی</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>نام</TableHead>
            <TableHead>تاریخ ایجاد</TableHead>
            <TableHead>عملیات</TableHead>
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
              <TableCell>ویرایش</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
