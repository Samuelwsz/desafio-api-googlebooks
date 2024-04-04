"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BookProps } from "../interface"

export default function Home() {
  const [books, setBooks] = useState<BookProps[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=house"
        )
        setBooks(response.data.items)
      } catch (error) {
        console.error("Error fetching books:", error)
      }
    }

    fetchBooks()
  }, [])

  return (
    <main>
      <div>
        <h1 className="text-center my-3 text-2xl font-medium">
          Lista de Livros
        </h1>
        <div className="sm:px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
          {books.map((book) => (
            <div key={book.id} className="">
              <Link href={`/book/${book.id}`}>
                <div className="bg-zinc-200 dark:bg-zinc-700 m-3 flex py-2 border border-zinc-600">
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

                  <div>
                    <h2 className="max-w-60 m-auto">{book.volumeInfo.title}</h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
