type Props = {
  text: string
}

export default function FormButton({ text }: Props) {
  return (
    <button
      type="submit"
      className="mt-2 h-11 w-full rounded-full bg-foreground text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
    >
      {text}
    </button>
  )
}
