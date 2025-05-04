
import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Progress } from '@/components/ui/progress';

interface ModelLoaderProps {
  onModelLoaded: (model: tf.LayersModel) => void;
  modelPath: string;
}

const ModelLoader = ({ onModelLoaded, modelPath }: ModelLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        // Reset states
        setProgress(0);
        setError(null);

        // Load the model with progress tracking
        const model = await tf.loadLayersModel(modelPath, {
          onProgress: (fraction) => {
            setProgress(Math.round(fraction * 100));
          },
        });

        // Call the callback with the loaded model
        onModelLoaded(model);
      } catch (err) {
        console.error('Error loading model:', err);
        setError('Failed to load the diagnosis model. Please refresh and try again.');
      }
    };

    loadModel();
  }, [modelPath, onModelLoaded]);

  if (error) {
    return (
      <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-white">
        <p className="font-medium mb-2">Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm text-white/70">
        <span>Loading diagnosis model...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
};

export default ModelLoader;
