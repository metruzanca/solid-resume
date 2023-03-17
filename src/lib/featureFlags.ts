export const DEFAULT_FLAGS = {
  logos: false,
}

export type Flags = Partial<typeof DEFAULT_FLAGS>

type Options = { search: string }

const featureFlags = ({ search }: Options): Flags => {
  const params = new URLSearchParams(search)
  const flags: Partial<typeof DEFAULT_FLAGS> = {}
  for (let entry of params.entries()) {
    const key = entry[0]
    if (key in DEFAULT_FLAGS) {
      const value = entry[1]
      flags[(key as keyof typeof DEFAULT_FLAGS)] = value === 'true'
    }
  }
  return flags
}

export default featureFlags