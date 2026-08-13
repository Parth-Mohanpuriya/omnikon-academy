import { createClient } from "@/lib/supabase/server";
import ProfilePageClient from "./ProfilePageClient";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <ProfilePageClient user={user} />;
}
