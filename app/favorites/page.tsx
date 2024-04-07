"use client"

import { Card } from "@/components/card"
import { FetchFavoritesBooks } from "@/lib/favoriteBooks"

export default function FavoritesBooks() {
  const { favoritos } = FetchFavoritesBooks()

  console.log(favoritos)

  return (
    <div>
      {favoritos.map((favorito) => (
        <Card key={favorito.id} book={favorito} />
      ))}
    </div>
  )
}
