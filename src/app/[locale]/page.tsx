import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { HomeManifesto } from "@/components/sections/HomeManifesto";
import { HomePulse } from "@/components/sections/HomePulse";
import { HomeAboutPeek } from "@/components/sections/HomeAboutPeek";
import { HomeFeaturedWork } from "@/components/sections/HomeFeaturedWork";
import { HomeMarquee } from "@/components/sections/HomeMarquee";
import { HomeJourneyPeek } from "@/components/sections/HomeJourneyPeek";
import { HomeFinalCTA } from "@/components/sections/HomeFinalCTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <HomeManifesto />
      <HomePulse />
      <HomeAboutPeek />
      <HomeFeaturedWork />
      <HomeMarquee />
      <HomeJourneyPeek />
      <HomeFinalCTA />
    </>
  );
}
