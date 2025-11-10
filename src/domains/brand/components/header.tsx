"use client"

import { useState } from "react"
import { Bell, ChevronDown, Home, Palette, Type, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface HeaderProps {
  isScrolled: boolean
  onToggleNotifications: () => void
}

export function Header({ isScrolled, onToggleNotifications }: HeaderProps) {
  const [activeNav, setActiveNav] = useState("colors")

  const navItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "colors", label: "Colors", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "assets", label: "Assets", icon: ImageIcon },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-20 transition-smooth",
        "blur-24 neon-glow",
        isScrolled ? "bg-black/40" : "bg-transparent",
      )}
      style={{
        boxShadow: isScrolled
          ? "0 4px 20px rgba(0, 0, 0, 0.15)"
          : "0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(255, 255, 255, 0.05)",
      }}
    >
      <div className="h-full px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center font-bold text-white">
            O
          </div>
        </div>

        {/* Center Navigation Capsule */}
        <nav className="flex items-center h-[43px] px-4 rounded-full bg-black/40 border border-white/15 gap-1">
          {/* Brand Item */}
          <div className="flex items-center gap-2 px-3 py-1.5 mr-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-purple-500" />
            <span className="text-xs font-semibold uppercase tracking-wide">Brand Name</span>
          </div>

          {/* Navigation Items */}
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeNav === item.id

            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setActiveNav(item.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-smooth relative",
                  "hover:opacity-100",
                  isActive ? "opacity-100 font-bold" : "opacity-60",
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>

                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[3px] bg-red-500 rounded-full pulse-glow-red" />
                )}

                {!isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-white rounded-full transition-all duration-300 group-hover:w-3/4" />
                )}
              </Button>
            )
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleNotifications}
            className="w-[43px] h-[43px] rounded-full bg-black/40 border border-white/15 hover:bg-black/60 transition-smooth"
          >
            <Bell className="w-5 h-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-[43px] px-3 rounded-full bg-black/40 border border-white/15 hover:bg-black/60 transition-smooth"
              >
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">John Doe</span>
                <ChevronDown className="w-4 h-4 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Theme</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
