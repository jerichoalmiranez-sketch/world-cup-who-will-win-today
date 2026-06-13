export default function Page({
  params,
}: {
  params: { date: string };
}) {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "white",
      padding: 40
    }}>
      <h1 style={{ fontSize: 40 }}>
        World Cup Predictions
      </h1>

      <p style={{ marginTop: 10, opacity: 0.7 }}>
        Date: {params.date}
      </p>

      <div style={{
        marginTop: 40,
        padding: 20,
        border: "1px solid #333",
        borderRadius: 12
      }}>
        <h2>Brazil vs Morocco</h2>
        <p>🇧🇷 Brazil: 68%</p>
        <p>🇲🇦 Morocco: 22%</p>
        <p>⚪ Draw: 10%</p>
      </div>

      <div style={{
        marginTop: 20,
        padding: 20,
        border: "1px solid #333",
        borderRadius: 12
      }}>
        <h2>Qatar vs Switzerland</h2>
        <p>🇶🇦 Qatar: 12%</p>
        <p>🇨🇭 Switzerland: 84%</p>
        <p>⚪ Draw: 4%</p>
      </div>
    </main>
  );
}
