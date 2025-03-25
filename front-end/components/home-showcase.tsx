"use client"

export function HomeShowcase() {
  return (
    <section className="relative">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Organization</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            We are a leading organization dedicated to innovation, excellence, and making a positive impact.
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary">
            Learn More
          </button>
        </div>
      </div>
      <div className="absolute inset-0 hidden md:block">
        {/* Placeholder for background image */}
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200&text=Showcase')" }}
        ></div>
      </div>
    </section>
  )
}

