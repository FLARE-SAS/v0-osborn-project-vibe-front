"use client"

import { useState } from "react"
import { Plus, Trash2, CheckSquare, FolderPlus, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColorCard } from "./color-card"
import { AddColorModal } from "./add-color-modal"
import { DeleteConfirmModal } from "./delete-confirm-modal"
import { CreateGroupModal } from "./create-group-modal"
import { useBrandStore } from "../stores/brand-store"
import { cn } from "@/lib/utils"

export function ColorsSection() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false)

  const colors = useBrandStore((state) => state.colors)
  const groups = useBrandStore((state) => state.groups)
  const selectedColorIds = useBrandStore((state) => state.selectedColorIds)
  const selectAllColors = useBrandStore((state) => state.selectAllColors)
  const deselectAllColors = useBrandStore((state) => state.deselectAllColors)
  const deleteColors = useBrandStore((state) => state.deleteColors)

  const hasColors = colors.length > 0
  const allSelected = hasColors && selectedColorIds.length === colors.length

  const handleSelectAll = () => {
    if (allSelected) {
      deselectAllColors()
    } else {
      selectAllColors()
    }
  }

  const handleDelete = () => {
    deleteColors(selectedColorIds)
    setIsDeleteModalOpen(false)
  }

  // Group colors by groupId
  const ungroupedColors = colors.filter((c) => !c.groupId)
  const groupedColors = groups.map((group) => ({
    group,
    colors: colors.filter((c) => c.groupId === group.id),
  }))

  return (
    <section id="colors" className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Colors</h1>

        <div className="h-[1px] bg-border" />

        {/* Toolbar */}
        <div className="flex items-center gap-3 h-[43px]">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSelectAll}
            disabled={!hasColors}
            className={cn(
              "h-full px-4 rounded-full bg-black/40 border border-white/15",
              "blur-24 hover:bg-black/60 transition-smooth",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            <CheckSquare className="w-4 h-4 mr-2" />
            {allSelected ? "Deselect All" : "Select All"}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCreateGroupModalOpen(true)}
            disabled={!hasColors}
            className={cn(
              "h-full px-4 rounded-full bg-black/40 border border-white/15",
              "blur-24 hover:bg-destructive/60 transition-smooth",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            Create New Group
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={selectedColorIds.length === 0}
            className={cn(
              "h-full px-4 rounded-full bg-black/40 border border-white/15",
              "blur-24 hover:bg-destructive/60 transition-smooth",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>

          <div className="flex-1" />

          <Button
            onClick={() => setIsAddModalOpen(true)}
            className={cn(
              "h-full px-6 rounded-full bg-white text-black",
              "hover:bg-white/90 transition-smooth font-semibold",
            )}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Color
          </Button>
        </div>
      </div>

      {/* Empty State */}
      {!hasColors && (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
            <Palette className="w-8 h-8 opacity-40" />
          </div>
          <h3 className="text-xl font-semibold">No colors yet</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Create your first color to start building your brand foundations.
          </p>
          <Button onClick={() => setIsAddModalOpen(true)} className="mt-4 rounded-full px-6">
            <Plus className="w-4 h-4 mr-2" />
            Create new color
          </Button>
        </div>
      )}

      {/* Grouped Colors */}
      {groupedColors.map(
        ({ group, colors: groupColors }) =>
          groupColors.length > 0 && (
            <div key={group.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold">{group.name}</h2>
                {group.color && (
                  <div
                    className="w-6 h-6 rounded-full border border-white/20"
                    style={{ backgroundColor: group.color }}
                  />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {groupColors.map((color, index) => (
                  <ColorCard
                    key={color.id}
                    color={color}
                    style={{
                      animation: `fadeInUp 200ms ease-out ${index * 50}ms both`,
                    }}
                  />
                ))}
              </div>
            </div>
          ),
      )}

      {/* Ungrouped Colors */}
      {ungroupedColors.length > 0 && (
        <div className="space-y-4">
          {groups.length > 0 && <h2 className="text-xl font-semibold">Ungrouped</h2>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ungroupedColors.map((color, index) => (
              <ColorCard
                key={color.id}
                color={color}
                style={{
                  animation: `fadeInUp 200ms ease-out ${index * 50}ms both`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <AddColorModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        count={selectedColorIds.length}
      />

      <CreateGroupModal isOpen={isCreateGroupModalOpen} onClose={() => setIsCreateGroupModalOpen(false)} />
    </section>
  )
}

// Add fadeInUp animation to globals.css
const style = document.createElement("style")
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
if (typeof document !== "undefined") {
  document.head.appendChild(style)
}
