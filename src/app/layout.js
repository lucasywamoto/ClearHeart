import "./globals.css";
import { connectDB } from "@/utils/db";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "@/components/AuthProvider";
import BlurredBg from "@/components/BlurredBg";

export const metadata = {
  title: "ClearHeart",
  description: "Synchronizing individual feelings with the crowd.",
};

export default async function RootLayout({ children }) {
  const conn = await connectDB();

  return (
    <html lang="en">
      <body>
        {/* Add the BlurredBg component to the layout */}
        <BlurredBg />
        <div className="content-container">
          {/* AuthProvider wrap required for getServerSession */}
          <AuthProvider>{children}</AuthProvider>
        </div>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
