export type RandomNumbers = {
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
