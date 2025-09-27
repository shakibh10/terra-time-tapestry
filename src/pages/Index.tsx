import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TerraHero from "@/components/TerraHero";
import DataDashboard from "@/components/DataDashboard";
import InstrumentOverview from "@/components/InstrumentOverview";
import { TerraAnimation } from "@/components/TerraAnimation";
import { terraApiService } from "@/services/nasaApi";
import { 
  Satellite, 
  MapPin, 
  Calendar,
  Globe,
  Activity,
  TrendingUp,
  Zap,
  AlertCircle
} from "lucide-react";

const Index = () => {
  const [liveData, setLiveData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time data updates
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        setIsLoading(true);
        const data = await terraApiService.getAllInstrumentData();
        setLiveData(data);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Failed to fetch live data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchLiveData();

    // Set up real-time updates every 2 minutes
    const interval = setInterval(fetchLiveData, 120000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <TerraHero />

      {/* Live Status Banner */}
      <section className="py-6 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse-data" />
                <span className="font-semibold">Terra Mission Status</span>
                <Badge className="bg-success text-success-foreground">ACTIVE</Badge>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Last Update: {lastUpdate.toLocaleTimeString()}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">Bangladesh Region</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-atmospheric" />
                <span className="text-sm">Global Coverage</span>
              </div>
              <Button variant="data" size="sm">
                <Activity className="w-4 h-4 mr-2" />
                View All Regions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Card className="terra-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary mb-1">
                  {isLoading ? "..." : "24.5°C"}
                </div>
                <div className="text-xs text-muted-foreground">Land Surface Temp</div>
              </CardContent>
            </Card>
            
            <Card className="terra-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-success mb-1">
                  {isLoading ? "..." : "0.78"}
                </div>
                <div className="text-xs text-muted-foreground">Vegetation Index</div>
              </CardContent>
            </Card>

            <Card className="terra-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-atmospheric mb-1">
                  {isLoading ? "..." : "35%"}
                </div>
                <div className="text-xs text-muted-foreground">Cloud Cover</div>
              </CardContent>
            </Card>

            <Card className="terra-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-thermal mb-1">
                  {isLoading ? "..." : "120"}
                </div>
                <div className="text-xs text-muted-foreground">CO Level (ppb)</div>
              </CardContent>
            </Card>

            <Card className="terra-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-accent mb-1">
                  {isLoading ? "..." : "340W"}
                </div>
                <div className="text-xs text-muted-foreground">Solar Radiation</div>
              </CardContent>
            </Card>

            <Card className="terra-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary mb-1">
                  {isLoading ? "..." : "0.25"}
                </div>
                <div className="text-xs text-muted-foreground">Aerosol Depth</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Instrument Overview */}
      <InstrumentOverview />

      {/* Data Dashboard */}
      <DataDashboard />

      {/* Interactive Terra Animation */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <TerraAnimation />
        </div>
      </section>

      {/* Mission Timeline Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="terra-gradient-text">25 Years</span> of Discovery
            </h2>
            <p className="text-xl text-muted-foreground">
              Key milestones in Terra's mission to understand Earth's changing climate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="terra-card">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-primary border-primary/20">1999-2005</Badge>
                  <Satellite className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Mission Launch & Calibration</CardTitle>
                <CardDescription>
                  Terra begins operations with all five instruments working in harmony
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• First global climate measurements</li>
                  <li>• Instrument calibration and validation</li>
                  <li>• Establishment of baseline data</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="terra-card">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-accent border-accent/20">2005-2015</Badge>
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Climate Change Detection</CardTitle>
                <CardDescription>
                  Documenting unprecedented changes in Earth's systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Arctic ice decline monitoring</li>
                  <li>• Deforestation tracking</li>
                  <li>• Urban heat island studies</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="terra-card">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-success border-success/20">2015-Present</Badge>
                  <Zap className="w-6 h-6 text-success" />
                </div>
                <CardTitle>Real-time Monitoring</CardTitle>
                <CardDescription>
                  Advanced analytics and rapid response to environmental changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• AI-powered data analysis</li>
                  <li>• Real-time disaster response</li>
                  <li>• Community impact assessment</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Environmental Alerts Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="terra-card border-thermal/30">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="w-8 h-8 text-thermal animate-pulse-data" />
                <div>
                  <CardTitle className="text-2xl">Environmental Alerts</CardTitle>
                  <CardDescription>Real-time monitoring of critical environmental changes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-thermal/10 rounded-lg border border-thermal/20">
                    <div>
                      <div className="font-semibold">Rising Surface Temperature</div>
                      <div className="text-sm text-muted-foreground">Bangladesh Region</div>
                    </div>
                    <Badge variant="outline" className="text-thermal border-thermal/30">+2.3°C</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-atmospheric/10 rounded-lg border border-atmospheric/20">
                    <div>
                      <div className="font-semibold">Air Quality Index</div>
                      <div className="text-sm text-muted-foreground">Urban Areas</div>
                    </div>
                    <Badge variant="outline" className="text-atmospheric border-atmospheric/30">Moderate</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
                    <div>
                      <div className="font-semibold">Vegetation Growth</div>
                      <div className="text-sm text-muted-foreground">Agricultural Areas</div>
                    </div>
                    <Badge variant="outline" className="text-success border-success/30">+15%</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div>
                      <div className="font-semibold">Cloud Formation</div>
                      <div className="text-sm text-muted-foreground">Monsoon Season</div>
                    </div>
                    <Badge variant="outline" className="text-primary border-primary/30">Active</Badge>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="thermal">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  View All Environmental Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50 bg-card/30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Satellite className="w-8 h-8 text-primary" />
              <div>
                <div className="font-bold text-lg">NASA Terra Mission</div>
                <div className="text-sm text-muted-foreground">25 Years of Earth Science Excellence</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© 2024 NASA Terra Data Visualization</span>
              <div className="w-px h-4 bg-border" />
              <span>Real-time data from NASA APIs</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;