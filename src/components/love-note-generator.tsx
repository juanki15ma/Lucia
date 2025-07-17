"use client";

import { useState } from "react";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { handleGenerateLoveNote } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

export default function LoveNoteGenerator() {
  const [loveNote, setLoveNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function generate() {
    setIsLoading(true);
    setLoveNote("");
    const result = await handleGenerateLoveNote();
    setIsLoading(false);

    if (result.success && result.data) {
      setLoveNote(result.data.loveNote);
    } else {
      toast({
        variant: "destructive",
        title: "¡Oh no! Algo salió mal.",
        description: result.error,
      });
    }
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-xl border border-accent/20">
      <CardHeader>
        <CardTitle className="font-headline text-primary flex items-center justify-center gap-2">
          <Wand2 className="w-6 h-6" />
          Generador de Piropos
        </CardTitle>
        <CardDescription className="font-body">
          Un pequeño generador de amor, para recordarte lo increíble que eres.
          ¡Pulsa el botón y deja que la magia suceda!
        </CardDescription>
      </CardHeader>
      <CardContent>
          <Button onClick={generate} disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inspirándome...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generar Mensaje para Lucía
              </>
            )}
          </Button>
      </CardContent>
      {loveNote && (
        <CardFooter className="mt-6">
          <Card className="w-full bg-background/50 border-accent/30">
            <CardHeader>
              <CardTitle className="text-accent flex items-center gap-2 font-headline">
                <Sparkles className="w-5 h-5"/>
                Para ti, Lucía:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-body text-lg italic whitespace-pre-wrap">{loveNote}</p>
            </CardContent>
          </Card>
        </CardFooter>
      )}
    </Card>
  );
}
