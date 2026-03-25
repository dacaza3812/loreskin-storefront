import { Metadata } from "next"

import HomeTemplate from "@modules/home/templates"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"

export const metadata: Metadata = {
  title: "tienda Lore Skin",
  description:
    "El sitio ideal para tus productos de marca",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products, count },
  } = await listProducts({
    countryCode,
    queryParams: {
      limit: 12,
    },
  })

  return (
    <HomeTemplate
      initialProducts={products}
      initialCount={count}
      countryCode={countryCode}
    />
  )
}
