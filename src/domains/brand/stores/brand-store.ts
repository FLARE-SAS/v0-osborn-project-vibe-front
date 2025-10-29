import { create } from "zustand"
import type { BrandState, BrandColor, ColorGroup, UndoAction } from "../types"

interface BrandStore extends BrandState {
  addColor: (color: Omit<BrandColor, "id" | "createdAt" | "updatedAt">) => void
  updateColor: (id: string, updates: Partial<BrandColor>) => void
  deleteColors: (ids: string[]) => void
  toggleSelectColor: (id: string) => void
  selectAllColors: () => void
  deselectAllColors: () => void
  addGroup: (group: Omit<ColorGroup, "id" | "createdAt">) => void
  deleteGroup: (id: string) => void
  moveColorsToGroup: (colorIds: string[], groupId?: string) => void
  setActiveSection: (section: string) => void
  setSaving: (isSaving: boolean) => void
  setLastSaved: (date: Date) => void
  undo: () => void
  addUndoAction: (action: UndoAction) => void
}

export const useBrandStore = create<BrandStore>((set, get) => ({
  colors: [],
  groups: [],
  selectedColorIds: [],
  activeSection: "colors",
  isSaving: false,
  lastSaved: null,
  undoStack: [],

  addColor: (colorData) => {
    const newColor: BrandColor = {
      ...colorData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    set((state) => ({
      colors: [newColor, ...state.colors],
      undoStack: [...state.undoStack.slice(-4), { type: "create", colorIds: [newColor.id] }],
    }))
  },

  updateColor: (id, updates) => {
    const previousState = get().colors.find((c) => c.id === id)
    if (!previousState) return

    set((state) => ({
      colors: state.colors.map((color) => (color.id === id ? { ...color, ...updates, updatedAt: new Date() } : color)),
      undoStack: [...state.undoStack.slice(-4), { type: "edit", colorId: id, previousState }],
    }))
  },

  deleteColors: (ids) => {
    const deletedColors = get().colors.filter((c) => ids.includes(c.id))

    set((state) => ({
      colors: state.colors.filter((color) => !ids.includes(color.id)),
      selectedColorIds: state.selectedColorIds.filter((id) => !ids.includes(id)),
      undoStack: [...state.undoStack.slice(-4), { type: "delete", colors: deletedColors }],
    }))
  },

  toggleSelectColor: (id) => {
    set((state) => ({
      selectedColorIds: state.selectedColorIds.includes(id)
        ? state.selectedColorIds.filter((colorId) => colorId !== id)
        : [...state.selectedColorIds, id],
    }))
  },

  selectAllColors: () => {
    set((state) => ({
      selectedColorIds: state.colors.map((c) => c.id),
    }))
  },

  deselectAllColors: () => {
    set({ selectedColorIds: [] })
  },

  addGroup: (groupData) => {
    const newGroup: ColorGroup = {
      ...groupData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }

    set((state) => ({
      groups: [newGroup, ...state.groups],
    }))
  },

  deleteGroup: (id) => {
    set((state) => ({
      groups: state.groups.filter((group) => group.id !== id),
      colors: state.colors.map((color) => (color.groupId === id ? { ...color, groupId: undefined } : color)),
    }))
  },

  moveColorsToGroup: (colorIds, groupId) => {
    const previousGroupId = get().colors.find((c) => colorIds.includes(c.id))?.groupId

    set((state) => ({
      colors: state.colors.map((color) =>
        colorIds.includes(color.id) ? { ...color, groupId, updatedAt: new Date() } : color,
      ),
      undoStack: [
        ...state.undoStack.slice(-4),
        {
          type: "move",
          colorIds,
          previousGroupId,
          newGroupId: groupId,
        },
      ],
    }))
  },

  setActiveSection: (section) => {
    set({ activeSection: section })
  },

  setSaving: (isSaving) => {
    set({ isSaving })
  },

  setLastSaved: (date) => {
    set({ lastSaved: date })
  },

  undo: () => {
    const { undoStack } = get()
    if (undoStack.length === 0) return

    const lastAction = undoStack[undoStack.length - 1]

    // Implement undo logic based on action type
    // This is a simplified version
    set((state) => ({
      undoStack: state.undoStack.slice(0, -1),
    }))
  },

  addUndoAction: (action) => {
    set((state) => ({
      undoStack: [...state.undoStack.slice(-4), action],
    }))
  },
}))
