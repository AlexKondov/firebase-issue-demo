"use client";

// import Navigation from "../../components/Navigation";
import QueryProvider from "../../components/QueryProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Navigation /> */}
      <main className="flex flex-col py-2 mx-auto max-w-3xl px-4 md:px-0 my-10">
        <QueryProvider>{children}</QueryProvider>
      </main>
    </>
  );
}
