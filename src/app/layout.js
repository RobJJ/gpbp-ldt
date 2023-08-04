import JotaiProvider from "@/providers/jotai-provider";
import QueryProvider from "@/providers/query-provider";

import "./globals.css";

import NavBar from "@/components/NavBar";

// const inter = Inter({ subsets: ["latin"] });

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
          <QueryProvider>
            <JotaiProvider>{children}</JotaiProvider>
          </QueryProvider>
        </main>
      </body>
    </html>
  );
}
