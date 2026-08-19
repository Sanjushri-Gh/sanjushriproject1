import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { supabase } from "../../../../lib/supabase";

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 401 }
      );
    }

    const token = authorization.replace("Bearer ", "");

    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured." },
        { status: 500 }
      );
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { error: "Invalid session." },
        { status: 401 }
      );
    }

    if (user.email !== "admin@sanjushrifoundation.org") {
      return NextResponse.json(
        { error: "Access denied." },
        { status: 403 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("donation_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading donations:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      donations: data ?? [],
    });
  } catch (error) {
    console.error("Donations API error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}