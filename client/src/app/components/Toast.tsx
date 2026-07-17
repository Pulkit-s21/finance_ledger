export type ToastVariant = "success" | "error" | "warning"

export type ToastItem = {
  id: string
  message: string
  variant: ToastVariant
}

type Props = {
  toast: ToastItem
  onDismiss: (id: string) => void
}

const variantStyles: Record<ToastVariant, { border: string; icon: string; dot: string }> = {
  success: {
    border: "border-emerald-500/30",
    icon: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  error: {
    border: "border-danger/30",
    icon: "text-danger",
    dot: "bg-danger",
  },
  warning: {
    border: "border-amber-500/30",
    icon: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
}

export default function Toast({ toast, onDismiss }: Props) {
  const styles = variantStyles[toast.variant]

  return (
    <div
      role="alert"
      className={`flex w-80 items-start gap-3 rounded-xl border ${styles.border} bg-card p-4 shadow-lg`}
    >
      <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${styles.dot}`} />

      <p className="flex-1 text-sm text-foreground">{toast.message}</p>

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-muted transition-colors hover:text-foreground"
        aria-label="Dismiss"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
