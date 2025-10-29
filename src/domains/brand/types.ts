export interface BrandColor {
  id: string
  name: string
  hex: string
  rgb: { r: number; g: number; b: number }
  cmyk: { c: number; m: number; y: number; k: number }
  isCmykLocked: boolean
  groupId?: string
  createdAt: Date
  updatedAt: Date
}

export interface ColorGroup {
  id: string
  name: string
  color?: string
  createdAt: Date
}

export interface BrandState {
  colors: BrandColor[]
  groups: ColorGroup[]
  selectedColorIds: string[]
  activeSection: string
  isSaving: boolean
  lastSaved: Date | null
  undoStack: UndoAction[]
}

export type UndoAction =
  | { type: "create"; colorIds: string[] }
  | { type: "edit"; colorId: string; previousState: BrandColor }
  | { type: "delete"; colors: BrandColor[] }
  | { type: "move"; colorIds: string[]; previousGroupId?: string; newGroupId?: string }
  | { type: "rename"; colorId: string; previousName: string }

export interface ColorFormData {
  name: string
  hex: string
  rgb: { r: number; g: number; b: number }
  saveOption: "individual" | "existing-group" | "new-group"
  groupId?: string
  newGroupName?: string
  addAnother?: boolean
}
