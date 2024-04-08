import Image from "next/image"
import Img1 from "@/public/livro1.png"
import Img2 from "@/public/livro2.png"
export default function Home() {
  return (
    <main className="text-center py-16 text-5xl font-medium">
      <h1>Api Google Books</h1>
      <div className="block md:flex">
        <Image
          alt="Home page book image"
          src={Img1}
          width={400}
          height={400}
          className="flex justify-center m-auto py-10"
        />
        <Image
          alt="Home page book image"
          src={Img2}
          width={400}
          height={400}
          className="flex justify-center m-auto py-10"
        />
      </div>
    </main>
  )
}
