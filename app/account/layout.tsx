"use client";

import Navigation from "../../components/Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="flex flex-col py-2 mx-auto max-w-3xl px-4 md:px-0">
        {children}
      </main>
    </>
  );
}
