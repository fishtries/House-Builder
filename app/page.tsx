import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MortgageSection from "@/components/MortgageSection";
import ProjectsSection from "@/components/ProjectsSection";
import ReviewsSection from "@/components/ReviewsSection";
import HowWeBuildSection from "@/components/HowWeBuildSection";
import ObjectsGallery from "@/components/ObjectsGallery";
import SocialSection from "@/components/SocialSection";
import TeamSection from "@/components/TeamSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Container } from "@/components/Container";

// Popular projects
const popularProjects = [
  {
    id: "pd911",
    name: "Проект Pd911",
    area: "100 м²",
    rooms: "4 комнаты",
    size: "13x12м",
    url: "#",
  },
  {
    id: "pr826",
    name: "Проект Pr826",
    area: "81.1 м²",
    rooms: "3 комнаты",
    size: "10.4x9.5м",
    url: "#",
  },
  {
    id: "pr273k",
    name: "Проект Pr273k",
    area: "98.03 м²",
    rooms: "3 комнаты",
    size: "12.62x10.92м",
    url: "#",
  },
];

// Stone house projects
const stoneProjects = [
  {
    id: "pd1136",
    name: "Проект Pd1136",
    area: "61.14 м²",
    rooms: "2 комнаты",
    size: "7.85x9.25м",
    url: "#",
  },
  {
    id: "pd1128",
    name: "Проект Pd1128",
    area: "94.71 м²",
    rooms: "3 комнаты",
    size: "13x9.1м",
    url: "#",
  },
  {
    id: "pd1103",
    name: "Проект Pd1103",
    area: "86.73 м²",
    rooms: "3 комнаты",
    size: "11.71x8.75м",
    url: "#",
  },
  {
    id: "pd1140",
    name: "Проект Pd1140",
    area: "83.34 м²",
    rooms: "3 комнаты",
    size: "9.5x11.3м",
    url: "#",
  },
];

// Frame house projects
const frameProjects = [
  {
    id: "krylatyj",
    name: "Проект Крылатый",
    area: "67.8 м²",
    rooms: "2 комнаты",
    size: "10.23x8.23м",
    url: "#",
  },
  {
    id: "fjord",
    name: "Проект Фьорд",
    area: "50.8 м²",
    rooms: "2 комнаты",
    size: "9.03x7м",
    url: "#",
  },
  {
    id: "denver",
    name: "Проект Денвер",
    area: "82.9 м²",
    rooms: "3 комнаты",
    size: "12.16x8.16м",
    url: "#",
  },
  {
    id: "orenburg",
    name: "Проект Оренбург",
    area: "79.5 м²",
    rooms: "3 комнаты",
    size: "11.24x10.12м",
    url: "#",
  },
  {
    id: "kreva",
    name: "Проект Крева",
    area: "110.9 м²",
    rooms: "3 комнаты",
    size: "14.26x13.41м",
    url: "#",
  },
  {
    id: "zebrano",
    name: "Проект Зебрано",
    area: "84.6 м²",
    rooms: "3 комнаты",
    size: "13.37x7.61м",
    url: "#",
  },
  {
    id: "saratov",
    name: "Проект Саратов",
    area: "59.6 м²",
    rooms: "2 комнаты",
    size: "12.14x6.24м",
    url: "#",
  },
  {
    id: "balashiha",
    name: "Проект Балашиха",
    area: "96.7 м²",
    rooms: "3 комнаты",
    size: "10.79x10.85м",
    url: "#",
  },
  {
    id: "vyborg",
    name: "Проект Выборг",
    area: "68.7 м²",
    rooms: "3 комнаты",
    size: "13.98x8.74м",
    url: "#",
  },
  {
    id: "barn-eragon",
    name: "Проект БарнЭрагон",
    area: "111.4 м²",
    rooms: "3 комнаты",
    size: "9.25x14.57м",
    url: "#",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <MortgageSection />

        <section id="projects" className="w-full py-16 bg-white">
          <Container className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
              Выбирайте дом своей мечты из 1800 проектов на нашем сайте
            </h2>
            <ProjectsSection
              title="Проекты - выбор наших клиентов"
              projects={popularProjects}
            />
          </Container>
        </section>
        <ProjectsSection
          title="Рекомендованные проекты каменных домов"
          projects={stoneProjects}
        />
        <ProjectsSection
          title="Рекомендованные проекты каркасных домов"
          projects={frameProjects}
          viewAllLink="#"
        />
        <ReviewsSection />
        <HowWeBuildSection />
        <ObjectsGallery />
        <TeamSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
