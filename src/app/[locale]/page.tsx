import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { AboutBento } from "@/components/sections/AboutBento";
import { ProjectsSection } from "@/components/sections/Projects";
import { ExperienceSection } from "@/components/sections/Experience";
import { ContactSection } from "@/components/sections/Contact";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { EnsoLoader } from "@/components/motion/EnsoLoader";
import { CustomCursor } from "@/components/motion/CustomCursor";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SmoothScroll>
      <EnsoLoader />
      <CustomCursor />
      <Header />
      <main id="top" className="relative">
        <Hero />
        <AboutBento />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
