"use client";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { ShareIcon, DownloadIcon } from "lucide-react";
import { useToBlob } from "@hugocxl/react-to-image";
import { useAtom } from "jotai";
import { filteredResultsAtom } from "@/lib/atoms";
import confetti from "canvas-confetti";

function ShowResult() {
  const [filteredResults] = useAtom(filteredResultsAtom);

  if (filteredResults) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        y: 0.7
      }
    })
  }

  const [state, converToBlob, ref] = useToBlob<HTMLDivElement>({
    onSuccess: async (blob: Blob | null) => {
      if (blob && typeof window !== "undefined") {
        await window.navigator
          .share({
            files: [
              new File([blob], "ywc20-result.png", { type: "image/png" }),
            ],
          })
          .then(() => {
            console.log("shared");
          })
          .catch((error) => {
            console.log(error);
            return;
          });
      }
    },
    onError: (error) => {
      console.log(error);
      return;
    },
  });

  const [stateSave, saveToMachine, refSave] = useToBlob<HTMLDivElement>({
    onSuccess: async (blob: Blob | null) => {
      if (blob && typeof window !== "undefined") {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filteredResults?.interviewRefNo}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    },
    onError: (error) => {
      console.log(error);
      return;
    },
  });

  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full">
      <div
        ref={(el) => {
          if (el) {
            ref(el);
            refSave(el);
          }
        }}
        className="flex flex-col justify-center items-center w-full max-w-2xl h-[50vh]"
      >
        {!filteredResults ? (
          <div>ไม่พบข้อมูล</div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center">
              <h1 className="mt-10 text-4xl font-bold mb-4">
                Congrats! 🎉🥳
                <p className="mt-2 text-sm text-gray-500">
                  ขอแสดงความยินดีด้วย
                </p>
              </h1>
              <h2 className="text-2xl font-bold mb-4">
                {filteredResults.firstName} {filteredResults.lastName}
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="p-2 w-[150px] min-w-[4rem] rounded-full border-1 border-[#3F3F3F]">
                  <span className="text-sm font-extrabold">ID: </span>
                  <span className="text-sm font-medium">
                    {filteredResults.interviewRefNo}
                  </span>
                </div>
                <div className="p-2 w-[150px] min-w-[4rem] rounded-full border-1 border-[#3F3F3F]">
                  <span className="text-sm font-extrabold">สาขา: </span>
                  <span className="text-sm font-medium">
                    {filteredResults.major}
                  </span>
                </div>
              </div>
              <div className="mt-6 mb-6">
                <span className="inline-block px-6 py-2 rounded-full text-sm font-medium bg-green-500/20 text-green-500">
                  "ผ่านการคัดเลือก"
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <Button className="w-[250px] h-[50px] rounded-full bg-green-500 text-white drop-shadow-lg hover:bg-green-600">
                  ยินยันสิทธิ์
                </Button>
                <Button className="mt-4 w-[150px] h-[40px] rounded-full bg-red-500 text-white drop-shadow-lg hover:bg-red-600">สละสิทธิ์</Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Share Button */}
      {/* <div className="flex gap-4 justify-around items-center w-full">
        <Button
          className="w-32 h-16 rounded-4xl"
          onClick={() => converToBlob()}
        >
          <ShareIcon />
        </Button>

        <Button className="w-32 h-16 rounded-4xl" onClick={() => saveToMachine()}>
          <DownloadIcon />
        </Button>
      </div> */}
    </div>
  );
}

export default ShowResult;
