"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function Page({ params }: { params: { date: string } }) {
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "matches"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filtered = data.filter(
        (m: any) => m.date?.split("T")[0] === params.date
      );

      setMatches(filtered);
    });

    return () => unsub();
  }, [params.date]);

  return (
    <main style={{ padding: 20 }}>
      <h1>Live Matches - {params.date}</h1>

      {matches.length === 0 ? (
        <p>No matches</p>
      ) : (
        matches.map((m) => (
          <div
            key={m.id}
            style={{
              border: "1px solid #ddd",
              padding: 10,
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <h3>
              {m.homeTeam} {m.homeScore ?? 0} - {m.awayScore ?? 0}{" "}
              {m.awayTeam}
            </h3>

            <p>Status: {m.status}</p>
            <p>{m.venue}</p>
          </div>
        ))
      )}
    </main>
  );
}
