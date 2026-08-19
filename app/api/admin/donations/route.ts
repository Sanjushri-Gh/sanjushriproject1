import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

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

    // Verify the logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { error: "Invalid session." },
        { status: 401 }
      );
    }

    // Only allow the admin account
    if (user.email !== "admin@sanjushrifoundation.org") {
      return NextResponse.json(
        { error: "Access denied." },
        { status: 403 }
      );
    }

    // Service-role client can read the table despite RLS
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