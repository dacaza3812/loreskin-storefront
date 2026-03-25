"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { Select } from "@medusajs/ui"

type CategoryFilterProps = {
  categories: HttpTypes.StoreProductCategory[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || ""

  const handleCategoryChange = (categoryHandle: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (categoryHandle) {
      params.set("category", categoryHandle)
    } else {
      params.delete("category")
    }
    
    params.delete("page")

    router.push(`/?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center gap-4 mb-6">
      <label
        htmlFor="category-select"
        className="text-sm font-medium text-ui-fg-base whitespace-nowrap"
      >
        Categoría:
      </label>
      <select
        id="category-select"
        value={currentCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="input-equivalent bg-ui-bg-alt border border-ui-border-base rounded-md px-3 py-2 min-w-[200px] cursor-pointer hover:border-ui-border-hover focus:outline-none focus:ring-2 focus:ring-ui-focus"
      >
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category.id} value={category.handle}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}
