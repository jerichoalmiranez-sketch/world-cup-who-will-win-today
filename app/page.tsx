import Link from "next/link";

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export default function Home() {
  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const dates = [
    { label: "Yesterday", date: formatDate(yesterday) },
    { label: "Today", date: formatDate(today) },
    { label: "Tomorrow", date: formatDate(tomorrow) },
  ];

  return (
    <main style={{ padding: 20 }}>
      <h1>World Cup Matches</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {dates.map((item) => (
          <Link key={item.date} href={`/world-cup/${item.date}`}>
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                border: "1px solid #ccc",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                background: "#f5f5f5",
              }}
            >
              {item.label}
              <br />
              <small>{item.date}</small>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
