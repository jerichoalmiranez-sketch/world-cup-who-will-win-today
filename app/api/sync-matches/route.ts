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

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status}`);
    }

    const data = await res.json();
    const fixtures = data.response;

    if (!fixtures || fixtures.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No fixtures returned",
      });
    }

    for (const fixture of fixtures) {
      const id = fixture.fixture.id;

      await setDoc(doc(db, "matches", String(id)), {
        apiId: id,
        homeTeam: fixture.teams.home.name,
        awayTeam: fixture.teams.away.name,
        date: fixture.fixture.date,
        round: fixture.league.round,
        venue: fixture.fixture.venue?.name || null,
        city: fixture.fixture.venue?.city || null,
        status: fixture.fixture.status.short,
        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      total: fixtures.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
