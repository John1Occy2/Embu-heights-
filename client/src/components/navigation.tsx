
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
    { href: "/amenities", label: "Amenities" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="font-playfair text-2xl text-primary cursor-pointer">Embu Heights</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map(link => (
              <Link key={link.href} href={link.href}>
                <span className={cn(
                  "text-sm font-montserrat tracking-wide transition-colors cursor-pointer",
                  location === link.href
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                )}>
                  {link.label}
                </span>
              </Link>
            ))}
            <button
              onClick={() => window.location.href = "/__repl"}
              className="px-4 py-2 bg-primary text-white rounded-md font-montserrat
                       text-sm tracking-wide hover:bg-primary-dark transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
