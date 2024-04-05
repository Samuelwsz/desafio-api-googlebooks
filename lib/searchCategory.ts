import { BookProps } from "@/app/interface"
import axios from "axios"
import { useEffect, useState } from "react"

export const FetchCategory = () => {
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

  return {
    handleSubmit,
    handleRemoveSearch,
    goToNextPage,
    goToFirstPage,
    goToLastPage,
    handleChange,
    goToPreviousPage,
    books,
    totalItems,
    loading,
    query,
    searched,
    currentPage,
    totalPages,
  }
}
