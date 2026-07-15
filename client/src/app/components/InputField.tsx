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
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="rounded-md border border-black/8 bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-400 dark:border-white/[.145] dark:text-zinc-50"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, [id]: e.target.value }))
        }
      />
    </div>
  )
}
