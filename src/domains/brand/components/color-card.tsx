"use client"

import type React from "react"

import { useState } from "react"
import { MoreVertical, Copy, Lock, Unlock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import type { BrandColor } from "../types"
import { useBrandStore } from "../stores/brand-store"
import { cn } from "@/lib/utils"

interface ColorCardProps {
  color: BrandColor
  style?: React.CSSProperties
}

export function ColorCard({ color, style }: ColorCardProps) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null)
  const selectedColorIds = useBrandStore((state) => state.selectedColorIds)
  const toggleSelectColor = useBrandStore((state) => state.toggleSelectColor)
  const updateColor = useBrandStore((state) => state.updateColor)
  const deleteColors = useBrandStore((state) => state.deleteColors)

  const isSelected = selectedColorIds.includes(color.id)

  const handleCopy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value)
    setCopiedValue(label)
    setTimeout(() => setCopiedValue(null), 1500)
  }

  const handleToggleCmykLock = () => {
    updateColor(color.id, { isCmykLocked: !color.isCmykLocked })
  }

  return (
    <TooltipProvider>
      <div
        className={cn(
          "group relative h-[222px] rounded-xl overflow-hidden transition-smooth",
          "hover:shadow-lg neon-glow",
          isSelected && "ring-2 ring-white",
        )}
        style={style}
      >
        {/* Color Preview (75%) */}
        <div className="h-[75%] relative" style={{ backgroundColor: color.hex }}>
          {/* Checkbox */}
          <div className="absolute top-3 left-3">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => toggleSelectColor(color.id)}
              className="bg-black/40 border-white/40"
            />
          </div>

          {/* Three-dot Menu */}
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/20"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Move to Group</DropdownMenuItem>
                <DropdownMenuItem onClick={handleToggleCmykLock}>
                  {color.isCmykLocked ? "Unlock CMYK" : "Lock CMYK"}
                </DropdownMenuItem>
                <DropdownMenuItem>Edit Values</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={() => deleteColors([color.id])}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Info Section (25%) */}
        <div className="h-[25%] bg-[#232323] p-4 group-hover:bg-[#1f1f1f] transition-smooth">
          <h3 className="text-sm font-semibold text-white truncate mb-2">{color.name}</h3>

          {/* Color Values */}
          <div className="space-y-1 text-xs">
            {/* HEX */}
            <div className="flex items-center justify-between">
              <span className="text-white/60">HEX</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => handleCopy(color.hex, "HEX")}
                  className="text-white/80 hover:text-white transition-colors h-auto p-0 hover:bg-transparent"
                >
                  {color.hex}
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-5 h-5"
                      onClick={() => handleCopy(color.hex, "HEX")}
                    >
                      {copiedValue === "HEX" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{copiedValue === "HEX" ? "Copied!" : "Copy"}</TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* RGB */}
            <div className="flex items-center justify-between">
              <span className="text-white/60">RGB</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => handleCopy(`${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`, "RGB")}
                  className="text-white/80 hover:text-white transition-colors h-auto p-0 hover:bg-transparent"
                >
                  {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-5 h-5"
                      onClick={() => handleCopy(`${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`, "RGB")}
                    >
                      {copiedValue === "RGB" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{copiedValue === "RGB" ? "Copied!" : "Copy"}</TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* CMYK */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-white/60">CMYK</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleToggleCmykLock}
                      className="w-4 h-4 p-0 hover:bg-transparent"
                    >
                      {color.isCmykLocked ? (
                        <Lock className="w-3 h-3 text-white/40" />
                      ) : (
                        <Unlock className="w-3 h-3 text-yellow-500" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {color.isCmykLocked ? "Locked (auto-calculated)" : "Manual mode active"}
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() =>
                    handleCopy(`${color.cmyk.c}, ${color.cmyk.m}, ${color.cmyk.y}, ${color.cmyk.k}`, "CMYK")
                  }
                  className="text-white/80 hover:text-white transition-colors h-auto p-0 hover:bg-transparent"
                >
                  {color.cmyk.c}, {color.cmyk.m}, {color.cmyk.y}, {color.cmyk.k}
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-5 h-5"
                      onClick={() =>
                        handleCopy(`${color.cmyk.c}, ${color.cmyk.m}, ${color.cmyk.y}, ${color.cmyk.k}`, "CMYK")
                      }
                    >
                      {copiedValue === "CMYK" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{copiedValue === "CMYK" ? "Copied!" : "Copy"}</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
