export interface BookProps {
  id: string
  volumeInfo: {
    title: string
    subtitle?: string
    authors?: string[]
    publisher?: string
    description?: string
    publishedDate?: string
    imageLinks?: {
      thumbnail: string
    }
    pageCount?: number
    categories?: string[]
    previewLink?: string
    infoLink?: string
  }
  saleInfo: {
    saleability?: string
    isEbook?: boolean
    retailPrice?: {
      amount?: number
      currencyCode?: string
    }
  }
}
