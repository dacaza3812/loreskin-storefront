import { HttpTypes } from "@medusajs/types"
import HomeProductGrid from "@modules/home/components/home-product-grid"

export default function HomeTemplate({
  initialProducts,
  initialCount,
  countryCode,
}: {
  initialProducts: HttpTypes.StoreProduct[]
  initialCount: number
  countryCode: string
}) {
  return (
    <div className="py-12">
      <ul className="flex flex-col gap-x-6">
        <HomeProductGrid
          countryCode={countryCode}
          initialProducts={initialProducts}
          initialCount={initialCount}
        />
      </ul>
    </div>
  )
}
