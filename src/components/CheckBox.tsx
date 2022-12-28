import { ChangeEventHandler, useEffect } from "react"

import "../styles/CheckBox.scss"

type Props = {
  name: string,
  onChange: ChangeEventHandler,
  checked: boolean
}

function CheckBox({ name, onChange, checked }: Props) {
  return(
    <label htmlFor={"settings__" + name} className="settings__checkbox-label">
      <input 
        onChange={onChange} 
        checked={checked}
        type="checkbox" 
        id={"settings__" + name}
        name={name}
      />
      <h4>{name}</h4>
    </label>
  )
}

export default CheckBox
