import "../styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "@/redux/setup/provider";
import ParentLayout from "@/components/layout/ParentLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir={"rtl"}>
      <body>
        <Providers>
          <ParentLayout>{children}</ParentLayout>
        </Providers>
      </body>
    </html>
  );
}
