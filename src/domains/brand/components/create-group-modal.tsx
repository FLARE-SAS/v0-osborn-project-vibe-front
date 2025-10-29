"use client"

import { useState } from "react"
import { FolderPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useBrandStore } from "../stores/brand-store"

interface CreateGroupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState("")
  const [groupColor, setGroupColor] = useState("#000000")
  const addGroup = useBrandStore((state) => state.addGroup)

  const handleSave = () => {
    if (!groupName.trim()) return

    addGroup({
      name: groupName,
      color: groupColor,
    })

    setGroupName("")
    setGroupColor("#000000")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#1a1a1a] border-white/20">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="groupName">Group Name *</Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Primary Colors"
              className="bg-black/40 border-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="groupColor">Group Color (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="groupColor"
                type="color"
                value={groupColor}
                onChange={(e) => setGroupColor(e.target.value)}
                className="w-20 h-10 bg-black/40 border-white/20"
              />
              <Input
                value={groupColor}
                onChange={(e) => setGroupColor(e.target.value)}
                className="flex-1 bg-black/40 border-white/20"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <Button variant="outline" onClick={onClose} className="border-white/20 bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!groupName.trim()} className="bg-white text-black hover:bg-white/90">
            <FolderPlus className="w-4 h-4 mr-2" />
            Create Group
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
