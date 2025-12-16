import { render } from "preact";
import { Link, ActivePage } from "frwk";
import "ninjass/styles.css";

const App = () => {
  return (
    <div style={{ minHeight: "100vh", padding: "var(--pad)" }}>
      <div
        style={{
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Link href="/kids-wishlists/">
            <h1>Kids Wishlists</h1>
          </Link>
        </div>
        <div
          style={{
            minWidth: "200px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Link href="/kids-wishlists/">Home</Link>
          <Link href="/kids-wishlists/wishlists">Wishlists</Link>
        </div>
      </div>
      <ActivePage />
    </div>
  );
};

render(<App />, document.querySelector("#root")!);
