"use client";

import Link from "next/link";
import Ale from "../illustrations/Ale";
import useAuthentication from "../hooks/useAuthentication";

export default function Navigation({ path = "" }) {
  // TODO: this is not good design
  const { user } = useAuthentication(path === "/" ? false : true);
  return (
    <nav className="border-b-2 border-black md:px-12 py-3 flex justify-between items-center">
      <Link href="/" className="flex items-center">
        <Ale width={60} height={60} />
        <div className="leading-5 text-xl uppercase">
          Writers'
          <br /> Tavern
        </div>
      </Link>
      <ul className="flex justify-center uppercase text-xl md:text-lg">
        {user ? (
          <li className="px-4">
            <Link href="/tavern">Tavern</Link>
          </li>
        ) : null}
        <li className="px-4">
          <Link href="/wall-of-fame">Wall of Fame</Link>
        </li>
        <li className="px-4">
          {user ? (
            <Link href="/account">Account</Link>
          ) : (
            <Link href="/auth">Sign in</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
