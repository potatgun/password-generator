import { RandomNumbers, UserInput } from "./types"
import { Rng } from "./rng";



function strengthChecker(length: number, dictSize: number): number {
  // formula is from here 
  // https://en.wikipedia.org/wiki/Password_strength#Random_passwords
  return length * Math.log2(dictSize)
}

function pushIfSelected(input: string[], toPush: string, isSelected: boolean) {
  if (isSelected) {
    input.push(toPush) 
  }
}

function createDict(userInput: UserInput): string {
  const characterDictionary = {
    lowercaseAbs: "abcdefghijklmnopqrstuvwxyz",
    uppercaseAbs: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    symbols: "@#$%^&*-_+=[]{}|:,?/`~();!]|.?",
    numbers: "1234567890",
  }

  let dictArray: string[] = []

  // make a set of avaliable characters
  pushIfSelected(dictArray, characterDictionary.lowercaseAbs, userInput.useLowercase)
  pushIfSelected(dictArray, characterDictionary.uppercaseAbs, userInput.useUppercase)
  pushIfSelected(dictArray, characterDictionary.numbers, userInput.useNumbers)
  pushIfSelected(dictArray, characterDictionary.symbols, userInput.useSymbols)

  return dictArray.join("")
}

// how to name this one?
function createPasswordInner(userInput: UserInput, dict: string): string {
  const rng: RandomNumbers = Rng()
  let password = ""

  for (let ii = 0; ii < userInput.passwordLength; ii++) {
    // get random index into set of avaliable characters
    const randomNumber = rng.range(0, dict.length) 
    const randomChar = dict.charAt(randomNumber) 
     
    // append selected character to password
    password = password.concat(randomChar)
  }

  return password
}

// how to name this one?
export function createPassword(userInput: UserInput): { password: string, strength: number } {
  const dict = createDict(userInput)
  const password = createPasswordInner(userInput, dict)
  const strength = strengthChecker(userInput.passwordLength, dict.length)

  return {
    password: password,
    strength: strength
  }
}
