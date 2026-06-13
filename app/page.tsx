export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: 48, fontWeight: "bold" }}>
        World Cup
      </h1>

      <p style={{ fontSize: 22, marginTop: 10 }}>
        Who Will Win Today?
      </p>

      <a
        href="/world-cup/2026-06-13"
        style={{
          marginTop: 30,
          padding: "12px 20px",
          background: "white",
          color: "black",
          borderRadius: 10,
          textDecoration: "none"
        }}
      >
        View Today's Matches
      </a>
    </main>
  );
}
