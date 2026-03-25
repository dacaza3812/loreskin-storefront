"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@medusajs/ui"
import { MapPin } from "@medusajs/icons"

type SearchBarProps = {
  initialQuery?: string
}

export default function SearchBar({ initialQuery = "" }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (query) {
        params.set("q", query)
      } else {
        params.delete("q")
      }

      router.push(`/?${params.toString()}`, { scroll: false })
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, router, searchParams])

  return (
    <div className="relative w-full max-w-md mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MapPin />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="w-full pl-10 pr-4 py-2 border border-ui-border-base rounded-md bg-ui-bg-alt text-ui-fg-base placeholder:text-ui-fg-subtle focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-ui-focus"
      />
    </div>
  )
}
