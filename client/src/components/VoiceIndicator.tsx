import { Mic, MicOff } from "lucide-react";

interface VoiceIndicatorProps {
  isActive: boolean;
  level?: number;
}

export default function VoiceIndicator({ isActive, level = 0 }: VoiceIndicatorProps) {
  return (
    <div className="flex items-center gap-2" data-testid="component-voice-indicator">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
          isActive
            ? "bg-chart-3 text-white animate-pulse"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {isActive ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
      </div>
      
      {isActive && (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-1 rounded-full bg-chart-3 transition-all"
              style={{
                height: `${Math.random() * 16 + 8}px`,
                animation: `pulse ${0.5 + Math.random() * 0.5}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
