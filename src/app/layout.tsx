import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: {
    default: "Snape",
    template: "%s | Snape",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} min-h-screen bg-gradient-to-bl from-green-950 via-black to-indigo-950 to-[130%] antialiased`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
