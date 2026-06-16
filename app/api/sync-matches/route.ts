import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";

export async function GET() {
  try {
    // 1. Fetch World Cup fixtures
    const res = await fetch(
      "https://v3.football.api-sports.io/fixtures?league=1&season=2026",
      {
        headers: {
          "x-apisports-key": process.env.FOOTBALL_API_KEY!,
        },
      }
    );

    const data = await res.json();
    const matches = data.response;

    // 2. Clear old matches (optional but clean)
    const old = await getDocs(collection(db, "matches"));

    for (const d of old.docs) {
      await deleteDoc(doc(db, "matches", d.id));
    }

    // 3. Save new matches to Firebase
    for (const match of matches) {
      await addDoc(collection(db, "matches"), {
        apiId: match.fixture.id,
        homeTeam: match.teams.home.name,
        awayTeam: match.teams.away.name,
        date: match.fixture.date,
        status: match.fixture.status.short,
      });
    }

    return NextResponse.json({
      success: true,
      count: matches.length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Sync failed", details: err },
      { status: 500 }
    );
  }
}
