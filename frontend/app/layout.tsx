import { comfortaa } from "./ui/fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${comfortaa.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
