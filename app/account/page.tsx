"use client";

import { useQuery } from "react-query";
import axios from "axios";
import useAuthentication from "../../hooks/useAuthentication";
import Ale from "../../illustrations/Ale";
import "react-loading-skeleton/dist/skeleton.css";
import Arrow from "../../illustrations/Arrow";
import Edit from "../../illustrations/Edit";
import Link from "next/link";

export default function Account() {
  const { user, account } = useAuthentication();

  // The following two requests should be unified as one endpoint
  const { data: answers } = useQuery(["answers", user?.uid], async () => {
    const token = await user?.getIdToken();

    if (!token) {
      return;
    }

    return axios
      .get(`${process.env.NEXT_PUBLIC_TAVERN_API_URL}/v1/answers`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res.data);
  });
  const { data: likes } = useQuery(["likes", user?.uid], async () => {
    const token = await user?.getIdToken();

    if (!token) {
      return;
    }

    return axios
      .get(
        `${process.env.NEXT_PUBLIC_TAVERN_API_URL}/v1/likes?filter=given-to`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => res.data);
  });
  const { data: stats } = useQuery(["awards", user?.uid], async () => {
    const token = await user?.getIdToken();

    if (!token) {
      return;
    }

    return axios
      .get(`${process.env.NEXT_PUBLIC_TAVERN_API_URL}/v1/users/stats`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res.data);
  });

  console.log(stats);

  const awardedAnswerIds = new Set(
    stats?.awards?.map((award: any) => award.answer_id)
  );

  return (
    <div className="py-24">
      <div className="flex items-center justify-between mb-16">
        <div>
          <h1 className="text-5xl mb-2">
            Hey, {account?.data ? `${account.data.name}!` : "you!"}
          </h1>
          <h4 className="text-2xl">Here's what you've been up to...</h4>
        </div>
        <div>
          <Link href="/account/edit">
            <button className="border-2 border-black rounded-full p-2 brutalist">
              <Edit />
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-row mb-16 flex">
        <div className="flex flex-col justify-between bg-slate-300 text-black rounded-lg p-4 mr-4 w-48 h-38">
          <p className="text-7xl">{stats?.streak ? stats?.streak : "..."}</p>
          <p className="mt-6 text-xl">Streak</p>
        </div>

        <div className="flex flex-col justify-between bg-fuchsia-500 text-white rounded-lg p-4 w-48 h-38 mr-4">
          <p className="text-7xl">{answers ? answers.length : "..."}</p>
          <p className="mt-6 text-xl">Answers</p>
        </div>

        <div className="flex flex-col justify-between bg-yellow-500 text-black rounded-lg p-4  w-48 h-38 mr-4">
          <p className="text-7xl">{likes ? likes.length : "..."}</p>
          <p className="mt-6 text-xl">Ales</p>
        </div>

        <div className="flex flex-col justify-between bg-black text-white rounded-lg p-4  w-48 h-38">
          <p className="text-7xl">
            {stats?.awards ? stats?.awards.length : "..."}
          </p>
          <p className="mt-6 text-xl">Awards</p>
        </div>
      </div>
      {answers?.map((answer: any) => (
        <div
          className="mb-16 border-2 border-black rounded-lg p-8 relative overflow-hidden"
          key={answer.id}
        >
          {awardedAnswerIds.has(answer.id) ? (
            <div className="absolute right-0 top-0 h-16 w-16">
              <div className="absolute transform rotate-45 bg-fuchsia-400 text-center text-black font-semibold py-1 right-[-40px] top-[28px] w-[170px] flex items-center justify-center">
                Awarded <Ale />
              </div>
            </div>
          ) : null}
          <p className="text-xl mb-2">"{answer.title}"</p>
          <p className="text-lg font-bold mb-8">— The Innkeeper</p>
          <div className="text-center my-8">
            <div className="inline-block">
              <Arrow size="small" />
            </div>
          </div>
          <div>
            <p className="text-xl mb-8 md:mb-2 md:pr-10 whitespace-pre-line">
              “{answer.text}”
            </p>
            <div className="flex items-center justify-between w-full">
              <p className="text-lg text-fuchsia-400 font-bold">— You</p>

              <div className="flex justify-center items-center">
                <div className="text-3xl text-gray-500">{answer.likes}</div>
                <div className="flex flex-col items-center justify-center rounded-full ml-2 w-10 h-10 transition-all duration-100 select-none bg-white border border-gray-500">
                  <Ale />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
