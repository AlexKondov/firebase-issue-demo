"use client";

import { useState } from "react";
import useAuthentication from "../../../hooks/useAuthentication";
import { useMutation, useQuery } from "react-query";
import { useDebounce } from "@uidotdev/usehooks";
import Link from "next/link";
import axios from "axios";

function getButtonText(isLoading: boolean, available: boolean) {
  if (isLoading) {
    return "Checking...";
  }

  if (typeof available === "boolean" && !available) {
    return "Name is taken. Try another one!";
  }

  return "Save name";
}

export default function EditPage() {
  const { user, account } = useAuthentication();
  const [name, setName] = useState("");
  const debouncedName = useDebounce(name, 500);

  const nameCheck = useQuery({
    queryKey: ["name", debouncedName],
    queryFn: async () => {
      const token = await user?.getIdToken();

      if (!token) {
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_TAVERN_API_URL}/v1/users/names/${debouncedName}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    },
  });

  const updateName = useMutation({
    mutationFn: async () => {
      const token = await user?.getIdToken();

      if (!token) {
        return;
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_TAVERN_API_URL}/v1/users`,
        {
          name: debouncedName,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    },
  });

  return (
    <div className="my-20">
      <Link href="/account" className="mb-8 underline">
        ← Back to account
      </Link>
      <h1 className="text-4xl mb-10 mt-16 text-center w-full">
        How should we call you here?
      </h1>
      <input
        className="w-full text-center mb-4 text-xl focus:outline-none border rounded border-black py-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="block cursor-pointer w-full bg-black text-white py-2 text-xl rounded shadow-solid transition-all"
        disabled={nameCheck.isLoading || !name || !nameCheck.data?.available}
        onClick={() => updateName.mutate()}
      >
        {getButtonText(nameCheck.isLoading, nameCheck.data?.available)}
      </button>
    </div>
  );
}
