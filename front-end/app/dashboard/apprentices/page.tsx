"use client"

import CrudApprentices from "@/components/crud-apprentices.tsx"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="min-h-screen bg-gray-50">
          <CrudApprentices />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
