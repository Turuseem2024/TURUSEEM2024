import { LoginForm } from "@/components/login-form"
import { PublicNavbar } from "@/components/public-navbar"

export default function LoginPage() {
  return (
    <>
      <PublicNavbar />
      <div className="bg-muted flex min-h-screen flex-col items-center justify-start pt-32 p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </>
  )
}
