import type {
  ActivityItem,
  DashboardStats,
  Notification,
  Report,
  Upload,
} from '@/types/dashboard'

export const MOCK_STATS: DashboardStats = {
  totalUploads: 127,
  totalReports: 118,
  storageUsedMb: 842,
  storageLimitMb: 5120,
  analysesThisMonth: 34,
  avgQualityScore: 91.4,
}

export const MOCK_UPLOADS: Upload[] = [
  {
    id: 'upl_001',
    fileName: 'egyptian-cotton-weave.jpg',
    fileSize: 2_400_000,
    mimeType: 'image/jpeg',
    thumbnailUrl: '/placeholder.jpg',
    status: 'complete',
    createdAt: '2026-06-28T14:22:00.000Z',
  },
  {
    id: 'upl_002',
    fileName: 'linen-texture-closeup.png',
    fileSize: 4_100_000,
    mimeType: 'image/png',
    thumbnailUrl: '/placeholder.jpg',
    status: 'complete',
    createdAt: '2026-06-27T09:15:00.000Z',
  },
  {
    id: 'upl_003',
    fileName: 'silk-satin-sample.jpg',
    fileSize: 1_800_000,
    mimeType: 'image/jpeg',
    thumbnailUrl: '/placeholder.jpg',
    status: 'processing',
    createdAt: '2026-06-30T11:40:00.000Z',
  },
  {
    id: 'upl_004',
    fileName: 'denim-thread-analysis.png',
    fileSize: 3_200_000,
    mimeType: 'image/png',
    thumbnailUrl: '/placeholder.jpg',
    status: 'complete',
    createdAt: '2026-06-25T16:08:00.000Z',
  },
]

export const MOCK_REPORTS: Report[] = [
  {
    id: 'rpt_001',
    uploadId: 'upl_001',
    fabricType: 'Egyptian Cotton',
    threadDensity: 847,
    warpCount: 432,
    weftCount: 415,
    confidenceScore: 98.7,
    qualityScore: 94.2,
    processingTimeMs: 480,
    suggestions: ['Excellent weave uniformity', 'Consider moisture testing'],
    createdAt: '2026-06-28T14:22:01.000Z',
  },
  {
    id: 'rpt_002',
    uploadId: 'upl_002',
    fabricType: 'Belgian Linen',
    threadDensity: 312,
    warpCount: 158,
    weftCount: 154,
    confidenceScore: 96.1,
    qualityScore: 88.5,
    processingTimeMs: 520,
    suggestions: ['Minor irregularity in weft spacing'],
    createdAt: '2026-06-27T09:15:02.000Z',
  },
  {
    id: 'rpt_003',
    uploadId: 'upl_004',
    fabricType: 'Indigo Denim',
    threadDensity: 156,
    warpCount: 78,
    weftCount: 78,
    confidenceScore: 97.3,
    qualityScore: 91.8,
    processingTimeMs: 445,
    suggestions: ['Twist direction consistent', 'Dye penetration optimal'],
    createdAt: '2026-06-25T16:08:01.000Z',
  },
]

export const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: 'act_001',
    type: 'report',
    title: 'Analysis complete',
    description: 'Egyptian Cotton — 94.2 quality score',
    createdAt: '2026-06-28T14:22:01.000Z',
  },
  {
    id: 'act_002',
    type: 'upload',
    title: 'Fabric uploaded',
    description: 'linen-texture-closeup.png',
    createdAt: '2026-06-27T09:15:00.000Z',
  },
  {
    id: 'act_003',
    type: 'export',
    title: 'PDF exported',
    description: 'Belgian Linen report',
    createdAt: '2026-06-27T10:30:00.000Z',
  },
  {
    id: 'act_004',
    type: 'login',
    title: 'Signed in',
    description: 'New session from Chrome',
    createdAt: '2026-06-26T08:00:00.000Z',
  },
]

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'ntf_001',
    title: 'Analysis ready',
    message: 'Your silk-satin sample analysis is processing.',
    read: false,
    createdAt: '2026-06-30T11:40:05.000Z',
  },
  {
    id: 'ntf_002',
    title: 'Storage at 16%',
    message: '842 MB of 5 GB used. You have plenty of room.',
    read: true,
    createdAt: '2026-06-28T00:00:00.000Z',
  },
]
