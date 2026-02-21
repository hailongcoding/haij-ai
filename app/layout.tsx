import { SessionProvider } from "next-auth/react";
import { auth } from "@/app/api/auth/[...nextauth]/route"; // this line must be here
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://haij-ai.vercel.app"),
  title: "hAIjacker - Login Required",
  description: "Sign in with Google to access the uncensored AI",
};

export const viewport = {
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If not logged in → show login wall
  if (!session?.user) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center p-10 bg-gray-800 rounded-xl shadow-2xl max-w-lg">
              <h1 className="text-4xl font-bold mb-6 text-red-500">Access Denied</h1>
              <p className="text-lg mb-8">
                You must sign in with Google to use hAIjacker.<br />
                No account = no chat, no history, no research, no features.
              </p>
              <a
                href="/api/auth/signin"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg text-xl transition"
              >
                Sign in with Google
              </a>
            </div>
          </div>
        </body>
      </html>
    );
  }

  // Logged in → show full app
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <SessionProvider>
            <Toaster position="top-center" />
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
