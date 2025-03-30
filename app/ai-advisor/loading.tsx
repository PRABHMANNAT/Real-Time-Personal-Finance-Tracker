import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
      <p className="text-muted-foreground">Loading AI Financial Advisor...</p>
    </div>
  )
}

