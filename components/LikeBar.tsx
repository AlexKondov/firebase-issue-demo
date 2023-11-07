import { useEffect, useState } from "react";
import Ale from "../illustrations/Ale";

interface Props {
  isReadOnly: boolean;
  answerId: number;
  userLikes: Array<number>;
  currentLikes: number;
  onAnswerLiked: () => void;
}

export default function LikeBar({
  isReadOnly,
  answerId,
  userLikes,
  currentLikes,
  onAnswerLiked,
}: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(currentLikes);
  useEffect(() => {
    if (Array.isArray(userLikes)) {
      setIsLiked(userLikes.includes(answerId));
    }
  }, [userLikes]);

  return (
    <div className="flex justify-center items-center">
      {isReadOnly ? (
        // We show the number of likes to users who liked the answer
        // This way we avoid people piling up on popular answers
        <div className="text-3xl mr-2 text-gray-500">{likesCount}</div>
      ) : null}
      <button
        onClick={() => {
          if (!isLiked && !isReadOnly) {
            onAnswerLiked();
            setIsLiked(true);
            setLikesCount(likesCount + 1);
          }
        }}
        className={`flex items-center justify-center rounded-full w-10 h-10 transition-all duration-100 select-none ${
          isReadOnly
            ? "bg-white border border-gray-500 cursor-default"
            : isLiked
            ? "bg-fuchsia-500 border border-black cursor-default"
            : "bg-white border border-gray-500 cursor-pointer active:scale-75 brutalist-sm"
        }`}
      >
        <Ale />
      </button>
    </div>
  );
}
