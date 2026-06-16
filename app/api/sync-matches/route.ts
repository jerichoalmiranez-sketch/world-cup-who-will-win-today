import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://v3.football.api-sports.io/fixtures?league=1&season=2026",
      {
        headers: {
          "x-rapidapi-key": process.env.FOOTBALL_API_KEY ?? "",
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json({
      success: true,
      count: data?.response?.length ?? 0,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
