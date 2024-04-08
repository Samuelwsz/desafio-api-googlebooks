"use client"

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
import Loading from "../loading"
import { FetchCategory } from "@/lib/searchCategory"

export default function BookSearch() {
  const {
    books,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    handleChange,
    handleRemoveSearch,
    handleSubmit,
    loading,
    totalItems,
    query,
    searched,
    currentPage,
    totalPages,
  } = FetchCategory()

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
                className="ml-2 px-4 py-2 rounded-md hover:bg-zinc-700 dark:hover:bg-blue-600 text-white font-medium"
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
