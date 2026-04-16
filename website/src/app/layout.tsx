import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-display" });

export const metadata: Metadata = {
  title: "Agent Skills for All",
  description: "Agent Skills for All — Discover and install production-grade skills for test automation. Search by framework, language, and category.",
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark overflow-x-hidden" suppressHydrationWarning>
      <body className={`${inter.variable} ${bebasNeue.variable} font-sans min-h-screen antialiased overflow-x-hidden relative`} suppressHydrationWarning>
        <ScrollReveal />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 w-full pt-0 pb-16 md:pt-0 md:pb-20 lg:pt-0 lg:pb-24">
            <div className="mx-auto w-full max-w-[1600px] px-6 md:px-8 lg:px-12">{children}</div>
          </main>
          <footer className="w-full border-t border-border bg-muted/30 py-12 text-center text-sm text-muted-foreground">
            Made with care by{" "}
            <a href="https://www.agentskillsforall.com/" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline transition-colors duration-200">
              Agent Skills for All
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
