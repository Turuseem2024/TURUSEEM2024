
import { PublicNavbar } from "@/components/public-navbar"
import { HomeShowcase } from "@/components/home-showcase"

export default function YourPage() {
  return (
    <>
      <PublicNavbar />
      <main className="pt-24">
        <HomeShowcase />
      </main>
    </>
  )
}

