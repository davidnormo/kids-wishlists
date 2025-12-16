import { PageParams } from "frwk";
import { isLoggedIn } from "../supabase";
import { Login } from "../components/Login";

export const prefetch = async () => isLoggedIn();

export default function HomePage({
  prefetched: loggedIn,
}: PageParams<typeof prefetch>) {
  return (
    <div css={{ padding: "var(--pad)" }}>
      <h1>Home page</h1>
      {loggedIn === false && <Login />}
    </div>
  );
}
