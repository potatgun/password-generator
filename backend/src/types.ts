export type RandomNumbers = {
  seed: number,
  xorShift: () => number
  range: (min: number, max: number) => number
}

export type UserInput = {
  useUppercase: boolean,
  useSymbols: boolean,
  useNumbers: boolean,
  passwordLength: number
}
