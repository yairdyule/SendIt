import { Session } from "@supabase/supabase-js";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Account from "../components/Account";
import Auth from "../components/Auth";
import { supabase } from "../utils/supabaseClient";
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session?.user?.id} session={session} />
      )}
    </div>
  );
};

export default Home;
