"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣"];

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

export default function SlotMachine() {
  const [reels, setReels] = useState<string[]>([
    getRandomSymbol(),
    getRandomSymbol(),
    getRandomSymbol(),
  ]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const newReels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    setReels(newReels);
    setTimeout(() => {
      setSpinning(false);
      const win = newReels.every((s) => s === newReels[0]);
      setResult(win ? "You won! 🎉" : "Try again! 😿");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <h2 className="text-xl font-semibold">Kitty Slot Machine</h2>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="flex space-x-2 text-4xl">
          {reels.map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
        <Button onClick={spin} disabled={spinning} variant="outline">
          {spinning ? "Spinning..." : "Spin"}
        </Button>
        {result && (
          <p className={cn("mt-4 text-lg", result.includes("won") ? "text-green-600" : "text-red-600")}>
            {result}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
