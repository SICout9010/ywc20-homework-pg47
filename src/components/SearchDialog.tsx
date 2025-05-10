'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { useAtom } from "jotai"
import { candidatesAtom, searchAtom, selectedMajorAtom } from "@/lib/atoms"
import { useState } from "react"
import { cn } from "@/lib/utils"

const majors = [
    { display: "💻 Programming", value: "programming" },
    { display: "🎨 Design", value: "design" },
    { display: "🎯 Marketing", value: "marketing" },
    { display: "📝 Content", value: "content" }
] as const;

export default function SearchDialog() {
    const [selectedMajor, setSelectedMajor] = useAtom(selectedMajorAtom);
    const [search, setSearch] = useAtom(searchAtom);
    const [localSearch, setLocalSearch] = useState<string>("");

    return (
        <div className="flex items-center justify-center w-full flex-col gap-3">
            <div className="md:max-w-2xl w-full grid grid-cols-2 md:grid-cols-4 gap-3">    
                {majors.map((major) => (
                    <button onClick={(e) => {
                        e.preventDefault();
                        setSelectedMajor(major.value);
                    }}
                     key={major.value} 
                     className={cn("mx-auto p-2 cursor-pointer hover:bg-white hover:text-black transition-all duration-300 w-[150px] min-w-[4rem] rounded-full border-1 border-[#3F3F3F]", selectedMajor === major.value ? "bg-white text-black" : "")}>
                        {major.display}
                    </button>
                ))}
            </div>
            <div className="relative w-full max-w-md">
                <input
                    onChange={(e) => {
                        e.preventDefault();
                        setLocalSearch(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setSearch(localSearch);
                        }
                    }}
                    type="text"
                    placeholder="ค้นหาด้วยแท็คหรือชื่อเต็ม"
                    className="w-full px-4 py-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
        </div>
    )
}