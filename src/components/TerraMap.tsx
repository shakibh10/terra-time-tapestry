import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Thermometer, Droplets, Wind, Flame, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TerraMapProps {
  data: any;
  location: { latitude: number; longitude: number };
  onLocationChange: (location: { latitude: number; longitude: number }) => void;
  story: string;
}

export const TerraMap: React.FC<TerraMapProps> = ({ 
  data, 
  location, 
  onLocationChange, 
  story 
}) => {
  // Simulate world map with environmental overlays
  const environmentalLayers = useMemo(() => {
    if (!data) return [];

    const layers = [];
    
    // Generate simulated environmental data points based on story type
    switch (story) {
      case 'monsoon':
        // Simulate rainfall and cloud cover data points
        for (let i = 0; i < 20; i++) {
          layers.push({
            type: 'rainfall',
            latitude: 10 + Math.random() * 30,
            longitude: 70 + Math.random() * 40,
            intensity: data.modis?.cloud_cover || Math.random() * 100,
            icon: Droplets,
            color: 'text-blue-400'
          });
        }
        break;
        
      case 'fires':
        // Simulate active fire points
        if (data.fires) {
          data.fires.forEach((fire: any, index: number) => {
            layers.push({
              type: 'fire',
              latitude: parseFloat(fire.latitude) || (Math.random() * 180 - 90),
              longitude: parseFloat(fire.longitude) || (Math.random() * 360 - 180),
              intensity: fire.brightness || Math.random() * 400 + 300,
              icon: Flame,
              color: 'text-red-500'
            });
          });
        }
        break;
        
      case 'pollution':
        // Simulate CO concentration points
        for (let i = 0; i < 15; i++) {
          layers.push({
            type: 'pollution',
            latitude: Math.random() * 60 + 10,
            longitude: Math.random() * 120 - 60,
            intensity: data.mopitt?.co_concentration || Math.random() * 200 + 50,
            icon: Wind,
            color: 'text-yellow-500'
          });
        }
        break;
        
      case 'vegetation':
        // Simulate NDVI vegetation health
        for (let i = 0; i < 25; i++) {
          layers.push({
            type: 'vegetation',
            latitude: Math.random() * 120 - 60,
            longitude: Math.random() * 360 - 180,
            intensity: data.modis?.vegetation_index || Math.random(),
            icon: Leaf,
            color: 'text-green-500'
          });
        }
        break;
        
      case 'temperature':
        // Simulate temperature anomalies
        for (let i = 0; i < 30; i++) {
          layers.push({
            type: 'temperature',
            latitude: Math.random() * 180 - 90,
            longitude: Math.random() * 360 - 180,
            intensity: data.modis?.temperature || Math.random() * 50 - 10,
            icon: Thermometer,
            color: 'text-orange-500'
          });
        }
        break;
    }
    
    return layers;
  }, [data, story]);

  // Simulate world map grid
  const generateWorldMap = () => {
    const continents = [
      // North America
      { name: 'North America', x: 20, y: 25, w: 25, h: 20 },
      // South America  
      { name: 'South America', x: 25, y: 50, w: 15, h: 25 },
      // Europe
      { name: 'Europe', x: 48, y: 20, w: 12, h: 15 },
      // Africa
      { name: 'Africa', x: 48, y: 35, w: 15, h: 30 },
      // Asia
      { name: 'Asia', x: 60, y: 15, w: 30, h: 25 },
      // Australia
      { name: 'Australia', x: 75, y: 60, w: 12, h: 8 }
    ];

    return continents;
  };

  const continents = generateWorldMap();

  const handleMapClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    // Convert SVG coordinates to lat/lng (simplified)
    const latitude = 90 - (y * 1.8);
    const longitude = (x * 3.6) - 180;
    
    onLocationChange({ latitude, longitude });
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-space-dark to-space-darker">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* World Map SVG */}
      <svg
        className="w-full h-full cursor-crosshair"
        viewBox="0 0 100 60"
        onClick={handleMapClick}
      >
        {/* Continents */}
        {continents.map((continent, index) => (
          <motion.rect
            key={continent.name}
            x={continent.x}
            y={continent.y}
            width={continent.w}
            height={continent.h}
            rx="2"
            className="fill-primary/20 stroke-primary/40 stroke-[0.2]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ fill: 'rgba(var(--primary), 0.3)' }}
          />
        ))}

        {/* Environmental Data Points */}
        {environmentalLayers.map((point, index) => {
          const x = ((point.longitude + 180) / 360) * 100;
          const y = ((90 - point.latitude) / 180) * 60;
          
          return (
            <motion.g key={`${point.type}-${index}`}>
              <motion.circle
                cx={x}
                cy={y}
                r="0.5"
                className="fill-current opacity-80"
                style={{ color: point.color.replace('text-', '') }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 1], 
                  opacity: [0, 0.8, 0.6] 
                }}
                transition={{ 
                  delay: index * 0.05, 
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r="1.5"
                className="fill-none stroke-current opacity-40"
                style={{ color: point.color.replace('text-', '') }}
                strokeWidth="0.1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [1, 2, 3], 
                  opacity: [0.4, 0.2, 0] 
                }}
                transition={{ 
                  delay: index * 0.05 + 0.5, 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            </motion.g>
          );
        })}

        {/* Selected Location Marker */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <circle
            cx={((location.longitude + 180) / 360) * 100}
            cy={((90 - location.latitude) / 180) * 60}
            r="1"
            className="fill-accent stroke-accent-foreground"
            strokeWidth="0.2"
          />
          <motion.circle
            cx={((location.longitude + 180) / 360) * 100}
            cy={((90 - location.latitude) / 180) * 60}
            r="2"
            className="fill-none stroke-accent"
            strokeWidth="0.1"
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>
      </svg>

      {/* Location Info Panel */}
      <motion.div
        className="absolute top-4 right-4 bg-background/90 backdrop-blur-md rounded-lg p-4 shadow-lg border max-w-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="font-medium">Selected Location</span>
        </div>
        
        <div className="text-sm space-y-1 text-muted-foreground">
          <div>Latitude: {location.latitude.toFixed(4)}°</div>
          <div>Longitude: {location.longitude.toFixed(4)}°</div>
        </div>

        {data && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium">Current Measurements</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {story === 'temperature' && data.modis && (
                <Badge variant="outline" className="justify-start">
                  <Thermometer className="w-3 h-3 mr-1" />
                  {data.modis.temperature?.toFixed(1)}°C
                </Badge>
              )}
              {story === 'monsoon' && data.modis && (
                <Badge variant="outline" className="justify-start">
                  <Droplets className="w-3 h-3 mr-1" />
                  {data.modis.cloud_cover?.toFixed(0)}%
                </Badge>
              )}
              {story === 'pollution' && data.mopitt && (
                <Badge variant="outline" className="justify-start">
                  <Wind className="w-3 h-3 mr-1" />
                  {data.mopitt.co_concentration?.toFixed(0)} ppb
                </Badge>
              )}
              {story === 'vegetation' && data.modis && (
                <Badge variant="outline" className="justify-start">
                  <Leaf className="w-3 h-3 mr-1" />
                  {data.modis.vegetation_index?.toFixed(2)} NDVI
                </Badge>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Legend */}
      <motion.div
        className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md rounded-lg p-3 shadow-lg border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h4 className="text-sm font-medium mb-2">Environmental Data</h4>
        <div className="flex items-center gap-4 text-xs">
          {story === 'fires' && (
            <div className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-red-500" />
              <span>Active Fires</span>
            </div>
          )}
          {story === 'monsoon' && (
            <div className="flex items-center gap-1">
              <Droplets className="w-3 h-3 text-blue-400" />
              <span>Rainfall</span>
            </div>
          )}
          {story === 'pollution' && (
            <div className="flex items-center gap-1">
              <Wind className="w-3 h-3 text-yellow-500" />
              <span>CO Levels</span>
            </div>
          )}
          {story === 'vegetation' && (
            <div className="flex items-center gap-1">
              <Leaf className="w-3 h-3 text-green-500" />
              <span>Vegetation</span>
            </div>
          )}
          {story === 'temperature' && (
            <div className="flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-orange-500" />
              <span>Temperature</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};