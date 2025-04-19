"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, LogIn, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { name: "INICIO", path: "/" },
  { name: "CONTACTO", path: "/contact" },
  { name: "CONSULTAR TURNO RUTINARIO", path: "/consultshift" },
  { name: "CONSULTAR TURNO ESPECIAL", path: "/consultspecialshift" },
  { name: "MANUAL CONSULTA TURNO", path: "/manual" },
]

export function PublicNavbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [selectedMobileItem, setSelectedMobileItem] = React.useState("INICIO")
  const [scrolled, setScrolled] = React.useState(false)

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  // Animation variants
  const logoVariants = {
    hover: {
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { duration: 0.6 },
    },
  }

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "w-full bg-background fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "shadow-lg py-2" : "shadow-md py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <motion.div className="flex items-center space-x-3" whileHover="hover" variants={logoVariants}>
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="relative">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src="/IMG/LOGOTURUSEEM.wepb" alt="TURUSEEM Logo" />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">TR</AvatarFallback>
              </Avatar>
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.3, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </motion.div>
            <motion.h2
              className="font-bold text-2xl text-foreground relative"
              whileHover={{
                textShadow: "0 0 8px rgba(0, 0, 255, 0.3)",
                color: "hsl(var(--primary))",
              }}
            >
              TURUSEEM
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.h2>
          </motion.div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map((item, i) => (
                <NavigationMenuItem key={item.path}>
                  <Link href={item.path} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-bold uppercase relative overflow-hidden transition-all duration-300",
                        isActive(item.path) ? "text-primary" : "text-foreground/80 hover:text-foreground",
                      )}
                    >
                      <motion.div
                        custom={i}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        variants={navItemVariants}
                        className="relative z-10"
                      >
                        {item.name}
                      </motion.div>

                      {isActive(item.path) && (
                        <motion.span
                          className="absolute bottom-0 left-0 h-1 bg-primary rounded-full"
                          layoutId="activeIndicator"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}

                      <motion.span
                        className="absolute inset-0 bg-primary/10 rounded-md z-0"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Login Button */}
          <div className="flex items-center space-x-2">
            {/* Desktop Login Button */}
            <Link href="/login" legacyBehavior passHref>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <motion.span
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      repeatDelay: 2,
                    }}
                  >
                    <LogIn className="h-5 w-5" />
                  </motion.span>
                  <span className="font-bold">Login</span>
                </Button>
              </motion.div>
            </Link>

            {/* Mobile Login Button */}
            <Link href="/login" className="sm:hidden">
              <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary/10">
                <LogIn className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden border-primary text-primary hover:bg-primary/10"
                  >
                    <AnimatePresence mode="wait">
                      {mobileMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="h-5 w-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="left" className="border-r-primary/20">
                <motion.div
                  className="flex flex-col space-y-4 py-4"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={mobileMenuVariants}
                >
                  <motion.div className="flex items-center space-x-3 mb-6" variants={mobileItemVariants}>
                    <Avatar className="h-8 w-8 border-2 border-primary/20">
                      <AvatarImage src="/IMG/LOGOTURUSEEM.webp" alt="TURUSEEM Logo" />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">TR</AvatarFallback>
                    </Avatar>
                    <motion.h2
                      className="font-bold text-xl text-primary"
                      animate={{
                        textShadow: [
                          "0 0 0px rgba(0, 0, 255, 0)",
                          "0 0 10px rgba(0, 0, 255, 0.3)",
                          "0 0 0px rgba(0, 0, 255, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      TURUSEEM
                    </motion.h2>
                  </motion.div>

                  {navItems.map((item, i) => (
                    <motion.div key={item.path} variants={mobileItemVariants} custom={i} whileHover={{ x: 5 }}>
                      <Link
                        href={item.path}
                        onClick={() => {
                          setSelectedMobileItem(item.name)
                          setMobileMenuOpen(false)
                        }}
                        className={cn(
                          "px-2 py-3 text-sm font-bold uppercase block rounded-md transition-all duration-300",
                          isActive(item.path)
                            ? "text-primary bg-primary/10 border-l-4 border-primary pl-4"
                            : "text-foreground/80 hover:text-primary hover:bg-primary/5",
                        )}
                      >
                        {item.name}
                        {item.name === "CONSULTAR TURNO RUTINARIO" && (
                          <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30 text-[10px]">
                            Nuevo
                          </Badge>
                        )}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div className="mt-auto pt-4 border-t" variants={mobileItemVariants}>
                    <div className="grid gap-2 p-2">
                      <Link href="/login">
                        <Button className="w-full mt-2">
                          <LogIn className="h-4 w-4 mr-2" />
                          Ingresar
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Selected Item Display (when menu is closed) */}
        <AnimatePresence>
          {!mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  onClick={() => setMobileMenuOpen(true)}
                  className="w-full justify-between text-sm font-bold border-primary/50 text-primary group"
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(0, 0, 255, 0)",
                        "0 0 5px rgba(0, 0, 255, 0.3)",
                        "0 0 0px rgba(0, 0, 255, 0)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {selectedMobileItem}
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, 3, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <ChevronDown className="h-4 w-4 ml-2 group-hover:text-primary transition-colors" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
  