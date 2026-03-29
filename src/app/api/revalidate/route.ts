import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const tags = searchParams.get("tags") as string

  if (!tags) {
    return NextResponse.json({ error: "No tags provided" }, { status: 400 })
  }

  const tagsArray = tags.split(",")

  await Promise.all(
    tagsArray.map(async (tag) => {
      if (tag.startsWith("product")) {
        revalidatePath("/[countryCode]/(main)/store", "page")
        revalidatePath("/[countryCode]/(main)/products/[handle]", "page")
        revalidatePath("/[countryCode]/(main)/collections/[handle]", "page")
        revalidatePath("/[countryCode]/(main)/categories/[...category]", "page")
      }
      
      if (tag === "products") {
        revalidatePath("/[countryCode]/(main)/store", "page")
        revalidatePath("/[countryCode]/(main)/collections/[handle]", "page")
        revalidatePath("/[countryCode]/(main)/categories/[...category]", "page")
      }

      if (tag === "collections") {
        revalidatePath("/[countryCode]/(main)/store", "page")
        revalidatePath("/[countryCode]/(main)/collections/[handle]", "page")
      }

      if (tag === "categories") {
        revalidatePath("/[countryCode]/(main)/categories/[...category]", "page")
      }
    })
  )

  return NextResponse.json({ 
    message: "Revalidated", 
    tags: tagsArray,
    timestamp: new Date().toISOString()
  }, { status: 200 })
}
