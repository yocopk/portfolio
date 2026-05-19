import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutContent } from "@/components/sections/AboutContent";
import { SkillsContent } from "@/components/sections/SkillsContent";
import { PageHeader } from "@/components/layout/PageHeader";
import { BackHome } from "@/components/layout/BackHome";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageMeta" });
  return { title: t("about") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <PageHeader
        emblem="sakura"
        kicker={t("kicker")}
        title={t("title")}
        lead={t("lead")}
        number="01"
      />
      <AboutContent />
      <SkillsContent />
      <BackHome />
    </>
  );
}
