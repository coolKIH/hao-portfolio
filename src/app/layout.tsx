import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Container } from "@/components/Container";
import { Analytics } from "@vercel/analytics/next"

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
    <html lang="zh-CN" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-full`}
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

        <Analytics />
      </body>
    </html>
  );
}