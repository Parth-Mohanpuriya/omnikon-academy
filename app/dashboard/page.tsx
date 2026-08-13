import { createClient } from "@/lib/supabase/server";
import DashboardPageClient from "./DashboardPageClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <DashboardPageClient user={user} />;
}
