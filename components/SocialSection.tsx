import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function SocialSection() {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Мы в соц. сетях</CardTitle>
            <CardDescription className="text-center">
              Новости, отчеты с объектов, обсуждения. Заходите в гости - у нас интересно
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 justify-center">
              <Link href="https://vk.com/svoydom_krd" target="_blank">
                <Button variant="outline" size="lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Открыть группу ВК
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
