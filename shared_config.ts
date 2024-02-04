import path from 'path'
import { fileURLToPath } from 'url'

export const optimizeDeps = {
  include: [
    'gun',
    'gun/gun',
    'gun/sea',
    'gun/sea.js',
    'gun/lib/then',
    'gun/lib/webrtc',
    'gun/lib/radix',
    'gun/lib/radisk',
    'gun/lib/store',
    'gun/lib/rindexed',
  ],
}
export const resolve = {
  alias: [
    {
      find: '$app',
      replacement: fileURLToPath(new URL('./src/app', import.meta.url)),
    },
  ],
}

export const moduleExclude = (match: string) => {
  const m = (id: string) => id.indexOf(match) > -1
  return {
    name: `exclude-${match}`,
    resolveId(id: any) {
      if (m(id)) return id
    },
    load(id: any) {
      if (m(id)) return `export default {}`
    },
  }
}
