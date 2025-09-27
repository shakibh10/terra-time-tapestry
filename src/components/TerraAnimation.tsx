import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, FastForward, Calendar, Globe2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { TerraMap } from './TerraMap';
import { EnvironmentalCharts } from './EnvironmentalCharts';
import { terraApiService } from '@/services/nasaApi';

interface TimePoint {
  year: number;
  month: number;
  date: string;
  data: any;
}

export const TerraAnimation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [terraData, setTerraData] = useState<TimePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState({ latitude: 23.8103, longitude: 90.2667 });
  const [environmentalStory, setEnvironmentalStory] = useState('monsoon');

  // Generate 25 years of timeline data (2000-2025)
  const generateTimeline = useCallback(() => {
    const timeline: TimePoint[] = [];
    const startYear = 2000;
    const endYear = 2025;
    
    for (let year = startYear; year <= endYear; year++) {
      for (let month = 1; month <= 12; month++) {
        timeline.push({
          year,
          month,
          date: `${year}-${month.toString().padStart(2, '0')}-01`,
          data: null
        });
      }
    }
    
    return timeline;
  }, []);

  // Load Terra data for animation
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const timeline = generateTimeline();
      
      // Load data for key time points
      const dataPromises = timeline.map(async (point, index) => {
        if (index % 6 === 0) { // Load every 6 months to optimize performance
          try {
            const data = await terraApiService.getAllInstrumentData(selectedLocation);
            return { ...point, data };
          } catch (error) {
            console.error(`Failed to load data for ${point.date}:`, error);
            return point;
          }
        }
        return point;
      });

      const timelineWithData = await Promise.all(dataPromises);
      setTerraData(timelineWithData);
      setLoading(false);
    };

    loadData();
  }, [selectedLocation, generateTimeline]);

  // Animation playback control
  useEffect(() => {
    if (!isPlaying || terraData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentTimeIndex(prev => {
        if (prev >= terraData.length - 1) {
          setIsPlaying(false);
          return terraData.length - 1;
        }
        return prev + 1;
      });
    }, 500 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, terraData.length]);

  const currentData = terraData[currentTimeIndex];
  const progressPercent = terraData.length > 0 ? (currentTimeIndex / (terraData.length - 1)) * 100 : 0;

  const handlePlay = () => setIsPlaying(!isPlaying);
  const handleReset = () => {
    setCurrentTimeIndex(0);
    setIsPlaying(false);
  };

  const handleTimelineChange = (value: number[]) => {
    setCurrentTimeIndex(value[0]);
    setIsPlaying(false);
  };

  const environmentalStories = [
    { id: 'monsoon', name: 'Monsoon Patterns', icon: '🌧️' },
    { id: 'fires', name: 'Forest Fires', icon: '🔥' },
    { id: 'pollution', name: 'Air Quality', icon: '💨' },
    { id: 'vegetation', name: 'Vegetation Health', icon: '🌱' },
    { id: 'temperature', name: 'Climate Change', icon: '🌡️' }
  ];

  if (loading) {
    return (
      <Card className="w-full h-[800px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Globe2 className="w-16 h-16 animate-spin mx-auto text-primary" />
          <h3 className="text-xl font-semibold">Loading 25 Years of Terra Data</h3>
          <p className="text-muted-foreground">Preparing environmental animation...</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Terra's 25-Year Earth Story
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Witness environmental changes through animated satellite data from December 1999 to September 2025
        </p>
      </motion.div>

      {/* Story Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe2 className="w-5 h-5" />
            Environmental Stories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {environmentalStories.map((story) => (
              <Button
                key={story.id}
                variant={environmentalStory === story.id ? "default" : "outline"}
                onClick={() => setEnvironmentalStory(story.id)}
                className="flex items-center gap-2"
              >
                <span>{story.icon}</span>
                {story.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Animation Interface */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="grid lg:grid-cols-3 gap-0 h-[600px]">
            {/* Map Visualization */}
            <div className="lg:col-span-2 relative">
              <TerraMap
                data={currentData?.data}
                location={selectedLocation}
                onLocationChange={setSelectedLocation}
                story={environmentalStory}
              />
              
              {/* Timeline Overlay */}
              <div className="absolute top-4 left-4 right-4">
                <motion.div
                  layout
                  className="bg-background/90 backdrop-blur-md rounded-lg p-4 shadow-lg border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-semibold">
                        {currentData ? `${currentData.year}-${currentData.month.toString().padStart(2, '0')}` : 'Loading...'}
                      </span>
                    </div>
                    <Badge variant="secondary">
                      Year {currentData?.year || 2000} of 25
                    </Badge>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>2000</span>
                      <span>{Math.round(progressPercent)}% Complete</span>
                      <span>2025</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Charts Panel */}
            <div className="bg-muted/30 p-4 overflow-y-auto">
              <EnvironmentalCharts
                timelineData={terraData.slice(0, currentTimeIndex + 1)}
                currentData={currentData?.data}
                story={environmentalStory}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Animation Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Timeline Scrubber */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Timeline Navigation</label>
              <Slider
                value={[currentTimeIndex]}
                onValueChange={handleTimelineChange}
                max={terraData.length - 1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Dec 1999</span>
                <span>Sep 2025</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
              
              <Button onClick={handlePlay} size="lg" className="px-8">
                {isPlaying ? (
                  <Pause className="w-5 h-5 mr-2" />
                ) : (
                  <Play className="w-5 h-5 mr-2" />
                )}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>

              <div className="flex items-center gap-2">
                <FastForward className="w-4 h-4" />
                <Slider
                  value={[playbackSpeed]}
                  onValueChange={(value) => setPlaybackSpeed(value[0])}
                  min={0.5}
                  max={3}
                  step={0.5}
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground min-w-[2rem]">
                  {playbackSpeed}x
                </span>
              </div>
            </div>

            {/* Story Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={environmentalStory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  {environmentalStory === 'monsoon' && "Track monsoon intensity, rainfall patterns, and seasonal changes across South Asia over 25 years."}
                  {environmentalStory === 'fires' && "Monitor forest fire frequency, intensity, and recovery patterns globally using FIRMS active fire data."}
                  {environmentalStory === 'pollution' && "Observe air quality changes, CO concentrations, and pollution trends in major urban areas."}
                  {environmentalStory === 'vegetation' && "Watch vegetation health, NDVI changes, and ecosystem responses to climate variations."}
                  {environmentalStory === 'temperature' && "Visualize land surface temperature trends and climate change impacts over two decades."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};