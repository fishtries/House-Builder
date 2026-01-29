import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Container } from "@/components/Container";

interface Project {
  id: string;
  name: string;
  area: string;
  rooms: string;
  size: string;
  url: string;
}

interface ProjectsSectionProps {
  title: string;
  projects: Project[];
  viewAllLink?: string;
}

export default function ProjectsSection({ title, projects, viewAllLink }: ProjectsSectionProps) {
  return (
    <section className="w-full py-16 bg-gray-50 rounded-md">
      <Container className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">{title}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center max-w-7xl mx-auto">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow w-full max-w-sm">
              <div className="aspect-video bg-muted"></div>
              <CardHeader>
                <CardTitle className="text-lg text-center">{project.name}</CardTitle>
                <CardDescription>
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    <span className="text-sm">{project.area}</span>
                    <span className="text-sm">•</span>
                    <span className="text-sm">{project.rooms}</span>
                    <span className="text-sm">•</span>
                    <span className="text-sm">{project.size}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={project.url} className="flex justify-center">
                  <Button variant="outline" className="w-full">Подробнее</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        {viewAllLink && (
          <div className="mt-8 text-center">
            <Link href={viewAllLink}>
              <Button variant="outline">Все проекты каркасных домов</Button>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
