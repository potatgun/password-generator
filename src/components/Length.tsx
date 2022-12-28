import { ChangeEvent } from "react"

import "../styles/LengthSelector.scss"

type Props = {
  handleLengthChange: (e: ChangeEvent<HTMLInputElement>) => void,
  passwordLength: number
}

function LengthSelector({ handleLengthChange, passwordLength }: Props) {
  return(
    <label htmlFor="settings__length" className="settings__length-label">
      <h4 id="settings__length">length</h4>

      <div> 
        <input 
          onChange={handleLengthChange} 
          type="range" 
          id="settings__length"
          value={passwordLength}
          min={4}
          max={64}
        />
        <h4 className="settings__length-textbox" >{passwordLength}</h4>
      </div>
    </label>
  )
}

export default LengthSelector
