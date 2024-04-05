"use client"

import { BookProps } from "@/app/interface"
import axios from "axios"
import { ChangeEvent, FormEvent, useState } from "react"

import Loading from "@/app/loading"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/card"

export const key = process.env.API_KEY

export default function SearchBook() {
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

  return (
    <main>
      <div>
        <div className="flex flex-col text-center gap-3 my-5">
          <h1 className="text-2xl font-medium">Buscar Livros</h1>
          <form
            onSubmit={handleSubmit}
            className="flex w-96 justify-center m-auto"
          >
            <div className="flex items-center">
              <div className="relative w-72">
                <Input
                  type="text"
                  placeholder="Busque um livro..."
                  value={query}
                  onChange={handleChange}
                  className="my-3 outline-none "
                />
              </div>
              <Button
                type="submit"
                className="ml-2 px-4 py-2 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300"
              >
                Pesquisar
              </Button>
            </div>
          </form>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="sm:px-2 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
              {books && books.map((book) => <Card key={book.id} book={book} />)}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
