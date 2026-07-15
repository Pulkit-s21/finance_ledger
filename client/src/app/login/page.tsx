"use client"

import { useState } from "react"
import { loginUser } from "../lib/auth"
import { singinFormFields, type LoginForm } from "../config/config"
import AuthForm from "../components/AuthForm"

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
    <AuthForm
      title={"Sign in"}
      mapFields={singinFormFields}
      handleSubmit={handleSubmit}
      setFormData={setFormData}
      label="Don't have an account? "
      btnText="Sign in"
      msgText="Sign up"
      href="/register"
    />
  )
}
