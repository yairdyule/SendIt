import { Session } from "@supabase/supabase-js";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Account from "../components/Account";
import Auth from "../components/Auth";
import { supabase } from "../lib/supabaseClient";
import { Profile, Error } from "../lib/constants";

const Home: NextPage = () => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [profiles, setProfiles] = useState<Profile[] | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange(
      (_event: string, session: AuthSession | null) => {
        setSession(session);
      }
    );
  }, []);

  useEffect(() => {
    getPublicProfiles();
  }, []);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth />
      ) : (
        <div className="row">
          <div className="col-6">
            <h3>Account</h3>
            <Account key={session?.user?.id} session={session} />
          </div>
          <div className="col-6">
            <h3>Public Profiles</h3>
            <ProfileList profiles={profiles} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );

  type Error = any;
  async function getPublicProfiles() {
    try {
      const { data, error } = await supabase
        .from<Profile>("profiles")
        .select("id, username, avatar_url, website, updated_at")
        .order("updated_at", { ascending: false });

      if (!data || error) throw error || new Error("No data");

      console.log("public profiles:", data);
      setProfiles(data);
    } catch (error: Error) {
      console.log("error", error.message);
    }
  }
};

export default Home;
