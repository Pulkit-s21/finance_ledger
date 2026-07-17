import type { Category } from "../config/config"

type Props = {
  category: Category | "BALANCE"
  className?: string
}

export default function CategoryIcon({ category, className = "h-4 w-4" }: Props) {
  const shared = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  }

  switch (category) {
    case "INCOME":
      return (
        <svg {...shared}>
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      )
    case "EXPENSE":
      return (
        <svg {...shared}>
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      )
    case "INVESTMENT":
      return (
        <svg {...shared}>
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      )
    case "BALANCE":
    default:
      return (
        <svg {...shared}>
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
      )
  }
}
