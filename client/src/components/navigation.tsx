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
            <a className="font-playfair text-2xl text-primary">Embu Heights</a>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {links.map(link => (
              <Link key={link.href} href={link.href}>
                <a className={cn(
                  "text-sm font-montserrat tracking-wide transition-colors",
                  location === link.href
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                )}>
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
