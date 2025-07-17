"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2 h-5 w-5"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  );

const ShareButton = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    // This ensures window is available and runs only on the client
    setUrl(window.location.href);
  }, []);

  const handleShare = () => {
    if (!url) return;
    const message = `Lucía, tengo una sorpresa muy especial para ti: ${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      onClick={handleShare}
      disabled={!url}
      size="lg"
      className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 py-6 text-lg font-bold shadow-lg transform hover:scale-105 transition-transform"
    >
      <WhatsAppIcon />
      Enviar invitación a Lucía por WhatsApp
    </Button>
  );
};

export default ShareButton;
