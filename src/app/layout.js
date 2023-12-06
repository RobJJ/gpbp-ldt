import { Analytics } from "@vercel/analytics/react";
import JotaiProvider from "@/providers/jotai-provider";
import "./globals.css";

import NavBar from "@/components/root/NavBar";

export const metadata = {
  title: "GPBP-GED",
  description: "Green Economy Diagnostic Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-col w-screen h-screen">
          <NavBar />
          <JotaiProvider>
            {children} <Analytics />
          </JotaiProvider>
        </main>
      </body>
    </html>
  );
}
