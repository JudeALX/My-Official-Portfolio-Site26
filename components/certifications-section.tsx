"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Award, ExternalLink, GraduationCap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const certifications = [
  {
    title: "Foundations of Digital Marketing and E-commerce",
    issuer: "Google / Coursera",
    date: "May 2023",
    image: "/google-icon.png",
    link: "https://coursera.org/account/accomplishments/certificate/4D6HF2UJLYZF",
  },
  {
    title: "Certified Search Engine Optimization (SEO)",
    issuer: "SEMrush",
    date: "Oct 2020",
    image: "/semrush-logo-icon.jpg",
    link: "https://semrush.com/academy/exams/seo-fundamentals-exam",
  },
  {
    title: "Web and App Development",
    issuer: "Utiva",
    date: "Oct 2020",
    image: "/web-development-code-icon.png",
  },
  {
    title: "The Fundamentals of Digital Marketing",
    issuer: "Wild Fusion Digital Centre",
    date: "Nov 2020",
    image: "/digital-marketing-icon.png",
  },
  {
    title: "Brand Management: Aligning Business, Brand and Behaviour",
    issuer: "University of London",
    date: "2023",
    image: "/university-of-london-logo.jpg",
  },
  {
    title: "International Computer Drivers License (ICDL)",
    issuer: "ICDL Africa",
    date: "Aug 2014",
    image: "/placeholder.svg?height=80&width=80",
  },
]

const education = [
  {
    degree: "Master of Science - MS, Finance",
    institution: "Godfrey Okoye University Enugu",
    achievement: "Distinction",
    icon: GraduationCap,
  },
  {
    degree: "Master of Science - MSc, Finance",
    institution: "University of Nigeria, Nsukka",
    icon: GraduationCap,
  },
  {
    degree: "Bachelor's Degree, Banking and Finance",
    institution: "Godfrey Okoye University, Enugu Nigeria",
    achievement: "First Class Honours",
    icon: Award,
  },
]

export function CertificationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="certifications" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-2">Credentials</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Certifications & Education
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and professional development to stay at the forefront of digital marketing and
            e-commerce.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Certifications */}
          <div className="lg:col-span-2">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-xl font-bold text-foreground mb-6 flex items-center gap-2"
            >
              <Award className="w-5 h-5 text-primary" />
              Professional Certifications
            </motion.h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-5 border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <Image
                        src={cert.image || "/placeholder.svg"}
                        alt={cert.issuer}
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-sm leading-tight mb-1 line-clamp-2">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-primary">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                    </div>
                  </div>
                  {cert.link && (
                    <Link
                      href={cert.link}
                      target="_blank"
                      className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      View Certificate
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold text-foreground mb-6 flex items-center gap-2"
            >
              <GraduationCap className="w-5 h-5 text-secondary" />
              Education
            </motion.h3>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-card rounded-2xl p-5 border border-border hover:border-secondary/30 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <edu.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{edu.degree}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{edu.institution}</p>
                      {edu.achievement && (
                        <span className="inline-block mt-2 text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                          {edu.achievement}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Awards Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-5 border border-primary/20"
            >
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Academic Awards
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Best Graduating Student - Faculty of Management & Social Sciences
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                  Best Graduating Student - Accounting & Finance Department
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  National President - Godfrey Okoye University Alumni Association
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
