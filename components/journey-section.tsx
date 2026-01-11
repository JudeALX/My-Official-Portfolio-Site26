"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, MapPin, Building } from "lucide-react"
import Image from "next/image"

const experiences = [
  {
    title: "E-commerce Website Manager (End-To-End)",
    company: "Multinational Conglomerate (FMCG)",
    location: "Nigeria",
    period: "Feb 2023 - Present",
    duration: "2+ years",
    description:
      "Leading end-to-end e-commerce operations for a major FMCG multinational, driving digital transformation and revenue growth.",
    highlights: [
      "Boosted online revenue by 100%",
      "Improved conversion rates by 20%",
      "Cross-border website management",
      "Team leadership & strategy",
    ],
    current: true,
    image: "/modern-ecommerce-dashboard-analytics.jpg",
  },
  {
    title: "E-Commerce Website Coordinator & Digital Marketer",
    company: "International Company",
    location: "Nigeria",
    period: "Nov 2020 - Feb 2023",
    duration: "2 years 3 months",
    description:
      "Coordinated e-commerce operations and executed digital marketing strategies for international markets.",
    highlights: [
      "Multi-platform management",
      "Digital campaign execution",
      "Performance optimization",
      "Market expansion",
    ],
    image: "/digital-marketing-planning.png",
  },
  {
    title: "Digital Marketing Specialist",
    company: "Upwork",
    location: "Remote",
    period: "Dec 2020 - Oct 2022",
    duration: "1 year 10 months",
    description:
      "Delivered expert digital marketing services to diverse clients across industries on the world's largest freelance platform.",
    highlights: [
      "Client strategy development",
      "SEO & SEM campaigns",
      "Performance reporting",
      "Client relationship management",
    ],
    image: "/freelance-digital-marketing-consulting.jpg",
  },
  {
    title: "Digital Marketing Manager",
    company: "Apex Network Limited",
    location: "Remote",
    period: "Mar 2021 - May 2021",
    duration: "2 months",
    description:
      "Led digital marketing initiatives for a financial services company, developing and implementing comprehensive marketing strategies.",
    highlights: ["Marketing strategy", "Brand development", "Campaign management", "Team coordination"],
    image: "/financial-services-marketing-strategy.jpg",
  },
  {
    title: "Graduate Teaching Assistant",
    company: "Godfrey Okoye University",
    location: "Enugu, Nigeria",
    period: "Dec 2015 - Mar 2019",
    duration: "3 years 3 months",
    description:
      "Supported academic programs while pursuing advanced studies, contributing to student development and research initiatives.",
    highlights: ["Academic research", "Student mentorship", "Curriculum support", "Publication contributions"],
    image: "/university-teaching-education-classroom.jpg",
  },
]

export function JourneySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="journey" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-2">Professional Journey</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Career Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A progressive career journey spanning 9+ years across e-commerce, digital marketing, and academic
            excellence.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/30 hidden md:block" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 }}
                className={`relative flex flex-col lg:flex-row gap-6 lg:gap-12 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 hidden md:block">
                  <div
                    className={`w-4 h-4 rounded-full border-4 ${
                      exp.current
                        ? "bg-primary border-primary/30 shadow-lg shadow-primary/50"
                        : "bg-background border-primary"
                    }`}
                  />
                </div>

                {/* Content Card */}
                <div className={`lg:w-[calc(50%-3rem)] ${index % 2 === 0 ? "lg:pr-0" : "lg:pl-0"} ml-12 md:ml-0`}>
                  <div
                    className={`bg-card rounded-3xl overflow-hidden shadow-lg border border-border hover:border-primary/30 transition-all group ${
                      exp.current ? "ring-2 ring-primary/20" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={exp.image || "/placeholder.svg"}
                        alt={exp.company}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      {exp.current && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                          Current Role
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-1">{exp.title}</h3>
                      <p className="flex items-center gap-2 text-primary font-medium mb-3">
                        <Building className="w-4 h-4" />
                        {exp.company}
                      </p>
                      <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map((highlight) => (
                          <span key={highlight} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for timeline alignment */}
                <div className="hidden lg:block lg:w-[calc(50%-3rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
