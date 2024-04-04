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
    <div className="flex gap-3">
      {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
        <Image
          alt="Thumb book"
          src={book.volumeInfo.imageLinks.thumbnail}
          width={200}
          height={200}
        />
      )}
      <div>
        <h1>{book.volumeInfo.title}</h1>
      </div>
    </div>
  )
}
