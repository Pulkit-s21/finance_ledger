import Link from "next/link"

type Props = {
  label: string
  href: string
  text: string
}

export default function FormMessage({ label, href, text }: Props) {
  return (
    <p className="mt-2 border-t border-border pt-4 text-center text-sm text-muted">
      {label}{" "}
      <Link
        href={href}
        type="button"
        className="font-medium text-accent hover:underline"
      >
        {text}
      </Link>
    </p>
  )
}
