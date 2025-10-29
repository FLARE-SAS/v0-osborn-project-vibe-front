"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  count: number
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, count }: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#1a1a1a] border-white/20 blur-24">
        <DialogHeader>
          <DialogTitle>Delete colors?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          You are about to delete {count} {count === 1 ? "color" : "colors"}. This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="border-white/20 bg-transparent">
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
