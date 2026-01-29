"use client";

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import ContactDialog from "@/components/ContactDialog";

export default function ObjectsGallery() {
  const premiumObjects = [
    { area: "260 м²", year: "2020 г.", location: "г. Краснодар" },
    { area: "220 м²", year: "2019 г.", location: "г. Краснодар" },
    { area: "160 м²", year: "2019 г.", location: "ст. Елизаветинская" },
    { area: "240 м²", year: "2019 г.", location: "г. Краснодар" },
  ];

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFormSubmit = (data: { name: string; phone: string; email: string }) => {
    console.log("Mortgage consultation request:", data);
  };

  return (
    <section className="w-full py-16 bg-white">
      <Container className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Наши объекты</h2>
          <p className="text-2xl font-semibold text-primary">65 домов за 7 лет работы</p>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">от премиум-проектов</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 justify-items-center max-w-7xl mx-auto">
            {premiumObjects.map((obj, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow w-full max-w-sm">
                <div className="aspect-video bg-muted"></div>
                <CardContent className="p-4">
                  <div className="space-y-1 text-sm text-center">
                    <p className="font-semibold">{obj.area}</p>
                    <p className="text-muted-foreground">{obj.year}</p>
                    <p className="text-muted-foreground">{obj.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">до бюджетных</h3>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 justify-items-center max-w-7xl mx-auto">
            {Array.from({ length: 12 }).map((_, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow w-full max-w-sm">
                <div className="aspect-video bg-muted"></div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">и каркасных домов</h3>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5 justify-items-center max-w-7xl mx-auto">
            {Array.from({ length: 10 }).map((_, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow w-full max-w-sm">
                <div className="aspect-video bg-muted"></div>
              </Card>
            ))}
          </div>
        </div>

        <Container className="bg-gray-50 rounded-lg p-8 text-center max-w-2xl">
          <h3 className="text-2xl font-bold mb-4">Хотите убедиться в качестве наших работ?</h3>
          <p className="text-muted-foreground mb-6">
            Организуем экскурсию на готовые или строящиеся объекты
          </p>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="w-full rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300"
          >
            Записаться на экскурсию
          </Button>

          <ContactDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            source="gallery"
            title="Записаться на экскурсию"
            description="Напишите нам и мы организуем экскурсию на готовые или строящиеся объекты"
            onSubmit={handleFormSubmit}
          />
        </Container>
      </Container>
    </section>
  );
}
