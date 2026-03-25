import { HttpTypes } from "@medusajs/types"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"

type HomeProductGridProps = {
  countryCode: string
  initialProducts: HttpTypes.StoreProduct[]
  initialCount: number
}

export default async function HomeProductGrid({
  countryCode,
  initialProducts,
  initialCount,
}: HomeProductGridProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return (
      <div className="text-center py-12">
        <p className="text-ui-fg-subtle text-lg">
          No se encontró la región.
        </p>
      </div>
    )
  }

  if (initialProducts.length === 0) {
    return (
      <div className="text-center py-12 content-container">
        <p className="text-ui-fg-subtle text-lg">
          No se encontraron productos.
        </p>
      </div>
    )
  }

  return (
    <div className="content-container">
      <p className="text-sm text-ui-fg-subtle mb-4">
        Mostrando {initialProducts.length} de {initialCount} productos
      </p>
      <ul
        className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {initialProducts.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} />
          </li>
        ))}
      </ul>
    </div>
  )
}
