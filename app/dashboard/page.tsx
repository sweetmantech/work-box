// import { createClient } from "@/lib/supabase/server";
// import { redirect } from "next/navigation";
// import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal dashboard",
  openGraph: {
    title: "Dashboard | My App",
    description: "Access your personal dashboard on My App",
  },
};

export default async function Dashboard() {
  // const supabase = createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   redirect("/login");
  // }

  // const handleSignOut = async () => {
  //   "use server";
  //   const supabase = createClient();
  //   await supabase.auth.signOut();
  //   redirect("/login");
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        {/* <p className="text-center">Welcome, {user.email}!</p>
        <form action={handleSignOut}>
          <Button type="submit" className="w-full">
            Sign Out
          </Button>
        </form> */}
      </div>
    </div>
  );
}
