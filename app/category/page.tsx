"use client"

import { useEffect, useState } from "react"
import { BookProps } from "../interface"
import { Card } from "@/components/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
} from "lucide-react"

function BookSearch() {
  const [query, setQuery] = useState("")
  const [books, setBooks] = useState<BookProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searched, setSearched] = useState(false)
  const [totalItems, setTotalItems] = useState(0)

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

  const handleChange = (event: any) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (query && searched) {
        try {
          const startIndex = (currentPage - 1) * 10
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=subject:${query}&startIndex=${startIndex}&maxResults=10`
          )
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          const data = await response.json()
          setBooks(data.items)
          setTotalPages(Math.ceil(data.totalItems / 10))
          setTotalItems(data.totalItems)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
    }

    fetchData()
  }, [currentPage, query, searched])

  function handleRemoveSearch() {
    setSearched(false)
    setQuery("")
    goToFirstPage()
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    goToFirstPage()
    setSearched(true)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="flex items-center justify-end mr-3">
            <div className="relative w-96">
              <Input
                type="text"
                placeholder="Busque por categoria..."
                value={query}
                onChange={handleChange}
                className="my-3 outline-none "
              />
              <X
                onClick={handleRemoveSearch}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer size-5 items-center"
              />
            </div>
            <Button
              type="submit"
              className="ml-2 px-4 py-2 bg-zinc-600 text-white rounded-md hover:bg-zinc-700"
            >
              Pesquisar
            </Button>
          </div>
        </div>
      </form>
      {searched && (
        <>
          {" "}
          <h1 className="text-center my-3 text-2xl font-medium">
            Lista de Livros
          </h1>
          <div className="sm:px-2 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
            {books && books.map((book) => <Card key={book.id} book={book} />)}
          </div>
          <div className="flex my-4 justify-between mx-8">
            <div>
              Mostrando {currentPage * 10 - 9} -{" "}
              {Math.min(currentPage * 10, totalItems)} de {totalItems} itens
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
        </>
      )}
    </div>
  )
}

export default BookSearch
