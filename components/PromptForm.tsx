import { useState } from "react";

const MINIMUM_ANSWER_LENGTH = 10;
const MAXIMUM_ANSWER_LENGTH = 100;

interface Props {
  isLoading: boolean;
  answersCount: number;
  onAnswerSubmitted: (answer: string) => void;
}

export default function PromptForm({
  isLoading,
  answersCount,
  onAnswerSubmitted,
}: Props) {
  const [answer, setAnswer] = useState("");
  const [confirmationPrompt, setConfirmationPrompt] = useState(false);
  const answerLength = answer
    .trim()
    .split(/\s+/)
    .filter((x) => x).length;
  const isAnswerLongEnough =
    answerLength >= MINIMUM_ANSWER_LENGTH &&
    answerLength <= MAXIMUM_ANSWER_LENGTH;

  return (
    <>
      <textarea
        className="rounded py-2 resize-none focus:outline-none text-2xl overflow-hidden w-full border p-4 border-black"
        value={answer}
        onChange={(e) => {
          e.target.style.height = "inherit";
          e.target.style.height = `${e.target.scrollHeight}px`;
          setAnswer(e.target.value);

          if (confirmationPrompt) {
            setConfirmationPrompt(false);
          }
        }}
        placeholder="Tell us what you think..."
      ></textarea>
      <p className="text-right text-gray-500 mb-6 -mt-2">
        {answerLength} words so far
      </p>

      <button
        className={`block cursor-pointer w-full bg-black text-white py-2 text-xl rounded shadow-solid transition-all disabled:bg-gray-600 ${
          confirmationPrompt ? "bg-fuchsia-500 shadow-solid-reverse" : ""
        }`}
        disabled={!isAnswerLongEnough || isLoading}
        onClick={() => {
          if (!confirmationPrompt) {
            setConfirmationPrompt(true);
            return;
          }

          if (answer.length > 1500) {
            // TODO: this catches the edge case of submitting few but very long words to go through the limit
            return;
          }

          onAnswerSubmitted(answer);
        }}
      >
        {isLoading
          ? "Saving..."
          : isAnswerLongEnough
          ? confirmationPrompt
            ? "Ready to submit? There's no editing."
            : "Submit"
          : `Write between ${MINIMUM_ANSWER_LENGTH} and ${MAXIMUM_ANSWER_LENGTH} words`}
      </button>
      <p className="text-xl mt-1 text-center mb-2">
        Submit your answer to see what{" "}
        <span className="text-fuchsia-500 font-bold text-3xl">
          {answersCount === 0 ? "" : answersCount}
        </span>{" "}
        other writer{answersCount === 1 ? "" : "s"} had to say.
      </p>
    </>
  );
}
