import type { ReactNode } from "react"
import {
  Breadcrumb,
  BreadcrumbItem as UICBreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

interface BreadcrumbItem {
  label: string
  href?: string
  isCurrentPage?: boolean
}

interface PageContainerProps {
  children: ReactNode
  breadcrumbs: BreadcrumbItem[]
  title?: string
}

export function PageContainer({ children, breadcrumbs, title }: PageContainerProps) {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => (
                <UICBreadcrumbItem key={index} className={index === 0 ? "hidden md:block" : ""}>
                  {item.isCurrentPage ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href || "#"}>{item.label}</BreadcrumbLink>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className={index === 0 ? "hidden md:block" : ""} />
                  )}
                </UICBreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {title && <div className="ml-auto pr-4 font-medium text-sm">{title}</div>}
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
    </SidebarInset>
  )
}

