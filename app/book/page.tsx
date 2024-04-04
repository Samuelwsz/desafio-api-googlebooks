"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { BookProps } from "../interface"
import { Card } from "@/components/card"

export default function Home() {
  const [books, setBooks] = useState<BookProps[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=react"
        )
        setBooks(response.data.items)
      } catch (error) {
        console.error("Error fetching books:", error)
      }
    }

    fetchBooks()
  }, [])

  return (
    <main>
      <div>
        <h1 className="text-center my-3 text-2xl font-medium">
          Lista de Livros
        </h1>
        <div className="sm:px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
          {books.map((book) => (
            <>
              <Card book={book} />
            </>
          ))}
        </div>
      </div>
    </main>
  )
}
