This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


https://github.com/rh-southsystem/desafio-front-books

-----------

"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { BookProps } from "../interface"
import { Card } from "@/components/card"
import { Input } from "@/components/ui/input"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

export default function Home() {
  const [books, setBooks] = useState<BookProps[]>([])
  const [category, setCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    fetchBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const fetchBooks = async () => {
    try {
      const startIndex = (currentPage - 1) * 10
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&startIndex=${startIndex}&maxResults=10`
      )
      setBooks(response.data.items)
      setTotalItems(response.data.totalItems)
    } catch (error) {
      console.error("Error fetching books:", error)
    }
  }

  const handleSearch = () => {
    setCurrentPage(1) // Reset page to first when searching
    fetchBooks()
  }

  const totalPages = Math.ceil(totalItems / 10)

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  function goToFirstPage() {
    setCurrentPage(1)
  }

  function goToLastPage() {
    setCurrentPage(totalPages)
  }

  const firstBookIndex = (currentPage - 1) * 10 + 1
  const lastBookIndex = Math.min(currentPage * 10, totalItems)
  return (
    <main>
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Busque por categoria..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="my-3 outline-none"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-zinc-600 text-white rounded-md hover:bg-zinc-700"
        >
          Pesquisar
        </button>
      </div>
      <div>
        <h1 className="text-center my-3 text-2xl font-medium">
          Lista de Livros
        </h1>

        <div className="sm:px-2 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
          {books && books.map((book) => <Card key={book.id} book={book} />)}
        </div>

        <div className="flex my-4 justify-between mx-8">
          <div>
            <span>
              Mostrando {firstBookIndex}-{lastBookIndex} de {totalItems} itens
            </span>
          </div>

          <div className="flex items-center">
            <span className="mr-6">
              Página {currentPage} de {totalPages}
            </span>
            <button onClick={goToFirstPage} disabled={currentPage === 1}>
              <ChevronsLeft />
            </button>
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              <ChevronLeft />
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </button>
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
