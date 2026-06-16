import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";

function formatDate(date: string) {
  return new Date(date).toISOString().split("T")[0];
}

export default async function Page({
  params,
}: {
  params: { date: string };
}) {
  const snap = await getDocs(collection(db, "matches"));

  const data = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const matches = data.filter(
    (m: any) => formatDate(m.date) === params.date
  );

  return (
    <main style={{ padding: 20 }}>
      <h1>Matches for {params.date}</h1>

      {matches.length === 0 ? (
        <p>No matches found</p>
      ) : (
        matches.map((m: any) => (
          <div key={m.id}>
            <h3>
              {m.homeTeam} {m.homeScore ?? 0} - {m.awayScore ?? 0} {m.awayTeam}
            </h3>
            <p>{m.status}</p>
          </div>
        ))
      )}
    </main>
  );
}
