"use client"

import { useState } from "react"
import { createUser } from "../lib/auth"
import { useRouter } from "next/navigation"
import { registrationFormFields, type RegisterForm } from "../config/config"
import AuthForm from "../components/AuthForm"

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password) return

    try {
      const res = await createUser(formData)
      if (res.status === 201) {
        router.push("/login")

        setFormData({ name: "", email: "", password: "" })
      }
    } catch (err) {
      console.error(`Error: ${err}`)
    }
  }

  return (
    <AuthForm
      title="Create your account"
      handleSubmit={handleSubmit}
      setFormData={setFormData}
      mapFields={registrationFormFields}
      label="Already have an account? "
      btnText="Sign up"
      msgText="Sign in"
      href="/"
    />
  )
}
