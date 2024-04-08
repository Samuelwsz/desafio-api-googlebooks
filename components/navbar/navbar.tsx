import { Home } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "../darkMode/modeToogle"
import { NavLink } from './navlink'

const links = [
  {
    title: "Categoria",
    path: "/category",
  },
  {
    title: "Procurar livros",
    path: "/search",
  },
  {
    title: "Favoritos",
    path: "/favorites",
  },
]

export function NavBar() {
  return (
    <header className="bg-zinc-700 text-zinc-300">
      <nav className="max-w-7xl m-auto py-5 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href={"/"}>
              <Home className="size-8 text-blue-600" />
            </Link>
            <ModeToggle />
          </div>
          <div className="flex gap-6">
            {links.map((link) => (
              <NavLink key={link.title} item={link} />
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
