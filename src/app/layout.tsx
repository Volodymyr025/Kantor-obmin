import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UpdatePaydeskWrapper from "@/ui/context-store/updatePayDesk";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kantor obmin",
  description: "App for kantor obmin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UpdatePaydeskWrapper>
        <body className={inter.className}>{children}</body>
      </UpdatePaydeskWrapper>
    </html>
  );
}
