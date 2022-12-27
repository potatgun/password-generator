export type RandomNumbers = {
  seed: number,
  xorShift: () => number
  range: (min: number, max: number) => number
}

export type UserInput = {
  useLowercase: boolean,
  useUppercase: boolean,
  useSymbols: boolean,
  useNumbers: boolean,
  passwordLength: number
}

export type Password = {
  password: string,
  strength: number
}
