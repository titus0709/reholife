import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import reholifeLogo from "@/assets/reholifeLogo.jpg";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const linkClasses = (active: boolean) =>
    active
      ? "text-gold font-semibold"
      : "text-white hover:text-gold transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-black/80 border-b border-gold/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:py-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gold">
            <Image
              src={reholifeLogo}
              alt="Reholife Logo"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            Reholife
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className={linkClasses(pathname === "/")}>
              Home
            </Link>
            <Link href="/blog" className={linkClasses(pathname.startsWith("/blogs"))}>
              Blogs
            </Link>

             {/* <Link
              href="/blog/search"
              className={linkClasses(pathname.startsWith("/blog/search"))}
            >
              Search
            </Link> */}

            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-gold transition-colors"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-white hover:text-gold transition-colors"
            >
              Testimonials
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-gold transition-colors"
            >
              Contact
            </button>

            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gold text-black hover:bg-gold/90"
            >
              Book a Session
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">

            <Link
              href="/"
              className={linkClasses(pathname === "/")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/blogs"
              className={linkClasses(pathname.startsWith("/blogs"))}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blogs
            </Link>
            {/* <Link
              href="/blog/search"
              className={linkClasses(pathname.startsWith("/blog/search"))}
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </Link> */}


            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-gold text-left"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-white hover:text-gold text-left"
            >
              Testimonials
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-gold text-left"
            >
              Contact
            </button>

            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gold text-black hover:bg-gold/90 w-full"
            >
              Book a Session
            </Button>

          </nav>
        )}
      </div>
    </header>
  );
}
