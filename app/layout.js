import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./header";
import { Footer } from "./footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StudAI - Transform Your Study Notes Into Smart Summaries",
  description: "Transform your study notes into smart summaries with AI-powered technology.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
