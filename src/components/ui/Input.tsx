import type { InputHTMLAttributes } from 'react'
import { Icon, type IconName } from '../Icon'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: IconName
}

export function Input({ icon, ...rest }: Props) {
  return (
    <label className="input">
      {icon && <Icon name={icon} size={17} strokeWidth={2} />}
      <input {...rest} />
    </label>
  )
}
