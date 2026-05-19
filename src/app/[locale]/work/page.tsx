import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectsContent } from "@/components/sections/ProjectsContent";
import { PageHeader } from "@/components/layout/PageHeader";
import { BackHome } from "@/components/layout/BackHome";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageMeta" });
  return { title: t("work") };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "work" });

  return (
    <>
      <PageHeader
        emblem="seigaiha"
        kicker={t("kicker")}
        title={t("title")}
        lead={t("lead")}
        number="02"
      />
      <ProjectsContent />
      <BackHome />
    </>
  );
}
