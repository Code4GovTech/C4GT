import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">Rohtak Grievance Portal</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/admin">
              <Button variant="outline">Admin Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Rohtak Grievance Redressal System
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A simple and effective way to register your complaints and track their resolution. Our WhatsApp-style
                  interface makes it easy to communicate your concerns.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/chat">
                    <Button className="gap-1">
                      Start Chat <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/track">
                    <Button variant="outline">Track Complaint</Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 lg:flex-1">
                <img
                  src="/placeholder.svg?height=550&width=450"
                  alt="Grievance Redressal System"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                  width={550}
                  height={450}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our simple 3-step process makes it easy to get your grievances addressed
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold">Register Complaint</h3>
                <p className="text-gray-500">Use our WhatsApp-style chat interface to describe your issue</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold">Get Ticket Number</h3>
                <p className="text-gray-500">Receive a unique ticket ID to track your complaint status</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold">Track Resolution</h3>
                <p className="text-gray-500">
                  Follow the progress as your complaint is addressed by the relevant department
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500">&copy; 2025 Rohtak Municipal Corporation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
