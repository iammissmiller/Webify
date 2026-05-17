"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)

      setCopied(true)

      toast("Link copied!", {
        description: "Share URL has been copied to clipboard.",
      })

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error("Clipboard copy failed:", err)

      toast.error("Share failed", {
        description: "Could not copy share URL to clipboard.",
      })
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 mr-2" />
          Share
        </>
      )}
    </Button>
  )
}