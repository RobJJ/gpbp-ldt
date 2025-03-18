import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";
import JotaiProvider from "@/providers/jotai-provider";
import "./globals.css";

import NavBar from "@/components/root/NavBar";
import { isMobileUserAgent } from "@/lib/utils";
import Mobile from "@/components/landing/Mobile";
import Image from "next/image";
import Link from "next/link";
import ldt_icon from "../../public/GED-logo.png";
import { Open_Sans } from "next/font/google";
const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "GPBP-LDT",
  description: "Local Development Tracker",
};

export default function RootLayout({ children }) {
  // Mobile gaurd clause
  // const headersList = headers();
  // const isMobile = isMobileUserAgent(headersList.get("user-agent"));
  //
  return (
    <html lang="en">
      <body className={`${open_sans.className} bg-primary-bg flex flex-col`}>
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
            <div className="mb-6">
              <Image
                src={ldt_icon}
                alt="GPBP-LDT Logo"
                width={120}
                height={120}
                className="mx-auto"
              />
            </div>
            <h1 className="text-2xl font-bold mb-4">The GPBP-LDT Has Moved</h1>
            <p className="text-gray-600 mb-6">
              Our application has moved to a new domain. Please update your
              references to continue using the site.
            </p>
            <Link
              href="https://gpbp-ldt.app/"
              className="inline-block bg-[#4C58F6] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Go to New Website
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

// Original layout :: pre-redirect update (repo has moved to Org + hosting has moved to DO)

// export default function RootLayout({ children }) {
//   // Mobile gaurd clause
//   const headersList = headers();
//   const isMobile = isMobileUserAgent(headersList.get("user-agent"));
//   //
//   return (
//     <html lang="en">
//       <body>
//         {isMobile && <Mobile />}
//         {/* Run app for desktop only */}
//         {!isMobile && (
//           <main className="flex flex-col w-screen h-screen">
//             <NavBar />
//             <JotaiProvider>
//               {children} <Analytics />
//             </JotaiProvider>
//           </main>
//         )}
//       </body>
//     </html>
//   );
// }
