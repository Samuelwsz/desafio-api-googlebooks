import { BookProps } from "@/app/interface"
import axios from "axios"
import { ChangeEvent, FormEvent, useState } from "react"

export const key = process.env.API_KEY

export const FetchBooks = () => {
  const [query, setQuery] = useState("")
  const [books, setBooks] = useState<BookProps[]>([])
  const [loading, setLoading] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    searchBooks()
    setQuery("")
  }

  const searchBooks = async () => {
    try {
      setLoading(true)

      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=1&maxResults=40&${key}`
      )

      const data = await response.data
      setBooks(data.items)
    } catch (error) {
      console.error("Erro ao buscar livros:", error)

      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return { query, loading, books, handleSubmit, handleChange }
}
