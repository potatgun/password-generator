export function Rng(length: number) {
  let cryptos = new Uint32Array(10)

  crypto.getRandomValues(cryptos) 

  let index = 0 

  const nullArray = (array: Uint32Array) => {
    for (let ii = 0; ii < array.length; ii++) {
      array[ii] = 0
    }
  }

  const range = (min: number, max: number): number => {
    const result = (cryptos[index] % (max - min)) + min
    index += 1

    if (index === length) {
      index = 0 
      crypto.getRandomValues(cryptos)
    }

    return result
  }

  return {
    range
  }
}
