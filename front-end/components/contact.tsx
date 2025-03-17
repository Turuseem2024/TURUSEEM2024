"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { ContactCard } from "@/components/contact-card"
import { PublicNavbar } from "@/components/public-navbar"

export default function ContactoPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function calcularEdad(fechaNacimiento: string): string {
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth()

    // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }

    return `${edad} Años`
  }

  const fechaNacimientoLinares = "2005-09-13"
  const fechaNacimientoKaleth = "2006-04-18"
  const fechaNacimientoNatalia = "2004-08-18"
  const fechaNacimientoKimberly = "2003-11-02"
  const fechaNacimientoLina = "1997-02-02"

  const contacts = [
    {
      name: "Juan David Linares Barragán",
      info: "Tecnólogo en Análisis y Desarrollo de Software",
      age: calcularEdad(fechaNacimientoLinares),
      imageUrl: "/IMG/JuanLinares.jpeg",
      whatsappLink: "https://wa.me/573209455659",
      socialLink: "https://www.facebook.com/profile.php?id=100095190046582",
      email: "jdlinares@example.com",
    },
    {
      name: "Marlon Kaleth Sarmiento Mosquera",
      info: "Tecnólogo en Análisis y Desarrollo de Software",
      age: calcularEdad(fechaNacimientoKaleth),
      imageUrl: "/IMG/Kaleth.jpeg",
      whatsappLink: "https://wa.me/573213554763",
      socialLink: "https://www.facebook.com/marlon.mosquera.5855",
      email: "mksarmiento@example.com",
    },
    {
      name: "Natalia Torres Rodriguez",
      info: "Tecnóloga en Análisis y Desarrollo de Software",
      age: calcularEdad(fechaNacimientoNatalia),
      imageUrl: "/IMG/Natalia.jpeg",
      whatsappLink: "https://wa.me/573203453824",
      socialLink: "https://www.facebook.com/profile.php?id=100024303797798",
      email: "ntorres@example.com",
    },
    {
      name: "Kimberly Sharlot Hernadez Acosta",
      info: "Tecnóloga en Análisis y Desarrollo de Software",
      age: calcularEdad(fechaNacimientoKimberly),
      imageUrl: "/IMG/Kim.jpeg",
      whatsappLink: "https://wa.me/573173933137",
      socialLink: "https://www.facebook.com/profile.php?id=100078628960697",
      email: "kshernandez@example.com",
    },
    {
      name: "Lina Julieth Carvajal Mendoza",
      info: "Tecnóloga en Análisis y Desarrollo de Software",
      age: calcularEdad(fechaNacimientoLina),
      imageUrl: "/IMG/Lina.jpeg",
      whatsappLink: "https://wa.me/573114620179",
      socialLink: "https://www.facebook.com/LJCM97",
      email: "ljcarvajal@example.com",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  if (!mounted) return null

  return (
    <>
      <PublicNavbar />
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            EQUIPO DE{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              DESARROLLO
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Conozca a nuestro talentoso equipo de desarrolladores que han hecho posible este proyecto.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {contacts.map((contact, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ContactCard {...contact} />
            </motion.div>
          ))}
        </motion.div>
      </main>
    </>
  )
}

