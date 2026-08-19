"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

type Donation = {
  id: number;
  created_at: string;
  type: string;
  name: string;
  phone: string;
  location: string;
  item: string;
  quantity: string;
};

export default function DonationsPage() {
  const router = useRouter();

  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDonations() {
      if (!supabase) {
        router.replace("/");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin");
        return;
      }

      if (user.email !== "admin@sanjushrifoundation.org") {
        await supabase.auth.signOut();
        router.replace("/admin");
        return;
      }

      const { data, error } = await supabase
        .from("donation_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading donations:", error);
        setLoading(false);
        return;
      }

      setDonations(data || []);
      setLoading(false);
    }

    loadDonations();
  }, [router]);

  async function handleLogout() {
    await supabase?.auth.signOut();
    router.replace("/admin");
  }

  if (loading) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Loading donation requests...</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Donation Requests</h1>
          <p>Admin dashboard</p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {donations.length === 0 ? (
        <p style={{ marginTop: "40px" }}>
          No donation requests yet.
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "30px",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.id}</td>
                  <td>{donation.type}</td>
                  <td>{donation.name}</td>
                  <td>{donation.phone}</td>
                  <td>{donation.location}</td>
                  <td>{donation.item}</td>
                  <td>{donation.quantity}</td>
                  <td>
                    {new Date(
                      donation.created_at
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}