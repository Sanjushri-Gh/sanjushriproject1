 import { supabase } from "../../lib/supabase";

export default async function TestDatabase() {
  if (!supabase) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>❌ Supabase Not Connected</h1>
        <p>Check your .env.local file.</p>
      </main>
    );
  }

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .limit(1);

  if (error) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>⚠️ Supabase Connection Test</h1>

        <p>
          Supabase is connected, but the database table is not ready.
        </p>

        <pre>{error.message}</pre>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>✅ Supabase Connected!</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
