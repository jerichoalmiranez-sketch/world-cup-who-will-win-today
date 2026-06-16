import { NextResponse } from "next/server";

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

    return NextResponse.json({
      success: true,
      count: data.response?.length || 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}        updatedAt: new Date().toISOString(),
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
}        updatedAt: new Date().toISOString(),
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
