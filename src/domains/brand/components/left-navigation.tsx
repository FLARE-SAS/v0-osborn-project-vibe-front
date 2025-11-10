"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LeftNavigationProps {
  activeSection: string
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "logos", label: "Logos" },
  { id: "assets", label: "Assets" },
]

export function LeftNavigation({ activeSection }: LeftNavigationProps) {
  return (
    <aside className="fixed left-0 top-[120px] w-[115px] h-[calc(100vh-120px)] flex flex-col items-end pr-6 z-40">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="icon"
        className="mb-8 opacity-80 hover:opacity-100 transition-smooth hover:bg-transparent"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>

      {/* Navigation List */}
      <nav className="flex-1 relative">
        <ul className="space-y-2 text-right">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={cn(
                  "text-sm transition-smooth",
                  activeSection === section.id ? "font-bold opacity-100" : "opacity-60 hover:opacity-80",
                )}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Scroll Indicator Line */}
        <div className="absolute right-[-16px] top-0 bottom-0 w-[1px] bg-white/20">
          <div
            className="w-[5px] h-8 bg-white rounded-full absolute right-[-2px] transition-smooth"
            style={{
              top: `${(sections.findIndex((s) => s.id === activeSection) / sections.length) * 100}%`,
            }}
          />
        </div>
      </nav>
    </aside>
  )
}
