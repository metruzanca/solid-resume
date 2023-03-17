export const defaultFlags = {
  logos: false,
}

export type Flags = Partial<typeof defaultFlags>

type Options = { search: string }

const featureFlags = ({ search }: Options): Flags => {
  const params = new URLSearchParams(search)
  const flags: Partial<typeof defaultFlags> = {}
  for (let entry of params.entries()) {
    const key = entry[0]
    if (key in defaultFlags) {
      const value = entry[1]
      flags[(key as keyof typeof defaultFlags)] = value === 'true'
    }
  }
  return flags
}

export default featureFlags