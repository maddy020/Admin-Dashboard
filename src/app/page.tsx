"use client";

import { useEffect } from "react";
import SignIn from "../components/SignIn/page";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

// export const metadata: Metadata = {
//   title:
//     "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    async function getUserSession() {
      const session = await getSession();
      console.log(session);
      if (session !== null) {
        router.push("/dashboard");
      } else router.push("/api/auth/signin");
    }
    getUserSession();
  }, [router]);
  return <></>;
}
