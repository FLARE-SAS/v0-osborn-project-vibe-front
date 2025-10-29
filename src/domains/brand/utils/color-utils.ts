export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace("#", "")

  if (cleanHex.length !== 6) return null

  const r = Number.parseInt(cleanHex.substring(0, 2), 16)
  const g = Number.parseInt(cleanHex.substring(2, 4), 16)
  const b = Number.parseInt(cleanHex.substring(4, 6), 16)

  if (isNaN(r) || isNaN(g) || isNaN(b)) return null

  return { r, g, b }
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clampedR = Math.min(255, Math.max(0, Math.round(r)))
  const clampedG = Math.min(255, Math.max(0, Math.round(g)))
  const clampedB = Math.min(255, Math.max(0, Math.round(b)))

  return `#${clampedR.toString(16).padStart(2, "0")}${clampedG.toString(16).padStart(2, "0")}${clampedB.toString(16).padStart(2, "0")}`.toUpperCase()
}

export function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255

  const k = 1 - Math.max(rNorm, gNorm, bNorm)

  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 }
  }

  const c = ((1 - rNorm - k) / (1 - k)) * 100
  const m = ((1 - gNorm - k) / (1 - k)) * 100
  const y = ((1 - bNorm - k) / (1 - k)) * 100

  return {
    c: Math.round(c),
    m: Math.round(m),
    y: Math.round(y),
    k: Math.round(k * 100),
  }
}

export function clampRgbValue(value: number): number {
  return Math.min(255, Math.max(0, Math.round(value)))
}

export function isValidHex(hex: string): boolean {
  const cleanHex = hex.replace("#", "")
  return /^[0-9A-Fa-f]{6}$/.test(cleanHex)
}
