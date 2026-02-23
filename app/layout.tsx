// import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "hAIjacker - Login Required",
  description: "Sign in to use the uncensored AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
