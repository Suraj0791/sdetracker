import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Career Tracker",
  description: "Track your SDE and Product job applications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <Navigation />
            <main className="container mx-auto px-4 py-6">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
