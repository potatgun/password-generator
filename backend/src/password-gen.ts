import { RandomNumbers, UserInput } from "./types"
import { Request, Response } from "express"
import { Rng } from "./rng";



// got the thing from here
// https://medium.com/asecuritysite-when-bob-met-alice/password-entropy-826b3be47261
function strengthChecker(length: number, dictSize: number): number {
                                // log10(2) is about 0.3
                                // and 1/0.3 is 3 
  return length * Math.log10(dictSize) * 3
}

function pushIfSelected(input: string[], toPush: string, isSelected: boolean) {
  if (isSelected) {
    input.push(toPush) 
  }
}

function createDict(userInput: UserInput): string {
  const characterDictionary = {
    uppercaseAbs: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    symbols: "",
    numbers: "1234567890",
  }

  let dictArray = ["abcdefghijklmnopqrstuvwxyz"]

  // make set of avaliable characters
  pushIfSelected(dictArray, characterDictionary.uppercaseAbs, userInput.useUppercase)
  pushIfSelected(dictArray, characterDictionary.numbers, userInput.useNumbers)
  pushIfSelected(dictArray, characterDictionary.symbols, userInput.useSymbols)

  return dictArray.join("")

}

function createPassword(userInput: UserInput, dict: string): string {
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

export function apiPassword(req: Request<any>, res: Response<any>) {
  // TODO: validate user input
  const userInput: UserInput = req.body 

  const dict = createDict(userInput)
  const password = createPassword(userInput, dict)
  const strength = strengthChecker(userInput.passwordLength, dict.length)

  res.status(200).json({
    password: password,
    strength: strength
  })
}
