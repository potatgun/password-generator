import { ChangeEventHandler } from "react"

type Props = {
  name: string,
  onChange: ChangeEventHandler,
  checked: boolean
}

function CheckBox({ name, onChange, checked }: Props) {
  return(
    <label htmlFor={"settings__" + name}>
      <input 
        onChange={onChange} 
        checked={checked}
        type="checkbox" 
        id={"settings__" + name}
        name={name}
      />
      <p>{name}</p>
    </label>
  )
}

export default CheckBox
