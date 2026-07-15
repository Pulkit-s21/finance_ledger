import { RegisterForm } from "../config/config"

type InputFieldProps = {
  label: string
  id: string
  type: string
  setFormData: React.Dispatch<React.SetStateAction<RegisterForm>>
}

export default function InputField({
  label,
  id,
  type,
  setFormData,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={label}
        className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, [id]: e.target.value }))
        }
      />
    </div>
  )
}
