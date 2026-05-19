import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JourneyContent } from "@/components/sections/JourneyContent";
import { PageHeader } from "@/components/layout/PageHeader";
import { BackHome } from "@/components/layout/BackHome";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageMeta" });
  return { title: t("journey") };
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "journey" });

  return (
    <>
      <PageHeader
        emblem="tomoe"
        kicker={t("kicker")}
        title={t("title")}
        lead={t("lead")}
        number="03"
      />
      <JourneyContent />
      <BackHome />
    </>
  );
}
