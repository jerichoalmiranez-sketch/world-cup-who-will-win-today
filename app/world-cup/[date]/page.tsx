import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function Page({
  params,
}: {
  params: { date: string };
}) {
  const snap = await getDocs(collection(db, "matches"));

  const matches = snap.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((m: any) => m.date?.split("T")[0] === params.date);

  return (
    <main style={{ padding: 20 }}>
      <h1>Matches for {params.date}</h1>

      {matches.length === 0 ? (
        <p>No matches found</p>
      ) : (
        matches.map((m: any) => (
          <div key={m.id} style={{ marginBottom: 10 }}>
            <h3>
              {m.homeTeam} vs {m.awayTeam}
            </h3>
            <p>{new Date(m.date).toLocaleString()}</p>
            <p>Status: {m.status}</p>
          </div>
        ))
      )}
    </main>
  );
}
