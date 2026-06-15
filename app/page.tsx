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
    <main style={{ padding: 20, textAlign: "center" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
        WORLD CUP 2026: Who will win today?
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {dates.map((item) => (
          <Link key={item.date} href={`/world-cup/${item.date}`}>
            <div
              style={{
                padding: "20px",
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
