"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import {
  BarChart3,
  Globe,
  LineChart,
  Megaphone,
  Palette,
  Search,
  Settings,
  ShoppingCart,
  Target,
  Code,
  Database,
  Smartphone,
  Bot,
} from "lucide-react"

const marketingSkills = [
  { name: "SEO & SEM", level: 95, icon: Search },
  { name: "Conversion Rate Optimization", level: 90, icon: Target },
  { name: "Content Marketing", level: 88, icon: Megaphone },
  { name: "Paid Advertising (Meta, Google)", level: 92, icon: BarChart3 },
  { name: "Email Marketing", level: 85, icon: Globe },
  { name: "Brand Strategy", level: 88, icon: Palette },
]

const technicalSkills = [
  { name: "E-commerce Management", level: 95, icon: ShoppingCart },
  { name: "Web Development", level: 88, icon: Code },
  { name: "UX/UI Optimization", level: 90, icon: Smartphone },
  { name: "Data Analytics", level: 92, icon: LineChart },
  { name: "AI Agents & Automation", level: 85, icon: Bot },
  { name: "Database Management", level: 82, icon: Database },
  { name: "API Integration", level: 80, icon: Settings },
]

const tools = [
  { name: "Shopify", image: "/images/shopify-icon.png" },
  { name: "WooCommerce", image: "/woocommerce-logo-icon.jpg" },
  { name: "WordPress", image: "/images/wordpress-icon.png" },
  { name: "Google Analytics", image: "/google-analytics-logo-icon.jpg" },
  { name: "Google Tag Manager", image: "/google-tag-manager-logo-icon.jpg" },
  { name: "SEMrush", image: "/semrush-logo-icon.jpg" },
  { name: "Meta Ads", image: "/meta-facebook-ads-logo-icon.jpg" },
  { name: "Google Ads", image: "/google-ads-logo-icon.jpg" },
  { name: "Figma", image: "/figma-logo.png" },
  { name: "Mailchimp", image: "/mailchimp-logo-icon.jpg" },
]

function SkillBar({
  skill,
  index,
  isInView,
}: { skill: (typeof marketingSkills)[0]; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="flex items-center gap-3 mb-2">
        <skill.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
        <span className="font-medium text-foreground">{skill.name}</span>
        <span className="ml-auto text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </div>
    </motion.div>
  )
}

export function ExpertiseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="expertise" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-2">My Expertise</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Skills & Proficiencies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive skill set combining marketing strategy, technical expertise, and proficiency in
            industry-leading tools.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Marketing Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-3xl p-6 lg:p-8 shadow-lg border border-border"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Megaphone className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Marketing Skills</h3>
                <p className="text-sm text-muted-foreground">Strategic & Creative</p>
              </div>
            </div>
            <div className="space-y-5">
              {marketingSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} isInView={isInView} />
              ))}
            </div>
          </motion.div>

          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-3xl p-6 lg:p-8 shadow-lg border border-border"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <Code className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Technical Skills</h3>
                <p className="text-sm text-muted-foreground">Development & Analytics</p>
              </div>
            </div>
            <div className="space-y-5">
              {technicalSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} isInView={isInView} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-3xl p-6 lg:p-10 shadow-lg border border-border"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Tools & Platforms</h3>
            <p className="text-muted-foreground">Industry-leading tools I work with daily</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="group flex flex-col items-center p-4 rounded-2xl bg-muted/50 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all"
              >
                <div className="w-14 h-14 relative mb-3 group-hover:scale-110 transition-transform">
                  <Image src={tool.image || "/placeholder.svg"} alt={tool.name} fill className="object-contain" />
                </div>
                <span className="text-sm font-medium text-foreground text-center">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
