"use client"

import { useState } from "react"
import { createUser } from "../lib/auth"
import { useRouter } from "next/navigation"
import type { RegisterForm } from "../config/config"
import SignupForm from "../components/SignupForm"

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
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-white p-8 dark:border-white/[.145] dark:bg-black">
        <h1 className="mb-6 text-2xl font-semibold text-black dark:text-zinc-50">
          Create your account
        </h1>

        <SignupForm handleSubmit={handleSubmit} setFormData={setFormData} />
      </div>
    </div>
  )
}
