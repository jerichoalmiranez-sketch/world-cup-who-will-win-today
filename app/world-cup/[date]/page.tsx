export default function Page({ params }: { params: { date: string } }) {
  return (
    <main style={{ padding: 20 }}>
      <h1>Matches</h1>
      <p>Date: {params.date}</p>
    </main>
  );
}
