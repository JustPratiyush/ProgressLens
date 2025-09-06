"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Target, Clock } from "lucide-react";
import { toast } from "sonner";

export function ModelOverview() {
  const handleRetrain = () => {
    const promise = () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ name: "Model Retrained" }), 3000)
      );
    toast.promise(promise, {
      loading: "Model training in progress...",
      success: "Model successfully retrained with the latest data!",
      error: "Error retraining model.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Prediction Model Overview</CardTitle>
            <CardDescription>
              Status and details of the dropout prediction model.
            </CardDescription>
          </div>
          <Button onClick={handleRetrain}>
            <Zap className="mr-2 h-4 w-4" />
            Re-train Model
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <p className="font-semibold text-lg">88.4%</p>
              <p className="text-muted-foreground">Model Accuracy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-blue-500" />
            <div>
              <p className="font-semibold text-lg">Dropout</p>
              <p className="text-muted-foreground">Prediction Target</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-gray-500" />
            <div>
              <p className="font-semibold text-lg">Sept 1, 2025</p>
              <p className="text-muted-foreground">Last Trained</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
