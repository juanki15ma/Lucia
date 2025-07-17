import { Heart, UtensilsCrossed, CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Countdown from "@/components/countdown";
import LoveNoteGenerator from "@/components/love-note-generator";
import ShareButton from "@/components/share-button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-background z-0">
        <Image 
          src="https://placehold.co/1920x1080.png" 
          alt="Romantic background"
          data-ai-hint="romantic dinner"
          layout="fill"
          objectFit="cover"
          className="opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
        <div className="w-full max-w-4xl mx-auto space-y-12 text-center">
          <header className="relative animate-fade-in-down">
            <h1 className="text-5xl md:text-7xl font-headline text-primary italic">
              Para Mi Querida Lucía
            </h1>
            <Heart className="absolute -top-4 -right-4 w-10 h-10 text-primary/50 animate-pulse" />
          </header>

          <section className="bg-card/80 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-xl border border-accent/20 animate-fade-in-up">
            <div className="flex flex-col items-center space-y-6">
              <UtensilsCrossed className="w-16 h-16 text-accent" />
              <h2 className="text-3xl md:text-4xl font-headline text-primary">
                ¿Me harías el honor?
              </h2>
              <p className="font-body text-lg max-w-2xl text-foreground/80">
                He estado pensando en ti y en lo mucho que me gustaría compartir un momento especial. 
                Por eso, quiero invitarte a una cena romántica en...
              </p>
              <div className="py-4">
                <h3
                  className="text-4xl md:text-6xl font-headline text-accent font-bold tracking-wider"
                  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}
                >
                  Chifle Pizza
                </h3>
              </div>
              <p className="font-body text-lg max-w-2xl text-foreground/80">
                ... un rincón de Italia solo para nosotros dos. ¿Aceptas?
              </p>
            </div>
          </section>

          <section className="animate-fade-in-up animation-delay-300">
            <Card className="max-w-md mx-auto bg-card/80 backdrop-blur-sm shadow-xl border border-accent/20">
              <CardHeader>
                <CardTitle className="font-headline text-primary flex items-center justify-center gap-2">
                  <CalendarClock className="w-6 h-6" />
                  Cuenta Regresiva Para Nuestra Cita
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Countdown />
              </CardContent>
            </Card>
          </section>

          <section className="animate-fade-in-up animation-delay-500">
            <LoveNoteGenerator />
          </section>

          <footer className="pt-8 animate-fade-in-up animation-delay-700">
            <ShareButton />
          </footer>
        </div>
      </main>
    </div>
  );
}
