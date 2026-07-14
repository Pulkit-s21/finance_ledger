"use client"

import { useState } from "react"
import { loginUser } from "../lib/auth"
import { singinFormFields, type LoginForm } from "../config/config"
import FormButton from "../components/FormButton"
import InputField from "../components/InputField"
import FormMessage from "../components/FormMessage"

export default function Login() {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) return

    try {
      const res = await loginUser(formData)

      if (res.ok) {
        alert(res.message)
      }
    } catch (err) {
      console.error(`Error: ${err}`)
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-white p-8 dark:border-white/[.145] dark:bg-black">
        <h1 className="mb-6 text-2xl font-semibold text-black dark:text-zinc-50">
          Sign in
        </h1>

        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
          {singinFormFields.map((field, idx) => {
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

          <FormButton text="Sign in" />

          <FormMessage
            label=" Don't have an account?"
            href="/register"
            text="Sign up"
          />
        </form>
      </div>
    </div>
  )
}
