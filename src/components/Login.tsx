import { useEffect, useState } from "preact/hooks";
import { isLoggedIn, login } from "../supabase";
import { AuthError } from "@supabase/supabase-js";

export const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    isLoggedIn().then(setLoggedIn);
  }, []);

  const onSubmit = async () => {
    const { error } = await login(email, password);

    setLoggedIn(!error);
    setError(error);
  };

  if (loggedIn) {
    return <h3>Logged In</h3>;
  }

  return (
    <div>
      <h3>Log In</h3>
      {error ? (
        <p>{error}</p>
      ) : (
        <p>Log in below to view wishlists and add and update your own lists</p>
      )}
      <input
        autoComplete="email"
        css={{ padding: "var(--pad)", marginRight: "var(--mar)" }}
        placeholder="Email"
        value={email}
        onInput={(e) => setEmail(e.currentTarget.value)}
      />
      <input
        autoComplete="password"
        css={{ padding: "var(--pad)", marginRight: "var(--mar)" }}
        placeholder="password"
        type="password"
        value={password}
        onInput={(e) => setPassword(e.currentTarget.value)}
      />
      <button onClick={onSubmit}>Login</button>
    </div>
  );
};
