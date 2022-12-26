export function Rng() {
  let seed = Date.now()

  const xorShift = (): number => {
    seed ^= seed << 13
    seed ^= seed >> 16
    seed ^= seed << 12

    if (seed < 0) {
      seed = -seed
    }
    return seed 
  }

  const range = (min: number, max: number): number => {
    xorShift()
    // TODO: test this, i'm not sure how this would work on 0-1 range 
    return (seed % (max - min)) + min
  }

  return {
    seed: seed,
    xorShift: xorShift,
    range: range,
  }
}
