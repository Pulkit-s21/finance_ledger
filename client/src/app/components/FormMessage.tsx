import Link from "next/link"

type Props = {
  label: string
  href: string
  text: string
}

export default function FormMessage({ label, href, text }: Props) {
  return (
    <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
      {label}{" "}
      <Link
        href={href}
        type="button"
        className="font-medium text-zinc-950 dark:text-zinc-50"
      >
        {text}
      </Link>
    </p>
  )
}
