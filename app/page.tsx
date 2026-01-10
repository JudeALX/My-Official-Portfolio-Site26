import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExpertiseSection } from "@/components/expertise-section"
import { JourneySection } from "@/components/journey-section"
import { CertificationsSection } from "@/components/certifications-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ChatBot } from "@/components/chatbot"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <JourneySection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
      <ChatBot />
    </main>
  )
}
