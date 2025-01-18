import type {Metadata} from "next";
import {Nunito, Nunito_Sans} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import {setDefaultOptions} from "date-fns";
import {ptBR} from "date-fns/locale";
import {ClientProviders} from "@/components/shared/client-provider";

const fontSans = Nunito_Sans({subsets: ["latin"], variable: "--font-sans"});
const fontTitle = Nunito({subsets: ["latin"], variable: "--font-title"});

export const metadata: Metadata = {
  title: "Resume Craft",
  icons: {
    icon: "/favicon.svg",
  },
};

// caso queira setar o idioma padrão do browser para o portugues
// setDefaultOptions({locale: ptBR})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontTitle.variable,
          fontSans.variable
        )}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
