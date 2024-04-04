import { BookProps } from "@/app/interface"
import Image from "next/image"

interface BookPageProps {
  params: {
    id: number
  }
}

export default async function BookId({ params }: BookPageProps) {
  const bookId = params.id

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`
  )
  const book: BookProps = await res.json()

  return (
    <div className="w-full md:flex gap-3 block p-1">
      <div>
        {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
          <Image
            alt="Thumb book"
            src={book.volumeInfo.imageLinks.thumbnail}
            width={200}
            height={200}
            quality={100}
          />
        )}
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-lg">{book.volumeInfo.title}</h1>
          <>
            {book.volumeInfo.publisher ? (
              <h1>Editora: {book.volumeInfo.publisher}</h1>
            ) : null}
          </>
        </div>
        <div className="flex justify-between my-2">
          <>
            {book.volumeInfo.authors ? (
              <h1>Autores(a): {book.volumeInfo.authors}</h1>
            ) : null}
          </>
          <>
            {book.volumeInfo.categories ? (
              <h1>Categoria(s): {book.volumeInfo.categories}</h1>
            ) : null}
          </>
        </div>
        <>
          {book.volumeInfo.description ? (
            <h1 className="max-w-7xl m-auto text-justify">
              Descrição: {book.volumeInfo.description}
            </h1>
          ) : null}
        </>
        <div className="flex justify-between my-2">
          <>
            {book.volumeInfo.publishedDate ? (
              <h1>Data de publicação: {book.volumeInfo.publishedDate}</h1>
            ) : null}
          </>
          <>
            {book.volumeInfo.pageCount ? (
              <h1>Número de páginas: {book.volumeInfo.pageCount}</h1>
            ) : null}
          </>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <>
              {book.saleInfo.saleability ? <h1>A venda: Sim</h1> : <h1>Não</h1>}
            </>
            <>
              {book.saleInfo.isEbook ? (
                <h1>Versão de Ebook?: Sim</h1>
              ) : (
                <h1>Versão de Ebook? Não</h1>
              )}
            </>
            <>
              {book.saleInfo.retailPrice?.amount ? (
                <h1>Preço: R${book.saleInfo.retailPrice?.amount}</h1>
              ) : null}
            </>
          </div>
          <div className="flex gap-3 font-medium text-lg">
            <>
              {book.volumeInfo.previewLink ? (
                <h1>
                  <a href={book.volumeInfo.previewLink} target="_blank">
                    Link de visualização
                  </a>
                </h1>
              ) : null}
            </>
            <>
              {book.volumeInfo.infoLink ? (
                <h1>
                  <a href={book.volumeInfo.infoLink} target="_blank">
                    Link para adquirir
                  </a>
                </h1>
              ) : null}
            </>
          </div>
        </div>
      </div>
    </div>
  )
}
