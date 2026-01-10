"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Award, Briefcase, GraduationCap, Target, TrendingUp, Users } from "lucide-react"
import Image from "next/image"

const highlights = [
  {
    icon: TrendingUp,
    title: "100% Revenue Growth",
    description: "Boosted online revenue through strategic campaigns",
  },
  {
    icon: Target,
    title: "20% Conversion Rate",
    description: "Improved conversion through UX optimization",
  },
  {
    icon: Users,
    title: "1,600+ Network",
    description: "Professional connections across industries",
  },
  {
    icon: Award,
    title: "First Class Honours",
    description: "Best Graduating Student in Faculty",
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/images/emeka-about.png" alt="Emeka working" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>

              {/* Floating accent image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-background hidden md:block"
              >
                <Image
                  src="/ecommerce-dashboard-analytics-charts.jpg"
                  alt="E-commerce analytics"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Decorative element */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-2xl -z-10 hidden md:block" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="text-primary font-semibold tracking-wider uppercase text-sm">About Me</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                Strategic E-commerce Leader & Digital Growth Expert
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Welcome! I'm Emeka Jude Okonkwo, a strategic E-commerce Manager with{" "}
                <span className="text-primary font-semibold">7+ years</span> of experience driving digital growth for
                multinational brands through data-driven marketing, UX optimization, and cross-border website
                management.
              </p>
              <p>
                With a proven track record of boosting online revenue by{" "}
                <span className="text-secondary font-semibold">100%</span> and conversion rates by{" "}
                <span className="text-secondary font-semibold">20%</span>, I specialize in transforming digital presence
                into measurable business results through seamless site operations and strategic campaign execution.
              </p>
              <p>
                Currently serving as an End-to-End E-commerce Website Manager at a multinational FMCG conglomerate in
                Nigeria, I bring expertise in Shopify, WooCommerce, SEO, SEM, and digital analytics to maximize ROI and
                brand visibility.
              </p>
            </div>

            {/* Education & Experience Pills */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">MSc Finance - Distinction</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
                <Briefcase className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">9+ Years Total Experience</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Google Certified</span>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
                >
                  <item.icon className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
