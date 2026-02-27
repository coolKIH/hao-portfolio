import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Container } from "@/components/Container";
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import Image from "next/image";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hao's Portfolio",
    template: "%s | Hao's Portfolio",
  },
  description: "This is Hao's personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <header className="py-4">
            <Container>
              <Nav />
            </Container>
          </header>

          <main className="flex-1 py-12">
            <Container>{children}</Container>
          </main>

          <footer className="py-12 text-center text-xs tracking-widest text-muted-foreground uppercase">
            © {new Date().getFullYear()} Hao
          </footer>

          <div aria-hidden="true"
            className={cn(`
              absolute rotate-[-25deg] opacity-5 hover:opacity-10
              transition-all duration-700 ease-out

              hidden sm:block
              sm:top-5 sm:right-5 sm:w-20 sm:h-20
              md:top-12 md:right-12 md:w-24 md:h-24

              animate-float animate-paused
              hover:animate-running
  `)}>
            <Image
              src="/Four-leaf_clover.svg"
              alt="Four leaf clover decoration"
              width={100}
              height={100}
              className="w-full h-full dark:invert"
            />
          </div>

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}