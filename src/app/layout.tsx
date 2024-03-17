import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageView from "@/components/PageView";
import AuthSession from "./_component/AuthSession";
import ReactQueryProviders from "@/api/useReactQuery";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Engage.pub",
  description: "GPT-Driven Language Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSession>
          <Header />
          <PageView>
            <ReactQueryProviders>{children}</ReactQueryProviders>
          </PageView>
          <Footer />
        </AuthSession>
      </body>
    </html>
  );
}
