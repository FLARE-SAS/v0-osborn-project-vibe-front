"use client"

import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EyePasswordProps {
  onToggle: () => void
  isVisible: boolean
}

export const EyePassword = ({ onToggle, isVisible }: EyePasswordProps) => {
  if (isVisible) {
    return (
      <Button type="button" variant="ghost" size="icon-sm" className="input-text__show-password" onClick={onToggle}>
        <EyeOffIcon />
      </Button>
    )
  }

  return (
    <Button type="button" variant="ghost" size="icon-sm" className="input-text__show-password" onClick={onToggle}>
      <EyeIcon />
    </Button>
  )
}
