// import Ale from "../../../illustrations/Ale";
import Link from "next/link";
// import Navigation from "../../../components/Navigation";

export default async function WriteUpPage(props: any) {
  // const prompt = await (
  //   await fetch(`https://tavern-api.onrender.com/v1/prompts/${props.params.id}`)
  // ).json();

  // const [mostLiked, runnerUp, thirdPlace] = prompt.answers;

  return (
    <>
      {/* <Navigation /> */}
      <main>
        <div className="mx-auto w-full max-w-xl py-20 flex flex-col stretch">
          <Link href="/wall-of-fame" className="mb-8 underline">
            ← Back to write-ups
          </Link>
          {/* <h1 className="text-5xl mb-6">“{prompt.title}”</h1> */}
          <p className="text-lg font-bold mb-16">— The Innkeeper</p>
          {/* {mostLiked ? (
            <div className="relative overflow-hidden bg-black text-white p-8 pt-16 rounded-lg mb-12">
              <div className="absolute right-0 top-0 h-16 w-16">
                <div className="absolute transform rotate-45 bg-fuchsia-400 text-center text-black font-semibold py-1 right-[-40px] top-[28px] w-[170px] flex items-center justify-center">
                  Best <Ale />
                </div>
              </div>
              <p className="text-xl mb-4 whitespace-pre-line">
                “{mostLiked.text}”
              </p>
              <p className="text-lg text-fuchsia-400 font-bold">
                — {mostLiked.name}
              </p>
            </div>
          ) : null} */}
        </div>
      </main>
    </>
  );
}
