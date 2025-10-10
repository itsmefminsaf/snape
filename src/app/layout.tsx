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
			<body className={`${roboto.className} antialiased`}>{children}</body>
		</html>
	);
};

export default RootLayout;
