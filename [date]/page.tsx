export default function Page({ params }: { params: { date: string } }) {
  return (
    <main>
      <h1>World Cup Match</h1>
      <p>Date: {params.date}</p>
    </main>
  );
}
