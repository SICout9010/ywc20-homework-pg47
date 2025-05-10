import Image from "next/image";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ShowResult from "@/components/ShowResult";
import SearchDialog from "@/components/SearchDialog";
import Footer from "@/components/Footer";
import { useAtom } from "jotai";
import { candidatesAtom } from "@/lib/atoms";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export default async function Home() {

  const fetchCandidates = async () => {
    'use cache'
    console.log("Fetching candidates from YWC20 server...");
    const res = await fetch('https://api.ywc20.ywc.in.th/homework/candidates', {
      headers: {
        'x-reference-id': 'PG47'
      }
    });

    const data = await res.json();
    return data;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-inter)] bg-gradient-to-b from-[#500600] to-[#1A0200]">
      <Image src="/ywc20.svg" alt="YWC20" width={250} height={250} />
      <GridPattern
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "fixed inset-0 -z-10 opacity-40"
        )}
      />
      <main className="w-full flex flex-col gap-[32px] row-start-2 items-center justify-center sm:items-start">
        <SearchDialog candidatesProp={await fetchCandidates()} />
        <ShowResult />
      </main>
      <Footer />
    </div>
  );
}
