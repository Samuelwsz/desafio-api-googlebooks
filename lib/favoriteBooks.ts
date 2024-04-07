import { BookProps } from "@/app/interface"
import { useEffect, useState } from "react"

export function FetchFavoritesBooks() {
  const [book, setBook] = useState<BookProps | null>(null)
  const [favoritos, setFavoritos] = useState<BookProps[]>([])

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Aqui você pode recuperar os favoritos do localStorage
        const storedFavorites = localStorage.getItem("favorites")
        if (storedFavorites) {
          setFavoritos(JSON.parse(storedFavorites))
        }
      } catch (error) {
        console.error("Error fetching favorites:", error)
      }
    }

    fetchFavorites()
  }, []) // Sem dependências para garantir que seja executado apenas uma vez

  const handleAddToFavorites = () => {
    if (book) {
      const cpyFavoritos = [...favoritos]
      const index = cpyFavoritos.findIndex((item) => item.id === book.id)

      if (index === -1) {
        cpyFavoritos.push(book)
      } else {
        cpyFavoritos.splice(index, 1)
      }

      setFavoritos(cpyFavoritos)
      localStorage.setItem("favorites", JSON.stringify(cpyFavoritos))
    }
  }

  return { favoritos, book, setBook, handleAddToFavorites }
}
