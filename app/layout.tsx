

import React from "react";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import QueryProvider from "@/components/providers/query-provider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


type LayoutProps = {
  children : React.ReactNode
}


export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
    dir="rtl"
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        
        <main>
          
        <QueryProvider>
          {children}
        </QueryProvider>

        </main>

      </body>
    </html>
  );
}
