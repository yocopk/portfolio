import type { Metadata, Viewport } from "next";
import { Fraunces, Geist_Mono, Inter, Noto_Serif_JP } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

function isValidLocale(value: string): value is (typeof routing.locales)[number] {
  return (routing.locales as readonly string[]).includes(value);
}
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-jp",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#f4ede1",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: t("title"),
      template: "%s · Andrea Marchese",
    },
    description: t("description"),
    keywords: t("keywords").split(", "),
    authors: [{ name: "Andrea Marchese", url: "https://github.com/yocopk" }],
    creator: "Andrea Marchese",
    metadataBase: new URL("https://andreamarchese.dev"),
    openGraph: {
      type: "website",
      locale: locale === "it" ? "it_IT" : "en_US",
      url: "/",
      title: t("title"),
      description: t("description"),
      siteName: "Andrea Marchese — Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@yocopk",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        it: "/it",
      },
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} ${notoSerifJp.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--color-sumi)] focus:px-4 focus:py-2 focus:font-mono-ui focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-[var(--color-washi)]"
        >
          Skip to content
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
