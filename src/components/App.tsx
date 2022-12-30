import { MouseEvent, ChangeEvent, useCallback, useState, useRef, SyntheticEvent, useEffect, memo } from 'react'
import '../styles/App.scss'
import CheckBox from './CheckBox'
import { Password, UserInput } from "../types"
import { createPassword } from '../password-gen'
import RefreshIcon from '../assets/RefreshIcon'
import StrengthMeter from './StrengthMeter'
import LengthSelector from './Length'

const initUserInput = {
    useLowercase: true,
    useUppercase: false,
    useNumbers: false,
    useSymbols: false,
    passwordLength: 14
}
const initPasword = createPassword(initUserInput)

function App() {
  const userInput = useRef<UserInput>(initUserInput)

  const [password, setPassword] = useState<Password>({
    password: initPasword.password,
    strength: initPasword.strength
  })


  const handleManualPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const t = e.currentTarget as HTMLInputElement
    setPassword((prev: Password) => {
      return {
        ...prev,
        password: t.value
      }
    })
  }

  let handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const t = e.currentTarget as HTMLInputElement 
    let fieldName: string = ""
    
    switch (t.name) {
      case "lowercase": fieldName = "useLowercase"; break
      case "uppercase": fieldName = "useUppercase"; break
      case "numbers": fieldName = "useNumbers"; break
      case "symbols": fieldName = "useSymbols"; break
    }

    
    userInput.current = {
      ...userInput.current,
      [fieldName]: t.checked
    }
  }

  let handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const t = e.currentTarget as HTMLInputElement 
    let value = Number(t.value)
    if (isNaN(value)) {
      return
    }
    value = value > 64 ? 64 : value
    value = value < 4 ? 4 : value

    userInput.current = {
      ...userInput.current,
      passwordLength: value
    }
  }

  const updatePasword = <Type extends SyntheticEvent>(f: (e: Type) => void) => {
    return (e: Type) => {
      f(e)
      // this executes faster then the state update
      const newPassword = createPassword(userInput.current) 
      setPassword(newPassword)
    }
  }

  handleCheckBoxChange = updatePasword(handleCheckBoxChange)
  handleLengthChange = updatePasword(handleLengthChange)

  return (
    <div className="App">
      <label htmlFor="password-output__input" className="password-output__input" >
        <input onChange={handleManualPasswordChange} value={password.password} type="text" />
      </label>
      <label className="password-output__refresh-btn">
        <button onClick={updatePasword((e: MouseEvent<HTMLButtonElement>) => {})}><RefreshIcon /></button>
      </label>

      <div className="settings__checkboxes"> 
        <CheckBox onChange={handleCheckBoxChange} checked={userInput.current.useLowercase} name="lowercase" />
        <CheckBox onChange={handleCheckBoxChange} checked={userInput.current.useUppercase} name="uppercase" />
        <CheckBox onChange={handleCheckBoxChange} checked={userInput.current.useNumbers} name="numbers" />
        <CheckBox onChange={handleCheckBoxChange} checked={userInput.current.useSymbols} name="symbols" />
      </div>

      <LengthSelector handleLengthChange={handleLengthChange} passwordLength={userInput.current.passwordLength}/>

      <StrengthMeter value={password.strength}/>
    </div>
  )
}

export default memo(App)
