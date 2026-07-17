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

export const categoryStyles: {
  [K in Category]: { badge: string; amount: string; dot: string; sign: string }
} = {
  INCOME: {
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    amount: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    sign: "+",
  },
  EXPENSE: {
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    amount: "text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500",
    sign: "-",
  },
  INVESTMENT: {
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    amount: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
    sign: "",
  },
}

export type Record = {
  id: string
  amount: number
  category: Category
  date: Date
  description: string | null
  deleted: true | false
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

export type SortOption =
  | "date-desc"
  | "date-asc"
  | "amount-desc"
  | "amount-asc"

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "date-desc", label: "Date (Newest first)" },
  { value: "date-asc", label: "Date (Oldest first)" },
  { value: "amount-desc", label: "Amount (High to Low)" },
  { value: "amount-asc", label: "Amount (Low to High)" },
]
