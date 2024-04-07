"use client"
import { useEffect } from "react"
import { BookProps } from "@/app/interface"
import Image from "next/image"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { FetchFavoritesBooks } from "@/lib/favoriteBooks"

interface BookPageProps {
  params: {
    id: number
  }
}

export default function BookId({ params }: BookPageProps) {
  const { book, setBook, handleAddToFavorites, favoritos } =
    FetchFavoritesBooks()

  // const bookId = params.id

  // const [book, setBook] = useState<BookProps | null>(null)
  // const [favoritos, setFavoritos] = useState<BookProps[]>([])

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
    return <div>Loading...</div> // Render a loading state while fetching the book
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
            <h1>Editora: {book.volumeInfo.publisher}</h1>
          )}
        </div>
        <div className="flex justify-between my-2">
          {book.volumeInfo.authors && (
            <h1>Autores(a): {book.volumeInfo.authors}</h1>
          )}
          {book.volumeInfo.categories && (
            <h1>Categoria(s): {book.volumeInfo.categories}</h1>
          )}
        </div>
        {book.volumeInfo.description && (
          <h1 className="max-w-7xl m-auto text-justify">
            Descrição: {book.volumeInfo.description}
          </h1>
        )}
        <div className="flex justify-between my-2">
          {book.volumeInfo.publishedDate && (
            <h1>Data de publicação: {book.volumeInfo.publishedDate}</h1>
          )}
          {book.volumeInfo.pageCount && (
            <h1>Número de páginas: {book.volumeInfo.pageCount}</h1>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <h1>A venda: {book.saleInfo.saleability ? "Sim" : "Não"}</h1>
            <h1>Versão de Ebook?: {book.saleInfo.isEbook ? "Sim" : "Não"}</h1>
            {book.saleInfo.retailPrice?.amount && (
              <h1>Preço: R${book.saleInfo.retailPrice.amount}</h1>
            )}
          </div>
          <div className="flex gap-3 font-medium text-lg">
            {book.volumeInfo.previewLink && (
              <h1>
                <a href={book.volumeInfo.previewLink} target="_blank">
                  Link de visualização
                </a>
              </h1>
            )}
            {book.volumeInfo.infoLink && (
              <h1>
                <a href={book.volumeInfo.infoLink} target="_blank">
                  Link para adquirir
                </a>
              </h1>
            )}
          </div>
        </div>
        <Button onClick={handleAddToFavorites}>
          {favoritos &&
          favoritos.length > 0 &&
          favoritos.findIndex((item) => item.id === book?.id) !== -1
            ? "Remove from favorites"
            : "Add to favorites"}
        </Button>
      </div>
    </div>
  )
}
