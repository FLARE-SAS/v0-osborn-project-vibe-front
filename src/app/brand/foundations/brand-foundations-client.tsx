"use client"

import { useState, useEffect } from "react"
import { Header } from "@/domains/brand/components/header"
import { LeftNavigation } from "@/domains/brand/components/left-navigation"
import { ColorsSection } from "@/domains/brand/components/colors-section"
import { NotificationsPanel } from "@/domains/brand/components/notifications-panel"
import { useBrandStore } from "@/domains/brand/stores/brand-store"

export function BrandFoundationsClient() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false)
  const activeSection = useBrandStore((state) => state.activeSection)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleToggleNotifications = () => {
    setIsNotificationsPanelOpen(!isNotificationsPanelOpen)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header isScrolled={isScrolled} onToggleNotifications={handleToggleNotifications} />

      <div className="flex pt-[120px]">
        <LeftNavigation activeSection={activeSection} />

        <main className="flex-1 px-12 md:px-12 lg:px-12 pb-24">
          <div className="max-w-[1140px] mx-auto">
            <ColorsSection />
          </div>
        </main>
      </div>

      <NotificationsPanel isOpen={isNotificationsPanelOpen} onClose={() => setIsNotificationsPanelOpen(false)} />
    </div>
  )
}
