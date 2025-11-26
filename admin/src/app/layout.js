import Providers from "@/components/Providers";
import AdminLayout from "@/components/AdminLayout";
import "./globals.css"; // Ensure your global styles are imported

export const metadata = {
  title: "Admin Console",
  description: "E-Commerce Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
