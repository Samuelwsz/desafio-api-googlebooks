import { Home } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "./darkMode/modeToogle"

export function NavBar() {
  return (
    <header className="bg-zinc-700 text-zinc-300">
      <nav className="max-w-7xl m-auto py-5 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href={"/"}>
              <Home className="size-8" />
            </Link>
            <ModeToggle />
          </div>
          <div className="flex gap-10">
            <Link href={"/category"}>Categorias</Link>
            <Link href={"/search"}>Procurar livros</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
