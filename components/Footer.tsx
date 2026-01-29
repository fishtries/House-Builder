import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { Container } from "@/components/Container";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50">
      <Container className="container px-4 md:px-6 py-8">
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">СвойДом-КРД</h3>
            <p className="text-sm text-muted-foreground">
              Строительная компания. Краснодарский Край, Адыгея и Калмыкия
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-2">
              <a href="tel:88005502633" className="flex items-center justify-center gap-2 text-sm hover:text-primary">
                <Phone className="h-4 w-4" />
                8-800-550-26-33
              </a>
              <div className="flex gap-2 mt-4 justify-center">
                <Link href="https://t.me/+79385550522" target="_blank">
                  <Button variant="outline" size="icon">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://vk.com/svoydom_krd" target="_blank">
                  <Button variant="outline" size="icon">
                    <span className="text-sm">VK</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Мы в соц. сетях</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Новости, отчеты с объектов, обсуждения. Заходите в гости - у нас интересно
            </p>
            <Link href="https://vk.com/svoydom_krd" target="_blank">
              <Button variant="outline">Открыть группу ВК</Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 СвойДом-КРД. Все права защищены.</p>
        </div>
      </Container>
    </footer>
  );
}
