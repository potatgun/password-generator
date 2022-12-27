type Props = {
  value: number
}

function StrengthMeter({ value }: Props) {
  // i really don't know how to do this in a nicer way
  let strengthColor = value > 30 ? "green" : "blue"
  strengthColor = value > 50 ? "yellow" : strengthColor
  strengthColor = value > 60 ? "orange" : strengthColor
  strengthColor = value > 80 ? "red" : strengthColor
  strengthColor = value > 100 ? "dark-red" : strengthColor
  strengthColor = value > 120 ? "black" : strengthColor

  return( 
    <div className={ "StrengthMeter" + strengthColor }> 
    </div>
  )
}

export default StrengthMeter
