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
import { IconButton } from "@/components/icon-button"
import axios from "axios"
import Loading from "../loading"

export default function BookSearch() {
  const [query, setQuery] = useState("")
  const [books, setBooks] = useState<BookProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searched, setSearched] = useState(false)
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(false)

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
          setLoading(true)

          const startIndex = (currentPage - 1) * 10
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=subject:${query}&startIndex=${startIndex}&maxResults=10`
          )

          const data = await response.data
          setBooks(data.items)
          setTotalPages(Math.ceil(data.totalItems / 10))
          setTotalItems(data.totalItems)
        } catch (error) {
          setLoading(false)
          console.error("Error fetching data:", error)
        } finally {
          setLoading(false)
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
          <div className="block sm:flex items-center justify-between mx-3">
            <div>
              <h1 className="text-2xl font-medium text-center mt-3">
                Categorias
              </h1>
            </div>
            <div className="flex items-center">
              <div className="relative w-72">
                <Input
                  type="text"
                  placeholder="Busque por categoria..."
                  value={query}
                  onChange={handleChange}
                  className="my-3 outline-none "
                />
                <X
                  onClick={handleRemoveSearch}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer size-5 items-center hover:text-red-400"
                />
              </div>
              <Button
                type="submit"
                className="ml-2 px-4 py-2 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300"
              >
                Pesquisar
              </Button>
            </div>
          </div>
        </div>
      </form>
      {searched && (
        <>
          <h1 className="text-center my-3 text-2xl font-medium">
            Lista de Livros
          </h1>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="sm:px-2 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
                {books &&
                  books.map((book) => <Card key={book.id} book={book} />)}
              </div>
              <div className="flex my-4 justify-between mx-8">
                <div>
                  Mostrando {currentPage * 10 - 9} -{" "}
                  {Math.min(currentPage * 10, totalItems)} de {totalItems} itens
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="mr-6">
                    Página {currentPage} de {totalPages}
                  </span>
                  <IconButton
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft />
                  </IconButton>
                  <IconButton
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight />
                  </IconButton>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
