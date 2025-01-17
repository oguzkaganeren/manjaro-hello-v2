import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Navbar from "@/components/nav-bar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main className="w-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
