"use client"

import Loading from "@/app/loading"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/card"
import { FetchBooks } from "@/lib/searchBook"

export default function SearchBook() {
  const { books, handleChange, handleSubmit, loading, query } = FetchBooks()

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
                className="ml-2 px-4 py-2 rounded-md hover:bg-zinc-700 dark:hover:bg-blue-600 text-white font-medium"
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
