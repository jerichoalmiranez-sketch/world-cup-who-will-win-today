import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function GET() {
  try {
    const res = await fetch(
      "https://v3.football.api-sports.io/fixtures?league=1&season=2026",
      {
        headers: {
          "x-apisports-key": process.env.FOOTBALL_API_KEY!,
        },
      }
    );

    const data = await res.json();
    const fixtures = data.response;

    for (const fixture of fixtures) {
      const id = fixture.fixture.id;

      await setDoc(doc(db, "matches", String(id)), {
        apiId: id,
        homeTeam: fixture.teams.home.name,
        awayTeam: fixture.teams.away.name,
        date: fixture.fixture.date,

        // 🔥 LIVE DATA
        status: fixture.fixture.status.short,
        homeScore: fixture.goals.home,
        awayScore: fixture.goals.away,

        round: fixture.league.round,
        venue: fixture.fixture.venue?.name || null,
        city: fixture.fixture.venue?.city || null,

        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      total: fixtures.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
