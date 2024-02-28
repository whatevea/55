import React from "react";

export default function WhyUpwork() {
  return (
    <div className="flex justify-start gap-10 px-10 py-20">
      <div className="flex flex-col gap-6 w-80">
        <div className="px-5 py-3 cursor-pointer rounded-md hover:bg-green-300">
          <h3 className="text-sm font-semibold">Success Stories</h3>
          <p className="pt-2 text-sm">
            Discover how teams work strategically and grow together.
          </p>
        </div>
        <div className="px-5 py-3 cursor-pointer rounded-md hover:bg-green-300">
          <h3 className="text-sm font-semibold">How to hire</h3>
          <p className="pt-2 text-sm">
            Learn about the different ways to get work done.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-72">
        <div className="px-5 py-3 cursor-pointer rounded-md hover:bg-green-300">
          <h3 className="text-sm font-semibold">Reviews</h3>
          <p className="pt-2 text-sm">
            See what it's like to collaborate on Upwork.
          </p>
        </div>
        <div className="px-5 py-3 cursor-pointer rounded-md hover:bg-green-300">
          <h3 className="text-sm font-semibold">How to find work</h3>
          <p className="pt-2 text-sm">
            Learn about how to grow your independent career.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-6 w-100">
        <div className="pt-3">
          <h3 className="text-sm font-semibold">Where work gets done</h3>
        </div>
        <div className="border border-slate-400 px-4 py-2 cursor-pointer rounded-md hover:bg-green-300">
          <p className="text-xs">Guides</p>
          <p className="mt-2 text-sm font-normal">
            Getting Started as a Freelancer
          </p>
        </div>
        <div className="border border-slate-400 px-4 py-2 cursor-pointer rounded-md hover:bg-green-300">
          <p className="text-xs">Guides</p>
          <p className="mt-2 text-sm font-normal">
            Growing Your Freelance Career
          </p>
        </div>
        <div className="border border-slate-400 px-4 py-2 cursor-pointer rounded-md hover:bg-green-300">
          <p className="text-xs">Guides</p>
          <p className="mt-2 text-sm font-normal">
            Hiring & Working with Independent Talent
          </p>
        </div>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
          className="text-green-500"
        >
          <span className="text-grenn-500 underline hover:no-underline">
            See Resources
          </span>{" "}
          &gt;
        </a>
      </div>
    </div>
  );
}
