"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Camera, Shield, FileText, MapPin, Calculator } from "lucide-react";
import { Container } from "@/components/Container";
import ContactDialog from "@/components/ContactDialog";

export default function HowWeBuildSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFormSubmit = (data: { name: string; phone: string; email: string }) => {
    console.log("Mortgage consultation request:", data);
  };

  return (
    <section id="how-we-build" className="w-full py-16 bg-white">
      <Container className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Как мы строим?</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12 justify-items-center max-w-6xl mx-auto">
          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <Shield className="h-8 w-8 text-primary mb-2 mx-auto" />
              <CardTitle>Гарантия 5 лет</CardTitle>
              <CardDescription>по официальному договору</CardDescription>
            </CardHeader>
          </Card>

          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <FileText className="h-8 w-8 text-primary mb-2 mx-auto" />
              <CardTitle>Подберем и доработаем</CardTitle>
              <CardDescription>любой проект из нашего каталога бесплатно</CardDescription>
            </CardHeader>
          </Card>

          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <MapPin className="h-8 w-8 text-primary mb-2 mx-auto" />
              <CardTitle>Помогаем с выбором</CardTitle>
              <CardDescription>и проверкой участка для строительства бесплатно</CardDescription>
            </CardHeader>
          </Card>

          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <Calculator className="h-8 w-8 text-primary mb-2 mx-auto" />
              <CardTitle>Любые формы оплаты</CardTitle>
              <CardDescription>наличные, карты, безнал, материнский капитал, жилищные сертификаты</CardDescription>
            </CardHeader>
          </Card>

          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <FileText className="h-8 w-8 text-primary mb-2 mx-auto" />
              <CardTitle>Проводим предварительную</CardTitle>
              <CardDescription>геодезическую экспертизу бесплатно</CardDescription>
            </CardHeader>
          </Card>

          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <FileText className="h-8 w-8 text-primary mb-2 mx-auto" />
              <CardTitle>Детальная и прозрачная смета</CardTitle>
              <CardDescription>бесплатно</CardDescription>
            </CardHeader>
          </Card>

          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <CheckCircle2 className="h-8 w-8 text-primary mb-2 mx-auto" />
              <CardTitle>Без изменений</CardTitle>
              <CardDescription>в процессе строительства</CardDescription>
            </CardHeader>
          </Card>

          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <Camera className="h-8 w-8 text-primary mb-2 mx-auto" />
              <CardTitle>На каждом объекте БЕСПЛАТНО</CardTitle>
              <CardDescription>устанавливаем камеру. Наблюдайте за своим домом 24/7</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Подберем подходящий вам вариант</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-center">Предчистовая отделка</h4>
              <ul className="space-y-2">
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>окна и входные двери</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>электрика</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>отопление с котлом и тёплыми полами</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>штукатурка стен, стяжка пола</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-center">Отделка под ключ</h4>
              <ul className="space-y-2">
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>межкомнатные двери</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>чистовая отделка стен, полов, потолка</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex justify-center">

            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="w-full rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300"
            >
              Спросить у специалиста
            </Button>

            <ContactDialog
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              source="howwebuild"
              title="Проконсультироваться у специалиста"
              description="Оставьте свои контактные данные и наш специалист свяжется с вами для консультации"
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
