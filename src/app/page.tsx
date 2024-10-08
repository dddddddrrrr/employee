import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { getUsers } from "./actions";

export default async function Home() {
  const users = await getUsers();

  return (
    <HydrateClient>
      <div>Hello World</div>
    </HydrateClient>
  );
}
