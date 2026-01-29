"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import ContactDialog from "@/components/ContactDialog";

export default function MortgageSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFormSubmit = (data: { name: string; phone: string; email: string }) => {
    console.log("Mortgage consultation request:", data);
  };

  return (
    <section className="relative w-full py-16 bg-white ">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Все сложности ипотеки возьмем на себя</h2>
            <h3 className="text-xl font-semibold text-primary">Помощь в получении ипотеки - БЕСПЛАТНО</h3>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2 mb-8">
              
              <div className="p-6 bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300">
                <p className="text-lg font-semibold text-center">Расскажем обо всех тонкостях льготных программ:</p>
                <ul className="space-y-2 py-2">
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>сельская ипотека — от 2,7% годовых</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>семейная ипотека — от 6% годовых</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>IT ипотека — от 5% годовых</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300">
                <p className="text-lg font-semibold text-center">Знаем, как действовать даже в сложных случаях:</p>
                <ul className="space-y-2 py-2">
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    <span>нет первоначального взноса</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    <span>нет поручителя</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    <span>уже получили отказ в ипотеке</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    <span>нет официального дохода</span>
                  </li>
                </ul>
              </div>
              
            </div>
            
          <div className="space-y-6 flex items-center justify-center ">
            <Card className="w-200">
              <CardHeader>
                <CardTitle className="text-center">Мы - аккредитованные партнеры ведущих банков</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300"
                >
                  Консультация специалиста по ипотеке
                </Button>

                <ContactDialog
                  open={isDialogOpen}
                  onOpenChange={setIsDialogOpen}
                  title="Консультация специалиста по ипотеке"
                  description="Оставьте свои контактные данные и наш специалист свяжется с вами для консультации"
                  onSubmit={handleFormSubmit}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
