// import Link from "next/link";
// import Navigation from "../../components/Navigation";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export default async function SloganGenerator() {
  // const prompts = await (
  //   await fetch("https://tavern-api.onrender.com/v1/prompts/latest?")
  // ).json();

  return (
    <>
      {/* <Navigation /> */}
      <div className="mx-auto w-full max-w-xl py-24 flex flex-col stretch">
        <div className="flex items-center mb-20">
          <img
            src="/4.png"
            style={{ width: 150, objectFit: "contain", marginRight: 10 }}
          />
          <div>
            <h1 className="text-5xl mb-4">Wall of Fame</h1>
            <p className=" text-xl">
              Past prompts and their most awarded answers.
            </p>
          </div>
        </div>
        {/* {prompts.map((prompt: any) => (
          <Link
            href={`/wall-of-fame/${prompt.id}`}
            className="border-2 border-black rounded-lg px-8 py-8 brutalist mb-12"
          >
            <h2 className="text-3xl mb-4">“{prompt.title}”</h2>
            <p className="mb-12 text-lg">
              <span className="font-bold">— The Innkeeper</span>, on{" "}
              {dayjs(prompt.start_date).format("MMMM Do")}
            </p>
            <div className="float-right">Read awarded answers →</div>
          </Link>
        ))} */}
      </div>
    </>
  );
}
