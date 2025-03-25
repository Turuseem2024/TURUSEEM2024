"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, BookOpen, Calendar, Newspaper, History, ChevronRight, ExternalLink } from "lucide-react"
import { useInView } from "react-intersection-observer"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export function HomeContent() {
  const [activeTab, setActiveTab] = useState("history")

  const [historyRef, historyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [eventsRef, eventsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [newsRef, newsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const historyTimeline = [
    {
      year: "2005",
      title: "Foundation",
      description:
        "Our organization was founded with a mission to transform the industry through innovation and excellence.",
    },
    {
      year: "2010",
      title: "Expansion",
      description: "We expanded our operations to three new regions, doubling our team size and impact.",
    },
    {
      year: "2015",
      title: "Innovation Award",
      description: "Received the prestigious Industry Innovation Award for our groundbreaking approach.",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched our digital platform, reaching thousands of new customers worldwide.",
    },
    {
      year: "2023",
      title: "Sustainability Initiative",
      description: "Implemented our comprehensive sustainability program, reducing our carbon footprint by 40%.",
    },
  ]

  const importantEvents = [
    {
      id: 1,
      title: "Annual Conference 2025",
      date: "June 15-18, 2025",
      location: "Convention Center",
      image: "/placeholder.svg?height=300&width=500&text=Conference",
      description:
        "Join us for our flagship annual conference featuring industry leaders, workshops, and networking opportunities.",
    },
    {
      id: 2,
      title: "Innovation Summit",
      date: "September 5-7, 2025",
      location: "Tech Hub",
      image: "/placeholder.svg?height=300&width=500&text=Summit",
      description: "A three-day summit focused on emerging technologies and future trends in our industry.",
    },
    {
      id: 3,
      title: "Community Outreach Day",
      date: "October 12, 2025",
      location: "Multiple Locations",
      image: "/placeholder.svg?height=300&width=500&text=Community",
      description: "Our annual day of giving back to the community through various volunteer initiatives.",
    },
  ]

  const latestNews = [
    {
      id: 1,
      title: "New Partnership Announcement",
      date: "March 20, 2025",
      excerpt:
        "We're excited to announce our strategic partnership with Industry Leader Inc. to develop innovative solutions.",
      image: "/placeholder.svg?height=200&width=300&text=Partnership",
    },
    {
      id: 2,
      title: "Product Launch Success",
      date: "February 15, 2025",
      excerpt: "Our latest product launch exceeded expectations with record-breaking adoption in the first week.",
      image: "/placeholder.svg?height=200&width=300&text=Launch",
    },
    {
      id: 3,
      title: "Sustainability Recognition",
      date: "January 30, 2025",
      excerpt:
        "Our organization has been recognized for its commitment to sustainable practices and environmental stewardship.",
      image: "/placeholder.svg?height=200&width=300&text=Award",
    },
    {
      id: 4,
      title: "Team Expansion",
      date: "January 10, 2025",
      excerpt:
        "We're growing! Meet the newest members of our leadership team bringing fresh perspectives and expertise.",
      image: "/placeholder.svg?height=200&width=300&text=Team",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-16 text-center">
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
          Discover Our Story
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">
          Learn about our history, upcoming events, and latest news. Connect with us on social media to stay updated.
        </motion.p>
        <motion.div variants={fadeInUp} className="flex justify-center gap-4 mt-6">
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="rounded-full">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Button>
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="rounded-full">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Button>
          </Link>
          <Link href="https://blogger.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="rounded-full">
              <BookOpen className="h-5 w-5" />
              <span className="sr-only">Blogger</span>
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8 w-full md:w-[400px] mx-auto">
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Events</span>
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            <span className="hidden sm:inline">News</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <motion.div
            ref={historyRef}
            initial="hidden"
            animate={historyInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Our Journey</h3>
                <p className="text-muted-foreground mb-6">
                  Since our founding, we've been committed to excellence, innovation, and making a positive impact in
                  our community and industry.
                </p>
                <p className="mb-6">
                  Our organization has grown from a small team with big dreams to an industry leader with a global
                  presence. Through challenges and triumphs, we've remained true to our core values and mission.
                </p>
                <Button className="gap-2">
                  Learn More About Us
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Our+History"
                  alt="Our History"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold mb-6">Timeline</h3>
              <div className="relative border-l-2 border-primary/20 pl-8 space-y-8">
                {historyTimeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={historyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    <div className="absolute -left-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div className="bg-card rounded-lg p-6 shadow-sm">
                      <Badge variant="outline" className="mb-2">
                        {item.year}
                      </Badge>
                      <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    To provide innovative solutions that empower our clients and contribute positively to society while
                    maintaining the highest standards of excellence and integrity.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    To be the global leader in our industry, recognized for our innovation, excellence, and positive
                    impact on communities worldwide.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>Integrity</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>Innovation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>Excellence</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>Sustainability</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="events">
          <motion.div
            ref={eventsRef}
            initial="hidden"
            animate={eventsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join us at our upcoming events to connect, learn, and grow with our community.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Carousel className="w-full">
                <CarouselContent>
                  {importantEvents.map((event) => (
                    <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/1">
                      <Card className="h-full">
                        <div className="relative h-[200px] overflow-hidden">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                            <Badge className="bg-primary text-white">{event.date}</Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{event.title}</CardTitle>
                          <CardDescription>{event.location}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{event.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full gap-2">
                            Register Now
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Event Calendar</CardTitle>
                  <CardDescription>Browse all our upcoming events</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {["March 2025", "April 2025", "May 2025", "June 2025"].map((month, index) => (
                      <AccordionItem key={month} value={month}>
                        <AccordionTrigger>{month}</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                              <div
                                key={`${month}-${item}`}
                                className="flex items-start gap-4 p-2 rounded-lg hover:bg-muted/50"
                              >
                                <div className="bg-primary/10 text-primary rounded-md p-2 text-center min-w-[60px]">
                                  <div className="text-sm font-medium">{month.split(" ")[0].substring(0, 3)}</div>
                                  <div className="text-xl font-bold">{item + index * 10}</div>
                                </div>
                                <div>
                                  <h4 className="font-medium">Sample Event {item}</h4>
                                  <p className="text-sm text-muted-foreground">10:00 AM - 2:00 PM • Virtual</p>
                                  <div className="flex gap-2 mt-2">
                                    <Badge variant="outline" className="text-xs">
                                      Workshop
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      Free
                                    </Badge>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" className="ml-auto">
                                  Details
                                </Button>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">View Full Calendar</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="news">
          <motion.div
            ref={newsRef}
            initial="hidden"
            animate={newsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Latest News</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stay updated with our latest announcements, achievements, and industry insights.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="overflow-hidden">
                <div className="relative h-[250px]">
                  <Image
                    src="/placeholder.svg?height=500&width=800&text=Featured+News"
                    alt="Featured News"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <Badge className="self-start mb-2">Featured</Badge>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Major Milestone: Celebrating 20 Years of Excellence
                    </h3>
                    <p className="text-white/80 text-sm">March 25, 2025</p>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    This year marks our 20th anniversary, a significant milestone in our journey of innovation, growth,
                    and impact. Join us as we celebrate two decades of excellence and look forward to the future.
                  </p>
                  <Button variant="outline" className="w-full">
                    Read Full Story
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <h4 className="font-semibold text-lg">Recent Updates</h4>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {latestNews.map((news) => (
                      <Card key={news.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative w-full sm:w-[120px] h-[100px]">
                            <Image
                              src={news.image || "/placeholder.svg"}
                              alt={news.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4 flex-1">
                            <h5 className="font-medium mb-1">{news.title}</h5>
                            <p className="text-xs text-muted-foreground mb-2">{news.date}</p>
                            <p className="text-sm line-clamp-2">{news.excerpt}</p>
                            <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                              Read more
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Subscribe to Our Newsletter</CardTitle>
                  <CardDescription>Get the latest news and updates delivered to your inbox</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4 sm:grid-cols-[1fr_auto]">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Button type="submit">Subscribe</Button>
                  </form>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>

      <Separator className="my-16" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <History className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Our Legacy</h3>
            <p className="text-muted-foreground">
              Explore our rich history and the milestones that have shaped our organization over the years.
            </p>
            <Button variant="link" className="mt-2">
              Learn More
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Join Our Events</h3>
            <p className="text-muted-foreground">
              Participate in our upcoming events and connect with our community of professionals and enthusiasts.
            </p>
            <Button variant="link" className="mt-2">
              View Calendar
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Newspaper className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Latest Updates</h3>
            <p className="text-muted-foreground">
              Stay informed with our latest news, announcements, and industry insights.
            </p>
            <Button variant="link" className="mt-2">
              Read News
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-card rounded-xl p-8 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Connect With Us</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Follow us on social media to stay updated with our latest news, events, and announcements.
        </p>
        <div className="flex justify-center gap-6">
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="rounded-full gap-2">
              <Facebook className="h-5 w-5" />
              <span>Facebook</span>
            </Button>
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="rounded-full gap-2">
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </Button>
          </Link>
          <Link href="https://blogger.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="rounded-full gap-2">
              <BookOpen className="h-5 w-5" />
              <span>Blogger</span>
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

