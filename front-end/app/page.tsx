
import { PublicNavbar } from "@/components/public-navbar"
import { HomeShowcase } from "@/components/home-showcase"
import { HomeContent } from "@/components/home-content"

export default function YourPage() {
  return (
    <>
      <PublicNavbar />
      <main className="pt-24">
        <HomeShowcase />
        <HomeContent />
      </main>
    </>
  )
}


