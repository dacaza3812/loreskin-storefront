import { NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const tags = searchParams.get("tags") as string
  const path = searchParams.get("path")

  if (!tags && !path) {
    return NextResponse.json({ error: "No tags or path provided" }, { status: 400 })
  }

  if (path) {
    revalidatePath(path)
    return NextResponse.json({ 
      message: "Revalidated", 
      path,
      timestamp: new Date().toISOString()
    }, { status: 200 })
  }

  const tagsArray = tags.split(",")

  revalidateTag("products")
  revalidateTag("product")
  revalidateTag("product-list")
  revalidateTag("products-us")
  revalidateTag("product-us")

  await Promise.all(
    tagsArray.map(async (tag) => {
      if (tag.startsWith("product")) {
        revalidatePath("/[countryCode]", "page")
        revalidatePath("/[countryCode]/(main)", "page")
        revalidatePath("/[countryCode]/(main)/store", "page")
        revalidatePath("/[countryCode]/(main)/products/[handle]", "page")
        revalidatePath("/[countryCode]/(main)/collections/[handle]", "page")
        revalidatePath("/[countryCode]/(main)/categories/[...category]", "page")
        
        revalidateTag("products")
        revalidateTag("product")
        revalidateTag("product-list")
      }
      
      if (tag === "products") {
        revalidatePath("/[countryCode]", "page")
        revalidatePath("/[countryCode]/(main)/store", "page")
        revalidatePath("/[countryCode]/(main)/collections/[handle]", "page")
        revalidatePath("/[countryCode]/(main)/categories/[...category]", "page")
        
        revalidateTag("products")
      }

      if (tag === "collections") {
        revalidatePath("/[countryCode]", "page")
        revalidatePath("/[countryCode]/(main)/store", "page")
        revalidatePath("/[countryCode]/(main)/collections/[handle]", "page")
        
        revalidateTag("collections")
      }

      if (tag === "categories") {
        revalidatePath("/[countryCode]/(main)/categories/[...category]", "page")
        
        revalidateTag("categories")
      }

      if (tag.startsWith("product-")) {
        revalidateTag("products")
        revalidateTag("product")
      }
    })
  )

  return NextResponse.json({ 
    message: "Revalidated", 
    tags: tagsArray,
    timestamp: new Date().toISOString()
  }, { status: 200 })
}
