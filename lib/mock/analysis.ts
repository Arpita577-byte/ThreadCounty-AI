import type { Report } from '@/types/dashboard'

const FABRICS = [
  'Egyptian Cotton',
  'Belgian Linen',
  'Indigo Denim',
  'Mulberry Silk',
  'Merino Wool',
  'Organic Hemp',
  'Cashmere Blend',
  'Tencel Lyocell',
  'Pima Cotton',
  'Raw Denim',
] as const

const SUGGESTIONS = [
  'Excellent weave uniformity across the sample',
  'Consider moisture content testing before production',
  'Minor irregularity detected in weft spacing',
  'Twist direction is consistent — grade A',
  'Dye penetration appears optimal',
  'Recommend tensile strength verification',
  'Thread tension variance within acceptable range',
  'Suitable for premium garment manufacturing',
]

function hashString(input: string): number {
  let h = 0
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

function pick<T>(arr: readonly T[], seed: number, offset = 0): T {
  return arr[(seed + offset) % arr.length]
}

export function generateMockReport(
  uploadId: string,
  fileName: string,
  fileSize: number,
): Omit<Report, 'id' | 'createdAt'> {
  const seed = hashString(`${fileName}:${fileSize}`)
  const fabricType = pick(FABRICS, seed)
  const threadDensity = 120 + (seed % 780)
  const warpCount = Math.floor(threadDensity / 2) + (seed % 40)
  const weftCount = threadDensity - warpCount
  const confidenceScore = 92 + (seed % 80) / 10
  const qualityScore = 78 + (seed % 200) / 10
  const processingTimeMs = 380 + (seed % 220)
  const suggestionCount = 2 + (seed % 2)

  const suggestions = Array.from({ length: suggestionCount }, (_, i) =>
    pick(SUGGESTIONS, seed, i * 3),
  )

  return {
    uploadId,
    fabricType,
    threadDensity,
    warpCount,
    weftCount,
    confidenceScore: Math.round(confidenceScore * 10) / 10,
    qualityScore: Math.round(qualityScore * 10) / 10,
    processingTimeMs,
    suggestions: [...new Set(suggestions)],
  }
}

export async function simulateAnalysisDelay(ms = 1800): Promise<void> {
  await new Promise((r) => setTimeout(r, ms))
}
