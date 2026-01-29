import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/Container";

interface TeamMember {
  name: string;
  position: string;
}

const teamMembers: TeamMember[] = [
  { name: "Сергей Савченко", position: "руководитель компании" },
  { name: "Поддубский Артем Викторович", position: "Архитектор-проектировщик" },
  { name: "Зыбарев Игорь Владимирович", position: "Директор по строительству" },
  { name: "Савельев Сергей Сергеевич", position: "Старший прораб" },
  { name: "Савченко Никита", position: "Руководитель отдела маркетинга" },
  { name: "Мустафаев Алексей Анатольевич", position: "Руководитель по строительству. Каркасное направление." },
  { name: "Елина Ирина Владимировна", position: "Ипотечный и страховой брокер" },
  { name: "Колодько Екатерина Александровна", position: "Главный бухгалтер" },
  { name: "Колганова Марина Викторовна", position: "Руководитель по продажам" },
];

export default function TeamSection() {
  return (
    <section id="team" className="w-full py-16 bg-gray-50">
      <Container className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Наша команда</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Наша молодая, собранная из профессионалов, компания СвойДом-КРД.РФ занимается строительством частных домов в г. Краснодаре, Краснодарском Крае и Республике Адыгея
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="w-full max-w-sm">
              <div className="aspect-square bg-muted"></div>
              <CardHeader>
                <CardTitle className="text-lg text-center">{member.name}</CardTitle>
                <CardDescription className="text-center">{member.position}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
