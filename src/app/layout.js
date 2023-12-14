import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";
import JotaiProvider from "@/providers/jotai-provider";
import "./globals.css";

import NavBar from "@/components/root/NavBar";
import { isMobileUserAgent } from "@/lib/utils";
import Mobile from "@/components/landing/Mobile";

export const metadata = {
  title: "GPBP-GED",
  description: "Green Economy Diagnostic Tool",
};

export default function RootLayout({ children }) {
  // Mobile gaurd clause
  const headersList = headers();
  const isMobile = isMobileUserAgent(headersList.get("user-agent"));
  //
  return (
    <html lang="en">
      <body>
        {isMobile && <Mobile />}
        {/* Run app for desktop only */}
        {!isMobile && (
          <main className="flex flex-col w-screen h-screen">
            <NavBar />
            <JotaiProvider>
              {children} <Analytics />
            </JotaiProvider>
          </main>
        )}
      </body>
    </html>
  );
}
