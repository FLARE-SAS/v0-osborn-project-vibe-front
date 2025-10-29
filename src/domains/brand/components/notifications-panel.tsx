"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/60 z-50 blur-24" onClick={onClose} />}

      {/* Panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-96 bg-[#1a1a1a] border-l border-white/20 z-50",
          "transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">Notifications</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/10">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <p className="text-sm text-muted-foreground text-center py-12">No notifications yet</p>
        </div>
      </aside>
    </>
  )
}
