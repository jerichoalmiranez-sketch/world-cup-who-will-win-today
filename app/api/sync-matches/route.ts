import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const BASE_URL = "https://v3.football.api-sports.io";

export async function GET() {
  try {
    const response = await axios.get(`${BASE_URL}/fixtures`, {
      params: {
        league: 1,
        season: 2026,
      },
      headers: {
        "x-apisports-key": process.env.FOOTBALL_API_KEY!,
      },
    });

    const fixtures = response.data.response;

    for (const fixture of fixtures) {
      await addDoc(collection(db, "matches"), {
        apiId: fixture.fixture.id,
        homeTeam: fixture.teams.home.name,
        awayTeam: fixture.teams.away.name,
        date: fixture.fixture.date,
        round: fixture.league.round,
        venue: fixture.fixture.venue.name,
        status: fixture.fixture.status.short,
      });
    }

    return NextResponse.json({
      success: true,
      total: fixtures.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
