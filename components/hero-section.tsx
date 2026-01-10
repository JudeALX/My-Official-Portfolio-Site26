"use client"

import { motion } from "framer-motion"
import { ArrowDown, Linkedin, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/professional-dark-office-workspace-with-purple-lig.jpg"
          alt="Professional workspace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4a1d6a]/90 via-[#2d1235]/85 to-[#5a1a2a]/90" />
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-white/90 text-sm">Nigeria</span>
            </motion.div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight text-balance">
              Emeka Jude
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                Okonkwo
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-4 font-medium">
              E-commerce & Digital Marketing Strategist
            </p>

            <p className="text-base lg:text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Driving Online Revenue, UX Optimization & Brand Growth for FMCG & Retail Brands with 7+ years of expertise
              in Shopify, WooCommerce, SEO & SEM.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button asChild size="lg" className="bg-white text-[#4a1d6a] hover:bg-white/90 font-semibold px-8">
                <Link href="#contact">Get In Touch</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
              >
                <Link href="#journey">View My Journey</Link>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <Link
                href="https://www.linkedin.com/in/emeka-jude-okonkwo-certified-google-digital-marketing-e-commerce-professional/"
                target="_blank"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#contact"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Profile Image - Visible on all screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute -inset-2 rounded-full animate-[spin_4s_linear_infinite]">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, #9333ea, #ec4899, #722F37, #f472b6, #a855f7, #9333ea)",
                  }}
                />
              </div>

              {/* Secondary rotating border (opposite direction) */}
              <div className="absolute -inset-3 rounded-full animate-[spin_6s_linear_infinite_reverse] opacity-50">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: "conic-gradient(from 180deg, #722F37, #a855f7, #ec4899, #9333ea, #f472b6, #722F37)",
                  }}
                />
              </div>

              {/* Outer glow ring */}
              <div className="absolute -inset-6 rounded-full border border-white/10" />

              {/* Profile image container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl z-10 bg-[#1a0a20]">
                <Image
                  src="/images/emeka-hero.png"
                  alt="Emeka Jude Okonkwo"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -left-2 lg:-left-4 -bottom-2 lg:bottom-0 bg-gradient-to-br from-[#4a1d6a] to-[#6b2d8a] rounded-lg p-2 border border-purple-400/30 shadow-xl shadow-purple-900/50 z-20"
              >
                <p className="text-lg lg:text-xl font-bold text-white">7+</p>
                <p className="text-[9px] lg:text-[10px] text-purple-200 font-medium">Years Experience</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-2 lg:-right-4 bottom-8 lg:bottom-12 bg-gradient-to-br from-[#722F37] to-[#8B3A42] rounded-lg p-2 border border-red-400/30 shadow-xl shadow-red-900/50 z-20"
              >
                <p className="text-lg lg:text-xl font-bold text-white">100%</p>
                <p className="text-[9px] lg:text-[10px] text-red-200 font-medium">Revenue Growth</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <Link
            href="#about"
            className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <span className="text-sm">Scroll Down</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
