import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="hero-gradient min-h-[90vh] flex items-center">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Study Notes Into
              <span className="text-primary"> Smart Summaries</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Upload your study materials and get AI-powered summaries organized by your learning objectives. Save time and study smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button className="btn-primary">
                  See our Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              {/* <Button variant="outline" className="btn-secondary">
                See How It Works
              </Button> */}
            </div>
            <div className="mt-12 flex items-center justify-center gap-8">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-primary" />
                <span className="ml-2 text-gray-600">10k+ Users</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-primary" />
                <span className="ml-2 text-gray-600">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Students Love StudAI
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to enhance your learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Summaries</h3>
              <p className="text-gray-600">
                Get AI-powered summaries tailored to your learning objectives
              </p>
            </div>

            <div className="feature-card">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Time Saving</h3>
              <p className="text-gray-600">
                Reduce study time by 50% with organized key concepts
              </p>
            </div>

            <div className="feature-card">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy to Use</h3>
              <p className="text-gray-600">
                Simple upload and get your summaries in minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How StudAI Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to better study notes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Notes</h3>
              <p className="text-gray-600">
                Upload your study materials in any format
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Set Objectives</h3>
              <p className="text-gray-600">
                Define your learning goals and focus areas
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Summary</h3>
              <p className="text-gray-600">
                Receive your personalized study materials
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Join a new revolution in studying smarter
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="testimonial-card">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "StudAI has completely transformed how I prepare for exams. The summaries are incredibly helpful!"
              </p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Medical Student</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "I save so much time using StudAI. The AI summaries are accurate and well-organized."
              </p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Engineering Student</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The best study tool I've ever used. It helps me focus on what's important."
              </p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold">Emma Davis</h4>
                  <p className="text-sm text-gray-500">Law Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Study Notes?
            </h2>
            <p className="text-xl mb-8">
              Join a new way for students to study smarter with StudAI.
            </p>
            <Link href="/dashboard">
              <Button className="bg-white text-primary hover:bg-gray-100">
                Test our Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
