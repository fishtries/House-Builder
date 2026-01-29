import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Menu } from "lucide-react";
import { Container } from "@/components/Container";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/40 bg-gradient-to-t from-transparent to-white">    
      <Container className='flex items-center justify-between py-8'>

        {/*Левая часть*/}
        <div className="flex items-center justify-center px-8">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-black">plchldr</span>
          </Link>        
        </div>

        {/* Центральная часть */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="#projects" 
            className="relative text-m font-medium hover:text-primary transition-all duration-300 hover:scale-110 group">
            Проекты
          </Link>
          <Link 
            href="#reviews" 
            className="relative text-m font-medium hover:text-primary transition-all duration-300 hover:scale-110 group">
            Отзывы
          </Link>
          <Link 
            href="#how-we-build" 
            className="relative text-m font-medium hover:text-primary transition-all duration-300 hover:scale-110 group">
            Как мы строим
          </Link>
          <Link 
            href="#team" 
            className="relative text-m font-medium hover:text-primary transition-all duration-300 hover:scale-110 group">
            Команда
          </Link>
        </nav>

        {/* Правая часть */}
        <div className="flex items-center justify-center px-8">
          <Link href="tel:88005502633" className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">8-800-550-26-33</span>
          </Link>
        </div>

      </Container>
    </header>
  );
}
