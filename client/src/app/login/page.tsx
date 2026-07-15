"use client"

import AuthForm from "../components/AuthForm"
import { useState } from "react"
import { loginUser } from "../lib/auth"
import { singinFormFields, type LoginForm } from "../config/config"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) return

    try {
      const res = await loginUser(formData)

      if (res.token.accessToken) {
        localStorage.setItem("token", res.token.accessToken)
        router.push("/dashboard")
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
