"use client"

import { useState, useEffect } from "react"
import { Plus, Pipette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useBrandStore } from "../stores/brand-store"
import { hexToRgb, rgbToHex, rgbToCmyk, isValidHex } from "../utils/color-utils"
import type { ColorFormData } from "../types"

interface AddColorModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddColorModal({ isOpen, onClose }: AddColorModalProps) {
  const [formData, setFormData] = useState<ColorFormData>({
    name: "",
    hex: "#000000",
    rgb: { r: 0, g: 0, b: 0 },
    saveOption: "individual",
    addAnother: false,
  })

  const groups = useBrandStore((state) => state.groups)
  const addColor = useBrandStore((state) => state.addColor)
  const addGroup = useBrandStore((state) => state.addGroup)

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showDiscardModal, setShowDiscardModal] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        hex: "#000000",
        rgb: { r: 0, g: 0, b: 0 },
        saveOption: "individual",
        addAnother: false,
      })
      setHasUnsavedChanges(false)
    }
  }, [isOpen])

  const handleHexChange = (hex: string) => {
    let cleanHex = hex.trim()
    if (!cleanHex.startsWith("#")) {
      cleanHex = "#" + cleanHex
    }

    setFormData((prev) => ({ ...prev, hex: cleanHex }))
    setHasUnsavedChanges(true)

    if (isValidHex(cleanHex)) {
      const rgb = hexToRgb(cleanHex)
      if (rgb) {
        setFormData((prev) => ({ ...prev, rgb }))
      }
    }
  }

  const handleRgbChange = (channel: "r" | "g" | "b", value: string) => {
    const numValue = Number.parseInt(value) || 0
    const clampedValue = Math.min(255, Math.max(0, numValue))

    const newRgb = { ...formData.rgb, [channel]: clampedValue }
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)

    setFormData((prev) => ({
      ...prev,
      rgb: newRgb,
      hex: newHex,
    }))
    setHasUnsavedChanges(true)
  }

  const handleSave = () => {
    if (!formData.name.trim()) return

    const cmyk = rgbToCmyk(formData.rgb.r, formData.rgb.g, formData.rgb.b)

    let groupId: string | undefined

    if (formData.saveOption === "new-group" && formData.newGroupName) {
      const newGroup = {
        name: formData.newGroupName,
        color: formData.hex,
      }
      addGroup(newGroup)
      // In a real app, we'd get the ID from the store
      groupId = "new-group-id"
    } else if (formData.saveOption === "existing-group" && formData.groupId) {
      groupId = formData.groupId
    }

    addColor({
      name: formData.name,
      hex: formData.hex,
      rgb: formData.rgb,
      cmyk,
      isCmykLocked: true,
      groupId,
    })

    if (formData.addAnother) {
      setFormData({
        name: "",
        hex: "#000000",
        rgb: { r: 0, g: 0, b: 0 },
        saveOption: formData.saveOption,
        groupId: formData.groupId,
        newGroupName: formData.newGroupName,
        addAnother: true,
      })
      setHasUnsavedChanges(false)
    } else {
      onClose()
    }
  }

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowDiscardModal(true)
    } else {
      onClose()
    }
  }

  const handleEyedropper = async () => {
    if ("EyeDropper" in window) {
      try {
        // @ts-ignore - EyeDropper is not in TypeScript types yet
        const eyeDropper = new EyeDropper()
        const result = await eyeDropper.open()
        handleHexChange(result.sRGBHex)
      } catch (e) {
        // User cancelled
      }
    }
  }

  const isEyedropperSupported = typeof window !== "undefined" && "EyeDropper" in window

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-[720px] max-h-[90vh] overflow-y-auto bg-[#1a1a1a] border-white/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">New Color</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Color Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                  setHasUnsavedChanges(true)
                }}
                placeholder="e.g., Primary Blue"
                className="bg-black/40 border-white/20"
              />
            </div>

            {/* Color Picker */}
            <div className="space-y-4">
              <Label>Color</Label>

              <div className="flex gap-4">
                {/* Color Preview */}
                <div
                  className="w-24 h-24 rounded-lg border border-white/20"
                  style={{ backgroundColor: formData.hex }}
                />

                {/* Color Inputs */}
                <div className="flex-1 space-y-3">
                  {/* HEX */}
                  <div className="flex items-center gap-2">
                    <Label className="w-12">HEX</Label>
                    <Input
                      value={formData.hex}
                      onChange={(e) => handleHexChange(e.target.value)}
                      className="bg-black/40 border-white/20"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleEyedropper}
                      disabled={!isEyedropperSupported}
                      title={isEyedropperSupported ? "Pick color from screen" : "Not supported"}
                      className="border-white/20 bg-transparent"
                    >
                      <Pipette className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* RGB */}
                  <div className="flex items-center gap-2">
                    <Label className="w-12">RGB</Label>
                    <Input
                      type="number"
                      min="0"
                      max="255"
                      value={formData.rgb.r}
                      onChange={(e) => handleRgbChange("r", e.target.value)}
                      className="bg-black/40 border-white/20"
                      placeholder="R"
                    />
                    <Input
                      type="number"
                      min="0"
                      max="255"
                      value={formData.rgb.g}
                      onChange={(e) => handleRgbChange("g", e.target.value)}
                      className="bg-black/40 border-white/20"
                      placeholder="G"
                    />
                    <Input
                      type="number"
                      min="0"
                      max="255"
                      value={formData.rgb.b}
                      onChange={(e) => handleRgbChange("b", e.target.value)}
                      className="bg-black/40 border-white/20"
                      placeholder="B"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Options */}
            <div className="space-y-4">
              <Label>Save Options</Label>
              <RadioGroup
                value={formData.saveOption}
                onValueChange={(value: any) => {
                  setFormData((prev) => ({ ...prev, saveOption: value }))
                  setHasUnsavedChanges(true)
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual" className="font-normal cursor-pointer">
                    Save individually
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="existing-group" id="existing-group" />
                  <Label htmlFor="existing-group" className="font-normal cursor-pointer">
                    Save in existing group
                  </Label>
                </div>

                {formData.saveOption === "existing-group" && (
                  <Select
                    value={formData.groupId}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, groupId: value }))
                      setHasUnsavedChanges(true)
                    }}
                  >
                    <SelectTrigger className="ml-6 bg-black/40 border-white/20">
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new-group" id="new-group" />
                  <Label htmlFor="new-group" className="font-normal cursor-pointer">
                    Save in new group
                  </Label>
                </div>

                {formData.saveOption === "new-group" && (
                  <Input
                    value={formData.newGroupName || ""}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, newGroupName: e.target.value }))
                      setHasUnsavedChanges(true)
                    }}
                    placeholder="Group name"
                    className="ml-6 bg-black/40 border-white/20"
                  />
                )}
              </RadioGroup>
            </div>

            {/* Add Another */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="addAnother"
                checked={formData.addAnother}
                onCheckedChange={(checked) => {
                  setFormData((prev) => ({ ...prev, addAnother: checked as boolean }))
                }}
              />
              <Label htmlFor="addAnother" className="font-normal cursor-pointer">
                Add another color
              </Label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button variant="outline" onClick={handleClose} className="border-white/20 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.name.trim()}
              className="bg-white text-black hover:bg-white/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Save Color
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Discard Changes Modal */}
      <Dialog open={showDiscardModal} onOpenChange={setShowDiscardModal}>
        <DialogContent className="max-w-md bg-[#1a1a1a] border-white/20">
          <DialogHeader>
            <DialogTitle>Discard changes?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            You have unsaved changes. Are you sure you want to discard them?
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowDiscardModal(false)} className="border-white/20">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDiscardModal(false)
                onClose()
              }}
            >
              Discard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
