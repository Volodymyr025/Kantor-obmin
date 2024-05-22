import { verifyAuth } from "@/ui/components/Auth/lucia";
import Home from "@/ui/components/Home/Home";
import { redirect } from "next/navigation";

export default async function Main() {
  const resultAuth = await verifyAuth();

  if (!resultAuth.user) {
    redirect("/login");
  }
  return (
    <main>
      <Home />
    </main>
  );
}
