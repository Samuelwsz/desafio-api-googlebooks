"use client"

import { useEffect } from "react"
import { BookProps } from "@/app/interface"
import Image from "next/image"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { FetchFavoritesBooks } from "@/lib/favoriteBooks"
import Loading from "@/app/loading"

interface BookPageProps {
  params: {
    id: number
  }
}

export default function BookId({ params }: BookPageProps) {
  const { book, setBook, handleAddToFavorites, favoritos } =
    FetchFavoritesBooks()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${params.id}`
        )
        const data: BookProps = await res.data
        setBook(data)
      } catch (error) {
        console.error("Error fetching book:", error)
      }
    }

    fetchBook()
  }, [params.id, setBook])

  if (!book) {
    return <Loading />
  }

  return (
    <div className="w-full md:flex gap-3 block p-1 dark:text-zinc-300/90">
      <div>
        {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
          <Image
            alt="Thumb book"
            src={book.volumeInfo.imageLinks.thumbnail}
            width={300}
            height={300}
            quality={100}
          />
        )}
      </div>
      <div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium dark:text-white text-black">
            {book.volumeInfo.title}
          </h1>
          {book.volumeInfo.publisher && (
            <h1>
              <span className="font-medium text-zinc-200">Editora: </span>
              {book.volumeInfo.publisher}
            </h1>
          )}
        </div>
        <div className="block sm:flex justify-between my-2">
          {book.volumeInfo.authors && (
            <h1>
              <span className="font-medium text-zinc-200">Autores(a):</span>{" "}
              {book.volumeInfo.authors}
            </h1>
          )}
          {book.volumeInfo.categories && (
            <h1>
              <span className="font-medium text-zinc-200">Categoria(s): </span>
              {book.volumeInfo.categories}
            </h1>
          )}
        </div>
        {book.volumeInfo.description && (
          <h1 className="max-w-7xl m-auto text-justify">
            <span className="font-medium text-zinc-200">Descrição:</span>{" "}
            {book.volumeInfo.description}
          </h1>
        )}
        <div className="flex justify-between my-2">
          {book.volumeInfo.publishedDate && (
            <h1>
              <span className="font-medium text-zinc-200">
                Data de publicação:
              </span>{" "}
              {book.volumeInfo.publishedDate}
            </h1>
          )}
          {book.volumeInfo.pageCount && (
            <h1>
              <span className="font-medium text-zinc-200">
                Número de páginas:
              </span>{" "}
              {book.volumeInfo.pageCount}
            </h1>
          )}
        </div>
        <div className="block md:flex justify-between items-center">
          <div className="flex gap-3">
            <h1>
              <span className="font-medium text-zinc-200">A venda:</span>{" "}
              {book.saleInfo.saleability ? "Sim" : "Não"}
            </h1>
            <h1>
              <span className="font-medium text-zinc-200">
                Versão de Ebook?:
              </span>{" "}
              {book.saleInfo.isEbook ? "Sim" : "Não"}
            </h1>
            {book.saleInfo.retailPrice?.amount && (
              <h1>
                <span className="font-medium">Preço: R$</span>
                {book.saleInfo.retailPrice.amount}
              </h1>
            )}
          </div>
          <div className="justify-between flex gap-3 font-medium text-lg">
            {book.volumeInfo.previewLink && (
              <Button>
                <a
                  href={book.volumeInfo.previewLink}
                  target="_blank"
                  className="text-white"
                >
                  Link de visualização
                </a>
              </Button>
            )}
            {book.volumeInfo.infoLink && (
              <Button>
                <a
                  href={book.volumeInfo.infoLink}
                  target="_blank"
                  className="text-white"
                >
                  Link para adquirir
                </a>
              </Button>
            )}
          </div>
        </div>
        <Button
          onClick={handleAddToFavorites}
          className="mt-3 font-medium text-white"
        >
          {favoritos &&
          favoritos.length > 0 &&
          favoritos.findIndex((item) => item.id === book?.id) !== -1
            ? "Remover dos favoritos"
            : "Adicionar aos favoritos"}
        </Button>
      </div>
    </div>
  )
}
