import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactContent } from "@/components/sections/ContactContent";
import { PageHeader } from "@/components/layout/PageHeader";
import { BackHome } from "@/components/layout/BackHome";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageMeta" });
  return { title: t("contact") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <PageHeader
        emblem="shippo"
        kicker={t("kicker")}
        title={t("title")}
        lead={t("lead")}
        number="04"
      />
      <ContactContent />
      <BackHome />
    </>
  );
}
