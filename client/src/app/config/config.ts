export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name?: string
  email: string
  password: string
}

export const registrationFormFields = [
  {
    label: "Name",
    id: "name",
    type: "text",
  },
  {
    label: "Email",
    id: "email",
    type: "text",
  },
  {
    label: "Password",
    id: "password",
    type: "password",
  },
  {
    label: "ConfirmPassword",
    id: "confirmPassword",
    type: "password",
  },
]

export const singinFormFields = [
  {
    label: "Email",
    id: "email",
    type: "email",
  },
  {
    label: "Password",
    id: "password",
    type: "password",
  },
]

export type Category = "INCOME" | "EXPENSE" | "INVESTMENT"

export const categories: Category[] = ["INCOME", "EXPENSE", "INVESTMENT"]

export type Record = {
  id: string
  amount: number
  category: Category
  date: Date
  description: string | null
}
