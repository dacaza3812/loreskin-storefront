"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import NativeSelect from "@modules/common/components/native-select"

type SortByProps = {
  sortBy?: SortOptions
  'data-testid'?: string
}

const SortBy = ({ sortBy = "created_at", 'data-testid': dataTestId }: SortByProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (value: SortOptions) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sortBy", value)
    params.delete("page")
    router.push(`/?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center gap-4 mb-6" data-testid={dataTestId}>
      <label
        htmlFor="sort-select"
        className="text-sm font-medium text-ui-fg-base whitespace-nowrap"
      >
        Ordenar por:
      </label>
      <NativeSelect
        value={sortBy}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e.target.value as SortOptions)}
        data-testid="sort-by-select"
      >
        <option value="created_at">Lo más reciente</option>
        <option value="price_asc">Precio: bajo a alto</option>
        <option value="price_desc">Precio: alto a bajo</option>
      </NativeSelect>
    </div>
  )
}

export default SortBy
