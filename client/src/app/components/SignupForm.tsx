import InputField from "./InputField"
import {
  LoginForm,
  registrationFormFields,
  type RegisterForm,
} from "../config/config"
import FormButton from "./FormButton"
import FormMessage from "./FormMessage"

type RegisterFormProps = {
  handleSubmit: (e: React.FormEvent) => Promise<void>
  setFormData: React.Dispatch<React.SetStateAction<RegisterForm | LoginForm>>
}

export default function SignupForm({
  handleSubmit,
  setFormData,
}: RegisterFormProps) {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
      {registrationFormFields.map((field, idx) => {
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

      <a
        href="#"
        className="text-sm font-medium text-zinc-950 dark:text-zinc-50"
      >
        Forgot password?
      </a>

      <FormButton text="Create an account" />

      <FormMessage label="Already a User?" href="/" text="Sign in" />
    </form>
  )
}
