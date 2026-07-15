import Spinner from "./Spinner"

type Props = {
  text: string
  loading?: boolean
}

export default function FormButton({ text, loading = false }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading && <Spinner />}
      {text}
    </button>
  )
}
