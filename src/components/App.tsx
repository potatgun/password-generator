import { ChangeEvent, useCallback, useState } from 'react'
import '../styles/App.scss'
import CheckBox from './CheckBox'
import { UserInput } from "../types"

function App() {
  const [userInput, setUserInput] = useState<UserInput>({
    useLowercase: true,
    useUppercase: false,
    useNumbers: false,
    useSymbols: false,
    passwordLength: 10
  })

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const t = e.currentTarget as HTMLInputElement 
    let fieldName: string = ""
    
    switch (t.name) {
      case "lowercase": fieldName = "useLowercase"; break
      case "uppercase": fieldName = "useUppercase"; break
      case "numbers": fieldName = "useNumbers"; break
      case "symbols": fieldName = "useSymbols"; break
    }

    console.log(fieldName)

    setUserInput((prev: UserInput) => {
      return {
        ...prev,
        [fieldName]: t.checked
      }
    })
  }

  return (
    <div className="App">
      <div className="password-output">
        <label htmlFor="password-output__input">
          <input type="text" className="password-output__input"/>
        </label>
      </div>

      <hr />

      <div className="settings">
        <div className="settings__checkboxes"> 
          <CheckBox onChange={onCheckboxChange} checked={userInput.useLowercase} name="lowercase" />
          <CheckBox onChange={onCheckboxChange} checked={userInput.useUppercase} name="uppercase" />
          <CheckBox onChange={onCheckboxChange} checked={userInput.useNumbers} name="numbers" />
          <CheckBox onChange={onCheckboxChange} checked={userInput.useSymbols} name="symbols" />
        </div>

        <label htmlFor="settings__length" className="settings__length-label">
          <p>length</p>
          <input type="range" id="settings__length"/>
        </label>
      </div>
    </div>
  )
}

export default App
