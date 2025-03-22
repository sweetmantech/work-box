import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import type React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
