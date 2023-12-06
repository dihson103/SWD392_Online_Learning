import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  rules?: RegisterOptions
  className?: string
  label: string
  labelClass: string
  inputClass: string
  isReadOnly?: boolean
}

export default function Input({
  type,
  errorMessage,
  name,
  placeholder,
  register,
  className,
  rules,
  label,
  labelClass,
  inputClass,
  isReadOnly = false
}: Props) {
  return (
    <div className={className} data-te-input-wrapper-init>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        {...register(name, rules)}
        className={inputClass}
        readOnly={isReadOnly}
        placeholder={placeholder}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
