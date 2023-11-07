"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useInfiniteQuery } from "react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import AnswerList from "../../components/AnswerList";
import PromptForm from "../../components/PromptForm";
import useAuthentication from "../../hooks/useAuthentication";
import { useRouter } from "next/navigation";

enum Sort {
  Recent = "recent",
  Popular = "popular",
}

export default function Tavern() {
  const { user, userState } = useAuthentication();
  const [sort, setSort] = useState<Sort>(Sort.Recent);
  const router = useRouter();
  const { data, hasNextPage, isLoading, fetchNextPage, refetch } =
    useInfiniteQuery(
      ["prompt", sort],
      async ({ pageParam = 1 }) => {
        const token = await user?.getIdToken();
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_TAVERN_API_URL}/v1/prompts?page=${pageParam}&sort=${sort}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        return {
          response: result.data,
          nextPage: pageParam + 1,
        };
      },
      {
        enabled: !!user,
        getNextPageParam: (lastPage, allPages) => {
          if (
            lastPage.response.totalAnswers ===
            allPages.map((page) => page.response.answers).flat().length
          ) {
            return undefined;
          }

          return lastPage?.nextPage;
        },
      }
    );

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && !isLoading) {
        fetchNextPage();
      }
    },
    rootMargin: "100px",
  });

  const mutation = useMutation<any, any, any>(async (variables) => {
    const token = await user?.getIdToken();

    if (!token) {
      return;
    }

    return axios.post(
      `${process.env.NEXT_PUBLIC_TAVERN_API_URL}/v1/likes`,
      variables,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  });
  const saveAnswerMutation = useMutation<any, any, any>(
    async (variables) => {
      const token = await user?.getIdToken();

      if (!token) {
        return;
      }

      return axios.post(
        `${process.env.NEXT_PUBLIC_TAVERN_API_URL}/v1/answers`,
        variables,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    },
    {
      onSuccess: refetch,
    }
  );

  const prompt = data?.pages[0]?.response;

  const { data: likes } = useQuery(
    ["likes"],
    async () => {
      const token = await user?.getIdToken();

      return axios
        .get(
          `${process.env.NEXT_PUBLIC_TAVERN_API_URL}/v1/likes?filter=given-by&prompt_id=${prompt.id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => res.data.map((like: any) => like.answer_id));
    },
    {
      enabled: !!user && !!prompt,
    }
  );

  const answers = useMemo(
    () => data?.pages.map((page) => page.response.answers).flat(),
    [data?.pages]
  );

  if (userState === "no-account") {
    router.push("/auth");
    return;
  }

  return (
    <div>
      <div className="flex justify-center mb-10">
        <img src="/5.png" style={{ width: 300 }} />
      </div>

      <h1 className="text-5xl mb-4">
        {prompt ? `"${prompt.title}"` : <Skeleton />}
      </h1>
      <p className="mb-12 text-2xl font-bold">— The Innkeeper</p>

      {prompt?.isAnswered ? (
        <div className="mb-8 flex justify-end">
          <button
            onClick={() => setSort(Sort.Recent)}
            className={`${sort === "recent" ? "border-b border-black" : ""} ${
              sort === "recent" ? "" : ""
            } text-lg w-16 mr-4`}
          >
            Recent
          </button>
          <button
            onClick={() => setSort(Sort.Popular)}
            className={`${sort === "popular" ? "border-b border-black" : ""} ${
              sort === "popular" ? "" : ""
            } text-lg w-16`}
          >
            Popular
          </button>
        </div>
      ) : null}

      {!prompt ? (
        <>
          {Array(5)
            .fill(undefined)
            .map((_, i) => (
              <div key={i} className="mb-6">
                <Skeleton height={20} />
                <Skeleton height={60} />
              </div>
            ))}
        </>
      ) : prompt.isAnswered ? (
        <>
          <AnswerList
            userLikes={likes}
            answers={answers ? answers : []}
            onAnswerLiked={(answerId: number) =>
              mutation.mutate({
                user_id: user?.uid,
                prompt_id: prompt?.id,
                answer_id: answerId,
              })
            }
          />
          {hasNextPage ? (
            <p ref={ref} className="text-center text-xl text-gray-500">
              Loading more answers...
            </p>
          ) : null}
        </>
      ) : (
        <PromptForm
          isLoading={saveAnswerMutation.isLoading}
          answersCount={prompt?.totalAnswers}
          onAnswerSubmitted={(text: string) => {
            saveAnswerMutation.mutate({ text, prompt_id: prompt?.id });
          }}
        />
      )}
    </div>
  );
}
