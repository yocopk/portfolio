import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { HomePulse } from "@/components/sections/HomePulse";
import { HomeTeaser } from "@/components/sections/HomeTeaser";
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
      <HomePulse />
      <HomeTeaser />
      <HomeFinalCTA />
    </>
  );
}
