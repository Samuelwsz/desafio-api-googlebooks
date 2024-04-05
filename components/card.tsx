import { BookProps } from "@/app/interface"
import Image from "next/image"
import Link from "next/link"

export function Card({ book }: { book: BookProps }) {
  return (
    <>
      <div>
        <Link
          href={`/book/${book.id}`}
          target="_blank"
          className="bg-zinc-200 dark:bg-zinc-700 m-3 flex py-2 border border-zinc-600"
        >
          {book.volumeInfo.imageLinks &&
            book.volumeInfo.imageLinks.thumbnail && (
              <div className="flex justify-center items-center">
                <Image
                  alt="Thumb book"
                  src={book.volumeInfo.imageLinks.thumbnail}
                  width={150}
                  height={150}
                  quality={80}
                  className="object-contain h-[150px] w-[150px]"
                />
              </div>
            )}

          <div className="max-w-56 mx-auto">
            <h2 className="text-left mb-2">{book.volumeInfo.title}</h2>
            <>
              {book.volumeInfo.publishedDate ? (
                <>
                  <h2>Publicação: {book.volumeInfo.publishedDate}</h2>
                </>
              ) : null}
            </>
            <p>
              {book.saleInfo.retailPrice?.amount ? (
                <>
                  <p>Preço: R${book.saleInfo.retailPrice?.amount}</p>
                </>
              ) : null}
            </p>
          </div>
        </Link>
      </div>
    </>
  )
}
