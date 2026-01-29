"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import ContactDialog from "@/components/ContactDialog";

export default function Hero() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFormSubmit = (data: { name: string; phone: string; email: string }) => {
    // Здесь можно добавить отправку данных на сервер
    console.log("Form submitted:", data);
    // Можно добавить toast уведомление об успешной отправке
  };

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      {/* Фоновое изображение */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{
          backgroundImage: 'url(/images/hero-background.jpg)',
        }}
      />
      
      {/* Градиентный оверлей с плавными переходами */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/70 to-blue-50/90" />
      
      {/* Дополнительный градиент для плавного перехода к следующей секции */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      
      {/* Контент поверх фона */}
      <div className="relative z-10">
        <Container>
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-10">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
                Строительство домов под ключ
              </h1>
              <p className="mx-auto max-w-[750px] text-xl text-muted-foreground md:text-2xl">
               Каменный или каркасный с коммуникациями и отделкой. Любой.
              </p>
            </div>
          
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => setIsDialogOpen(true)}
                className="relative text-lg px-10 py-8 h-auto hover:px-12 hover:py-9 transition-all duration-300 overflow-hidden group bg-primary"
              >
            
                <span className="relative z-10 text-primary-foreground transition-colors duration-300">
                  Рассчитать бюджет строительства
                </span>
            
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 via-green-500 to-blue-500 opacity-0 group-hover:opacity-75 transition-opacity duration-1000 animate-gradient-x rounded-[inherit] p-[2px]">
                  <span className="absolute inset-[4px] bg-primary rounded-[inherit]"></span>
                </span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
              <div className="p-6 bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-2">Поможем с одобрением</h3>
                <p className="text-sm font-regular text-primary">льготной ипотеки от 3%</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-2">Работаем с</h3>
                <p className="text-sm font-regular text-primary">эскроу-счетом</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-2">Расчет бюджета</h3>
                <p className="text-sm font-regular text-primary">уже после первой консультации</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <ContactDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        source="hero"
        onSubmit={handleFormSubmit}
      />
    </section>
  );
}
