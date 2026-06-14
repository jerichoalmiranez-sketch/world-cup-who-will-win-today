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
      <h1>World Cup Predictions</h1>

      <p>Date: {params.date}</p>

      <h2>Brazil vs Morocco</h2>
      <p>🇧🇷 Brazil: 68%</p>
      <p>🇲🇦 Morocco: 32%</p>
    </main>
  );
}
