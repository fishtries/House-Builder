import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Container } from "@/components/Container";

interface Review {
  area: string;
  year: string;
  location: string;
  review: string;
}

const reviews: Review[] = [
  { area: "82 м²", year: "2025", location: "ст. Октябрьская", review: "Супер, построили дом без нервов и быстро)"},
  { area: "80 м²", year: "2023", location: "г. Краснодар", review: "Рекомендую всем!" },
  { area: "94 м²", year: "2021", location: "ст. Марьянская", review: "Я очень довольна работой и своим домом мечты" },
  { area: "100 м²", year: "2024", location: "ст. Челбасская", review: "Отлично и душевно" },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="w-full py-16">
      <Container className="container px-4 md:px-6">
        <Container className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Отзывы наших клиентов</h2>
          <p className="text-muted-foreground">C каждым из них вы можете поговорить лично - предоставим номера телефонов</p>
        </Container>
        <section className="bg-gray-50 rounded-md py-16">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 justify-items-center max-w-7xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow w-full max-w-sm">
                <div className="aspect-video bg-muted"></div>
                <CardContent className="p-4">
                  <div className="space-y-1 text-sm text-center">
                    <p><strong>Площадь:</strong> {review.area}</p>
                    <p><strong>Год постройки:</strong> {review.year}</p>
                    <p className="text-muted-foreground">{review.location}</p>
                    <p>{review.review}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="https://otzovik.com/review_15643462.html" target="_blank">
              <Button variant="outline">Смотреть все отзывы на otzovik.com</Button>
            </Link>
          </div>
        </section>
      </Container>
    </section>
  );
}
