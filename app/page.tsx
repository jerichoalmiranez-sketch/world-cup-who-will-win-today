import Link from "next/link";

export default function Home() {
  const dates = [
    "2026-06-15",
    "2026-06-16",
    "2026-06-17"
  ];

  return (
    <main style={{ padding: 20 }}>
      <h1>World Cup Matches</h1>

      <p>Click a date:</p>

      <ul>
        {dates.map((date) => (
          <li key={date}>
            <Link href={`/world-cup/${date}`}>
              {date}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
