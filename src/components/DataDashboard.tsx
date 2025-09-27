import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Thermometer, 
  Wind, 
  Leaf, 
  Cloud, 
  Activity,
  MapPin,
  Calendar,
  TrendingUp,
  Zap
} from "lucide-react";

const DataDashboard = () => {
  const [selectedInstrument, setSelectedInstrument] = useState("modis");

  const instruments = [
    {
      id: "modis",
      name: "MODIS",
      icon: Eye,
      description: "Land/Ocean/Atmosphere Monitoring",
      color: "text-primary",
      bgColor: "bg-primary/10",
      data: {
        temperature: 24.5,
        vegetation: 0.78,
        cloudCover: 35,
        status: "active"
      }
    },
    {
      id: "aster",
      name: "ASTER", 
      icon: Thermometer,
      description: "High-Resolution Land Surface Imaging",
      color: "text-thermal",
      bgColor: "bg-thermal/10",
      data: {
        surfaceTemp: 28.3,
        elevation: 156,
        mineralIndex: 0.42,
        status: "active"
      }
    },
    {
      id: "ceres",
      name: "CERES",
      icon: Zap,
      description: "Earth's Energy Budget",
      color: "text-accent",
      bgColor: "bg-accent/10",
      data: {
        solarRadiation: 340.2,
        energyFlux: 15.7,
        albedo: 0.31,
        status: "active"
      }
    },
    {
      id: "misr",
      name: "MISR",
      icon: Cloud,
      description: "Atmospheric Particles & Clouds",
      color: "text-atmospheric",
      bgColor: "bg-atmospheric/10",
      data: {
        aerosolDepth: 0.25,
        cloudHeight: 4.2,
        particleSize: 0.18,
        status: "active"
      }
    },
    {
      id: "mopitt",
      name: "MOPITT",
      icon: Wind,
      description: "Carbon Monoxide Monitoring",
      color: "text-success",
      bgColor: "bg-success/10",
      data: {
        coLevel: 120,
        airQuality: 85,
        pollutionIndex: 0.32,
        status: "active"
      }
    }
  ];

  const currentInstrument = instruments.find(i => i.id === selectedInstrument);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            <span className="terra-gradient-text">Live Data Stream</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time data from Terra's five instruments monitoring Earth's vital signs
          </p>
        </div>

        <Tabs value={selectedInstrument} onValueChange={setSelectedInstrument} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-card">
            {instruments.map((instrument) => {
              const Icon = instrument.icon;
              return (
                <TabsTrigger 
                  key={instrument.id} 
                  value={instrument.id}
                  className="data-visualization flex flex-col items-center p-4 h-auto"
                >
                  <Icon className={`w-6 h-6 mb-2 ${instrument.color}`} />
                  <span className="font-semibold">{instrument.name}</span>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {instrument.data.status}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {instruments.map((instrument) => {
            const Icon = instrument.icon;
            return (
              <TabsContent key={instrument.id} value={instrument.id} className="animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Data Card */}
                  <Card className="lg:col-span-2 terra-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-lg ${instrument.bgColor}`}>
                            <Icon className={`w-8 h-8 ${instrument.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-2xl">{instrument.name}</CardTitle>
                            <CardDescription className="text-base">
                              {instrument.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className="animate-pulse-data bg-success text-success-foreground">
                          Live
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Data Visualization Area */}
                        <div className="h-64 data-visualization rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Activity className="w-12 h-12 text-primary mx-auto mb-4 animate-data-flow" />
                            <p className="text-muted-foreground">
                              Interactive data visualization would render here
                            </p>
                          </div>
                        </div>

                        {/* Live Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          {instrument.id === "modis" && (
                            <>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Temperature</span>
                                  <span className="text-sm font-medium">{instrument.data.temperature}°C</span>
                                </div>
                                <Progress value={75} className="h-2" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Vegetation Index</span>
                                  <span className="text-sm font-medium">{instrument.data.vegetation}</span>
                                </div>
                                <Progress value={78} className="h-2" />
                              </div>
                            </>
                          )}
                          {instrument.id === "aster" && (
                            <>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Surface Temp</span>
                                  <span className="text-sm font-medium">{instrument.data.surfaceTemp}°C</span>
                                </div>
                                <Progress value={85} className="h-2" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Elevation</span>
                                  <span className="text-sm font-medium">{instrument.data.elevation}m</span>
                                </div>
                                <Progress value={60} className="h-2" />
                              </div>
                            </>
                          )}
                          {instrument.id === "ceres" && (
                            <>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Solar Radiation</span>
                                  <span className="text-sm font-medium">{instrument.data.solarRadiation} W/m²</span>
                                </div>
                                <Progress value={68} className="h-2" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Energy Flux</span>
                                  <span className="text-sm font-medium">{instrument.data.energyFlux} W/m²</span>
                                </div>
                                <Progress value={45} className="h-2" />
                              </div>
                            </>
                          )}
                          {instrument.id === "misr" && (
                            <>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Aerosol Depth</span>
                                  <span className="text-sm font-medium">{instrument.data.aerosolDepth}</span>
                                </div>
                                <Progress value={25} className="h-2" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Cloud Height</span>
                                  <span className="text-sm font-medium">{instrument.data.cloudHeight} km</span>
                                </div>
                                <Progress value={42} className="h-2" />
                              </div>
                            </>
                          )}
                          {instrument.id === "mopitt" && (
                            <>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">CO Level</span>
                                  <span className="text-sm font-medium">{instrument.data.coLevel} ppb</span>
                                </div>
                                <Progress value={60} className="h-2" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Air Quality</span>
                                  <span className="text-sm font-medium">{instrument.data.airQuality}/100</span>
                                </div>
                                <Progress value={85} className="h-2" />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Side Panel */}
                  <div className="space-y-6">
                    {/* Location Info */}
                    <Card className="terra-card">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <MapPin className="w-5 h-5 mr-2 text-primary" />
                          Current Location
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Latitude</span>
                            <span>23.8103°N</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Longitude</span>
                            <span>90.2667°E</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Region</span>
                            <span>Bangladesh</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Timeline */}
                    <Card className="terra-card">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <Calendar className="w-5 h-5 mr-2 text-accent" />
                          Data Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Mission Start</span>
                            <span>Dec 18, 1999</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Years Active</span>
                            <Badge variant="outline">25+ Years</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Last Update</span>
                            <span className="text-success">2 min ago</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Trends */}
                    <Card className="terra-card">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <TrendingUp className="w-5 h-5 mr-2 text-success" />
                          Recent Trends
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span>Temperature</span>
                            <Badge variant="outline" className="text-thermal">
                              +0.5°C ↑
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Vegetation</span>
                            <Badge variant="outline" className="text-success">
                              +0.12 ↑
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Air Quality</span>
                            <Badge variant="outline" className="text-atmospheric">
                              -5 pts ↓
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default DataDashboard;