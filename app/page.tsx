"use client";

import Link from "next/link";
// import Navigation from "../components/Navigation";
import Arrow from "../illustrations/Arrow";
import Cook from "../illustrations/Cook";

export default function Page() {
  return (
    <>
      {/* <Navigation path="/" /> */}
      <main>
        <div className="bg-black text-white border-b-2 border-black">
          <div className="flex flex-col py-2 mx-auto max-w-4xl px-4 md:px-0">
            <section className="text-center mt-20 md:mb-20">
              <h1 className="uppercase font-black text-5xl md:text-7xl mb-4">
                Welcome to the Tavern!
              </h1>
              <h2 className="text-5xl">
                What's on your{" "}
                <span
                  className="inline-block"
                  style={{
                    background: `url(data:image/svg+xml,%3Csvg%0A%20%20%20%20%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%20%20%20%20width%3D%22100.63932%22%0A%20%20%20%20%20%20height%3D%2225.23866%22%0A%20%20%20%20%20%20viewBox%3D%220%200%2070.63932%2025.23866%22%0A%20%20%20%20%20%20className%3D%22absolute%20left-12%22%0A%20%20%20%20%3E%0A%20%20%20%20%20%20%3Cpath%0A%20%20%20%20%20%20%20%20d%3D%22M2.41072%2C7.75929c17.02568-.71364%2C34.05136-1.42727%2C51.07704-2.14091l14.70022-.61616-.6646-4.9107c-12.91114%2C2.24931-25.50153%2C6.02077-37.59863%2C11.04984-1.14989%2C.47804-1.99105%2C1.41114-1.79075%2C2.743%2C.18277%2C1.21528%2C1.18621%2C2.16637%2C2.45535%2C2.1677%2C3.4797%2C.00364%2C6.85119%2C.81258%2C9.99116%2C2.3105v-4.31735c-1.72999%2C.82125-3.65929%2C1.50251-5.2661%2C2.545-1.85577%2C1.20401-2.56038%2C3.57856-1.73346%2C5.61093%2C.99904%2C2.45541%2C3.31379%2C2.88317%2C5.70214%2C3.03169%2C3.21346%2C.19982%2C3.20156-4.80092%2C0-5-.42704-.02655-.86602-.10566-1.29319-.10946-.13576-.00121%2C.18317%2C.04243%2C.17324%2C.1348-.03856%2C.35884-.0895-.27388%2C.03982%2C.08986%2C.16194%2C.45549%2C.043-.29009%2C.0075%2C.15826-.02632%2C.33249-.53569%2C.38661%2C.03405%2C.1632%2C.2588-.10148%2C.50866-.24147%2C.75941-.3605%2C1.36673-.64881%2C2.73345-1.29761%2C4.10018-1.94642%2C1.63647-.77686%2C1.63166-3.53897%2C0-4.31735-3.94824-1.8835-8.12283-2.98855-12.51475-2.99314l.6646%2C4.9107c12.09709-5.02907%2C24.68748-8.80052%2C37.59863-11.04984%2C2.7805-.4844%2C2.12863-5.02778-.6646-4.9107C51.16231%2C.71586%2C34.13662%2C1.42949%2C17.11094%2C2.14313L2.41072%2C2.75929c-3.20582%2C.13437-3.22276%2C5.13508%2C0%2C5h0Z%22%0A%20%20%20%20%20%20%20%20fill%3D%22%23F0ABFC%22%0A%20%20%20%20%20%20%20%20origin%3D%22undraw%22%0A%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%3C%2Fsvg%3E)`,
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: "bottom",
                    backgroundPositionX: "center",
                    height: 75,
                    backgroundSize: 120,
                  }}
                >
                  mind
                </span>
                ?
              </h2>
              <div className="flex justify-center md:mt-12 w-full mx-auto">
                <Cook />
              </div>
            </section>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-black md:h-[600px]">
          <div className="border-b-2 md:border-r-2 md:border-b-0 border-black px-10 md:px-20 py-32">
            <h2 className="text-5xl mb-6">Writing is not just for writers.</h2>
            <p className="text-xl mb-4">
              In the same way that we all benefit from a good run or a session
              at the gym, we can all reap the rewards of putting pen to paper —
              or fingers to keys.
            </p>
            <p className="text-xl mb-4">
              Journaling is your space to explore ideas, vent frustrations, and
              celebrate victories, big and small.
            </p>
          </div>
          <div className="flex justify-center items-center py-20 md:py-0">
            <img src="/1.png" alt="lightbulb" width={400} height={400} />
          </div>
        </div>

        <div className="featured-row grid grid-cols-1 md:grid-cols-2 border-b-2 border-black md:h-[600px]">
          <div className="hidden md:flex justify-center items-center border-black md:border-r-2 py-20">
            <img src="/2.png" alt="lightbulb" width={400} height={400} />
          </div>

          <div className="px-10 md:px-20 py-32 flex justify-center flex-col bg-black text-white">
            <h2 className="text-5xl mb-6">Start writing here.</h2>
            <p className="text-xl mb-4">
              This is a place for the beginners, the curious, the ones making
              their first steps. Every new tavern visitor is embraced, and every
              word celebrated.
            </p>
          </div>

          <div className="md:hidden flex justify-center items-center border-black md:border-r-2 py-20 md:py-0">
            <img src="/2.png" alt="lightbulb" width={400} height={400} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-black md:h-[600px]">
          <div className="border-b-2 md:border-b-0 md:border-r-2 border-black px-10 md:px-20 py-32 flex justify-center flex-col">
            <h2 className="text-5xl mb-6">
              But I have nothing to write about!
            </h2>
            <p className="text-xl mb-4">
              You'll never stare at a blank page again. We'll guide you along
              the way with prompts and directions.
            </p>
          </div>

          <div className="flex justify-center items-center py-20 md:py-0">
            <img src="/3.png" alt="lightbulb" width={400} height={400} />
          </div>
        </div>

        <div className="border-b-2 border-black py-20 bg-black text-white">
          <h2 className="text-center text-5xl mb-20 px-2 ">
            How does the tavern work?
          </h2>
          <div className="">
            <div className="text-center px-10">
              <h3 className="text-3xl mb-4 flex justify-center items-center">
                <span className="text-2xl rounded-full h-8 w-8 flex justify-center items-center mr-2 bg-white text-black">
                  1
                </span>
                A writing prompt
              </h3>
              <p className="text-lg">
                Every 3 days the innkeeper gives everyone a writing prompt.
              </p>
            </div>
            <div className="text-center my-32">
              <div className="inline-block">
                <Arrow />
              </div>
            </div>
            {/* <div className="h-60 w-0.5 bg-slate-700 rounded w-0.5 mx-auto my-10" /> */}
            <div className="text-center px-10">
              <h3 className="text-3xl mb-4 flex justify-center items-center">
                <span className="text-2xl rounded-full h-8 w-8 flex justify-center items-center mr-2 bg-white text-black">
                  2
                </span>
                Write at least 50 words
              </h3>
              <p className="text-lg">
                You can see what others have written after you submit your
                write-up.
              </p>
            </div>
            <div className="text-center my-32">
              <div className="inline-block">
                <Arrow />
              </div>
            </div>
            {/* <div className="h-60 w-0.5 bg-slate-700 rounded w-0.5 mx-auto my-10" /> */}
            <div className="text-center px-10">
              <h3 className="text-3xl mb-4 flex justify-center items-center">
                <span className="text-2xl rounded-full h-8 w-8 flex justify-center items-center mr-2 bg-white text-black">
                  3
                </span>
                Everything is gone
              </h3>
              <p className="text-lg">
                In 3 days, the most-liked answers get an award and all others
                are gone
              </p>
            </div>
            <div className="text-center my-32">
              <div className="inline-block">
                <Arrow />
              </div>
            </div>
            {/* <div className="h-60 w-0.5 bg-slate-700 rounded w-0.5 mx-auto my-10" /> */}
            <div className="text-center px-10">
              <h3 className="text-3xl mb-4 flex justify-center items-center">
                <span className="text-2xl rounded-full h-8 w-8 flex justify-center items-center mr-2 bg-white text-black">
                  4
                </span>
                Repeat
              </h3>
              <p className="text-lg">
                The most awarded submitted texts go on our{" "}
                <Link
                  href="/wall-of-fame"
                  style={{ textDecoration: "underline" }}
                >
                  wall of fame
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="border-b-2 border-black pt-20">
          <h2 className="text-5xl text-center mb-4">Why don't you try?</h2>
          <p className="text-center text-2xl mb-20">
            Sign up in 30 seconds and get to writing
          </p>
          <button className="mx-auto block text-2xl bg-fuchsia-400 border-2 border-black rounded px-10 py-4 brutalist mb-32">
            Get me a seat!
          </button>

          <p className="text-center pb-4">
            Illustrations from <a href="https://absurd.design">absurd.design</a>
          </p>
        </div>
      </main>
    </>
  );
}
