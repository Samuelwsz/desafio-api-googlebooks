"use client"

import { Card } from "@/components/card"
import { FetchFavoritesBooks } from "@/lib/favoriteBooks"

export default function FavoritesBooks() {
  const { favoritos } = FetchFavoritesBooks()

  console.log(favoritos)

  return (
    <div className="sm:px-2 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
      {favoritos.map((favorito) => (
        <Card key={favorito.id} book={favorito} />
      ))}
    </div>
  )
}
