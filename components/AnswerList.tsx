import React from "react";
import useAuthentication from "../hooks/useAuthentication";
import Arrow from "../illustrations/Arrow";
import LikeBar from "./LikeBar";
import Innkeeper from "../illustrations/Innkeeper";

interface Answer {
  id: number;
  text: string;
  likes: number;
  author: {
    id: string;
    name: string;
  };
  type: "text" | "ai";
}

interface Props {
  userLikes: Array<number>;
  answers: Array<Answer>;
  onAnswerLiked: (answerId: number) => void;
}

export default function AnswerList({
  userLikes,
  answers,
  onAnswerLiked,
}: Props) {
  const { user } = useAuthentication();

  return (
    <div>
      <div className="relative overflow-hidden border-2 border-black p-8 rounded-lg mb-4 pb-40">
        <p className="text-xl mb-8 md:mb-2 md:pr-10 whitespace-pre-line">
          “Life, in its vastness, is like a canvas. Each of us holds a brush,
          painting our unique strokes of experiences and emotions. While the
          grand design may remain elusive, it's in the act of painting, with
          love and passion, that we find purpose. Each brushstroke, no matter
          how small, contributes to the masterpiece of existence. Embrace the
          journey, for it is in the creation that life's true meaning unfolds.”
        </p>
        <p className="text-lg text-black font-bold">— Tavern Regular</p>
        <div className="absolute -left-8">
          <Innkeeper />
        </div>
      </div>
      {answers.map((answer, i) => (
        <React.Fragment key={i}>
          {i !== 0 ? (
            <div className="text-center my-8">
              <div className="inline-block">
                <Arrow size="small" />
              </div>
            </div>
          ) : null}
          <div className="relative overflow-hidden border-2 border-black rounded-lg p-8 mb-12">
            <p className="text-xl mb-8 md:mb-2 md:pr-10 whitespace-pre-line">
              “{answer.text}”
            </p>
            <div className="flex items-center justify-between w-full">
              <p className="text-lg text-fuchsia-500 font-bold">
                —{" "}
                {answer.type === "text" ? answer.author.name : "The Innkeeper"}
              </p>

              {answer.type === "text" ? (
                <LikeBar
                  isReadOnly={answer.author.id === user?.uid}
                  answerId={answer.id}
                  userLikes={userLikes}
                  currentLikes={answer.likes}
                  onAnswerLiked={() => onAnswerLiked(answer.id)}
                />
              ) : null}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
