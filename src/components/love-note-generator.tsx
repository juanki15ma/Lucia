"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Send, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { handleGenerateLoveNote } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  personName: z.string().default("Lucia"),
  relationship: z.string().min(1, "Dime, ¿qué soy para ti? (ej. novia, amor de mi vida)"),
  occasion: z.string().min(1, "¿Cuál es la ocasión especial? (ej. nuestra cita, un día cualquiera)"),
  aspects: z.string().min(1, "Cuéntame qué te gusta de mí (ej. tu sonrisa, tu inteligencia)"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoveNoteGenerator() {
  const [loveNote, setLoveNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personName: "Lucia",
      relationship: "",
      occasion: "",
      aspects: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setLoveNote("");
    const result = await handleGenerateLoveNote(values);
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
          ¡Completa los campos y deja que la magia suceda!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tu Relación Conmigo</FormLabel>
                    <FormControl>
                      <Input placeholder="Mi novia increíble..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="occasion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>La Ocasión</FormLabel>
                    <FormControl>
                      <Input placeholder="Proponerte una cita..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="aspects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cosas que Amas de Mí</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tu forma de hacerme reír, tu inteligencia..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inspirándome...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Generar Mensaje
                </>
              )}
            </Button>
          </form>
        </Form>
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
