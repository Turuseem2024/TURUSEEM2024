import type { FC } from "react"
import { Facebook, Mail, MessageCircle } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ContactCardProps {
  name: string
  info: string
  age: string
  imageUrl: string
  whatsappLink: string
  socialLink: string
  email?: string
}

export const ContactCard: FC<ContactCardProps> = ({ name, info, age, imageUrl, whatsappLink, socialLink, email }) => {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-b from-primary/20 to-primary/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
              <AvatarImage src={imageUrl} alt={name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 p-6 text-center">
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <Badge variant="secondary" className="text-xs font-normal">
          {age}
        </Badge>
        <CardDescription className="text-base">{info}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center gap-3 pb-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
                asChild
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>WhatsApp</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
                asChild
              >
                <a href={socialLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Facebook</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {email && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
                  asChild
                >
                  <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Email</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardFooter>
    </Card>
  )
}

