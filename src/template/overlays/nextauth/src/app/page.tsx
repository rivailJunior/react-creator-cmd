import { Heading } from "@/components";
import { UserMenu } from "@/components/user-menu";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8">
      <Heading />
      <UserMenu />
    </main>
  );
}
