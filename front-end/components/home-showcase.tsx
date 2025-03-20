"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Environment, Float, PresentationControls } from "@react-three/drei"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Image, Upload, Zap, Settings, User, Search } from "lucide-react"

export function HomeShowcase() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const MotionCard = motion(Card)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Welcome to the Future</h1>
          <p className="text-muted-foreground mt-2">Explore our interactive showcase</p>
        </div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle between light and dark mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <User className="h-4 w-4" />
                Profile
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
          <TabsTrigger value="3d">3D Experience</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5,
            }}
          >
            <TabsContent value="dashboard" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                {["Projects", "Tasks", "Team Members"].map((title, i) => (
                  <MotionCard
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="overflow-hidden"
                  >
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                      <CardTitle>{title}</CardTitle>
                      <CardDescription>Overview of your {title.toLowerCase()}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold">{(i + 1) * 12}</div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {i % 2 === 0 ? "↑" : "↓"} {(i + 2) * 5}% from last month
                      </p>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 flex justify-between">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                      <Badge variant="outline">{i % 2 === 0 ? "Active" : "Pending"}</Badge>
                    </CardFooter>
                  </MotionCard>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calendar Card */}
                <MotionCard initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                    <CardDescription>Plan your schedule</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                  </CardContent>
                </MotionCard>

                {/* Team Members */}
                <MotionCard initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Your project collaborators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 py-3">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="Avatar" />
                            <AvatarFallback>{`U${i + 1}`}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">User {i + 1}</p>
                            <p className="text-sm text-muted-foreground">user{i + 1}@example.com</p>
                          </div>
                          <Badge variant={i % 2 === 0 ? "default" : "outline"}>{i % 2 === 0 ? "Online" : "Away"}</Badge>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </MotionCard>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Photo Gallery</h2>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                  <Button className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <MotionCard
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <img
                        src={`/placeholder.svg?height=300&width=400&text=Photo+${i + 1}`}
                        alt={`Photo ${i + 1}`}
                        className="w-full h-[200px] object-cover"
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between p-4">
                      <div>
                        <h3 className="font-medium">Photo {i + 1}</h3>
                        <p className="text-sm text-muted-foreground">Added 2 days ago</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </MotionCard>
                ))}
              </div>

              <Carousel className="w-full">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <img
                              src={`/placeholder.svg?height=300&width=300&text=Carousel+${i + 1}`}
                              alt={`Carousel ${i + 1}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>

              <Card>
                <CardHeader>
                  <CardTitle>Upload New Photo</CardTitle>
                  <CardDescription>Add a new photo to your gallery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="photo-title">Title</Label>
                      <Input id="photo-title" placeholder="Enter photo title" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="photo-description">Description</Label>
                      <Input id="photo-description" placeholder="Enter photo description" />
                    </div>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Image className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your photo here, or click to browse
                      </p>
                      <Button variant="outline" size="sm">
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Upload Photo</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="3d" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>3D Experience</CardTitle>
                  <CardDescription>Interact with our 3D showcase</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full rounded-md overflow-hidden border">
                    <Canvas>
                      <ambientLight intensity={0.5} />
                      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                      <PresentationControls
                        global
                        zoom={0.8}
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 4, Math.PI / 4]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}
                      >
                        <Float rotationIntensity={0.5}>
                          <mesh>
                            <boxGeometry args={[1, 1, 1]} />
                            <meshStandardMaterial color="#9333ea" />
                          </mesh>
                        </Float>
                      </PresentationControls>
                      <Environment preset="city" />
                    </Canvas>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="rotation-speed">Rotation Speed</Label>
                      <span className="text-sm text-muted-foreground">50%</span>
                    </div>
                    <Slider id="rotation-speed" defaultValue={[50]} max={100} step={1} />
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-rotate" />
                      <Label htmlFor="auto-rotate">Auto Rotate</Label>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MotionCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <CardHeader>
                    <CardTitle>3D Models</CardTitle>
                    <CardDescription>Browse available 3D models</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {["Cube", "Sphere", "Cylinder", "Torus"].map((model, i) => (
                        <Button key={model} variant="outline" className="h-20 flex flex-col gap-2 justify-center">
                          <Zap className="h-5 w-5" />
                          <span>{model}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </MotionCard>

                <MotionCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Customize your 3D experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="shadows" defaultChecked />
                        <Label htmlFor="shadows">Enable Shadows</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="reflections" />
                        <Label htmlFor="reflections">Enable Reflections</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="ambient-occlusion" />
                        <Label htmlFor="ambient-occlusion">Ambient Occlusion</Label>
                      </div>
                      <Separator />
                      <div className="grid gap-2">
                        <Label htmlFor="environment">Environment</Label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                              City
                              <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuItem>City</DropdownMenuItem>
                            <DropdownMenuItem>Studio</DropdownMenuItem>
                            <DropdownMenuItem>Forest</DropdownMenuItem>
                            <DropdownMenuItem>Night</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              </div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}

