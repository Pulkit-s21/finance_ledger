import { RegisterForm, type registrationFormFields } from "../config/config"
import FormButton from "./FormButton"
import FormMessage from "./FormMessage"
import InputField from "./InputField"

type AuthFormFields = {
  title: string
  btnText: string
  msgText: string
  label: string
  href: string
  mapFields: typeof registrationFormFields
  handleSubmit: (e: React.FormEvent) => Promise<void>
  setFormData: React.Dispatch<React.SetStateAction<RegisterForm>>
}

export default function AuthForm({
  title,
  btnText,
  msgText,
  label,
  href,
  mapFields,
  handleSubmit,
  setFormData,
}: AuthFormFields) {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="w-full max-w-sm rounded-xl border border-black/8 bg-white p-8 dark:border-white/[.145] dark:bg-black">
        <h1 className="mb-6 text-2xl font-semibold text-black dark:text-zinc-50">
          {title}
        </h1>

        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
          {mapFields.map((field, idx) => {
            return (
              <InputField
                key={idx}
                label={field.label}
                id={field.id}
                type={field.type}
                setFormData={setFormData}
              />
            )
          })}

          {title !== "Create your account" && (
            <a
              href="#"
              className="text-sm font-medium text-zinc-950 dark:text-zinc-50"
            >
              Forgot password?
            </a>
          )}

          <FormButton text={btnText} />

          <FormMessage label={label} href={href} text={msgText} />
        </form>
      </div>
    </div>
  )
}
