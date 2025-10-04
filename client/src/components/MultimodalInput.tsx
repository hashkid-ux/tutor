import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Mic, MonitorPlay, Send } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface MultimodalInputProps {
  onSend?: (message: string) => void;
  onVoiceToggle?: () => void;
  onImageUpload?: (file: File) => void;
  onScreenShare?: () => void;
}

export default function MultimodalInput({
  onSend,
  onVoiceToggle,
  onImageUpload,
  onScreenShare,
}: MultimodalInputProps) {
  const [message, setMessage] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message);
      setMessage("");
    }
  };

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
    onVoiceToggle?.();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload?.(file);
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-lg border bg-card p-2" data-testid="component-multimodal-input">
      <div className="flex gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={isVoiceActive ? "bg-chart-3 text-white" : ""}
              onClick={handleVoiceToggle}
              data-testid="button-voice-toggle"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Voice input</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => document.getElementById("image-upload")?.click()}
              data-testid="button-image-upload"
            >
              <Image className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Upload image</TooltipContent>
        </Tooltip>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onScreenShare}
              data-testid="button-screen-share"
            >
              <MonitorPlay className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share screen</TooltipContent>
        </Tooltip>
      </div>

      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask anything or describe what you need help with..."
        className="flex-1 border-0 bg-transparent focus-visible:ring-0"
        data-testid="input-message"
      />

      <Button
        size="icon"
        onClick={handleSend}
        disabled={!message.trim()}
        data-testid="button-send"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
