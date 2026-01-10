"use client"

import Link from "next/link"
import { Linkedin, Mail, ArrowUp, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#journey", label: "Journey" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
]

const services = [
  "E-commerce Management",
  "Digital Marketing Strategy",
  "SEO & SEM Optimization",
  "Website Development",
  "Conversion Rate Optimization",
  "AI Agents & Automation",
  "Brand Growth Strategy",
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">EO</span>
              </div>
              <span className="font-serif font-bold text-xl text-background">Emeka Okonkwo</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Strategic E-commerce Manager driving digital growth through data-driven marketing and UX optimization for
              multinational brands.
            </p>
            <div className="flex gap-3">
              <Link
                href="https://www.linkedin.com/in/emeka-jude-okonkwo-certified-google-digital-marketing-e-commerce-professional/"
                target="_blank"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="#contact"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-background mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-background/70 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-background mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-background/70 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h3 className="font-bold text-background mb-4">Let's Work Together</h3>
            <p className="text-background/70 text-sm mb-4">
              Ready to elevate your e-commerce success? Let's start a conversation.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
              <Link href="#contact">Get In Touch</Link>
            </Button>

            <div className="mt-6 p-4 rounded-xl bg-background/5 border border-background/10">
              <p className="text-xs text-background/60 mb-1">Based in</p>
              <p className="text-sm font-medium text-background">Nigeria 🇳🇬</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Emeka Jude Okonkwo. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-background/60 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-secondary fill-secondary" />
              <span>for digital excellence</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="text-background/60 hover:text-background hover:bg-background/10"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
