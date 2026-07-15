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
  loading?: boolean
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
  loading = false,
}: AuthFormFields) {
  return (
    <div className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_top,var(--color-accent),transparent_60%)]/8 bg-background px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-lg font-semibold text-accent-foreground shadow-sm">
            L
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
            <p className="mt-1 text-sm text-muted">
              Track your income and expenses with ease
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl shadow-black/3">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-4"
          >
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
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm font-medium text-accent hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            )}

            <FormButton text={btnText} loading={loading} />

            <FormMessage label={label} href={href} text={msgText} />
          </form>
        </div>
      </div>
    </div>
  )
}
