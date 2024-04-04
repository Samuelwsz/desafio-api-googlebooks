"use client"

import { BookProps } from "@/app/interface"
import axios from "axios"
import { useEffect, useState } from "react"

export const key = process.env.API_KEY

export default function SearchBook() {
  const [query, setQuery] = useState("")
  const [books, setBooks] = useState<BookProps[]>([])

  const searchBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&${key}`
      )
      setBooks(response.data.items)
    } catch (error) {
      console.error("Erro ao buscar livros:", error)
    }
  }

  const handleChange = (event: any) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    searchBooks()
  }

  return (
    <main>
      <div>
        <h1>Buscar Livros</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={query} onChange={handleChange} />
          <button type="submit">Buscar</button>
        </form>
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.volumeInfo.title}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}
