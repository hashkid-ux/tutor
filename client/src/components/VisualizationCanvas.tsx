import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize2, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

interface VisualizationCanvasProps {
  title: string;
  description: string;
}

export default function VisualizationCanvas({
  title,
  description,
}: VisualizationCanvasProps) {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  return (
    <Card className="overflow-hidden" data-testid="component-visualization-canvas">
      <div className="border-b bg-muted/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Button variant="outline" size="icon" data-testid="button-fullscreen">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative aspect-video bg-gradient-to-br from-primary/5 via-chart-2/5 to-chart-4/5 p-6">
        <div className="flex h-full items-center justify-center">
          <div
            className="relative h-32 w-32 rounded-lg bg-gradient-to-br from-primary to-chart-2 shadow-xl transition-all duration-500"
            style={{
              transform: `rotate(${rotation}deg) scale(${zoom})`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <p className="text-sm font-mono">3D Model</p>
                <p className="text-xs opacity-70">Interactive</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-lg bg-background/90 p-2 shadow-lg backdrop-blur">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setRotation(rotation + 45)}
            data-testid="button-rotate"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
            data-testid="button-zoom-in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
            data-testid="button-zoom-out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
