import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Thermometer, 
  Zap, 
  Cloud, 
  Wind,
  Globe,
  Satellite,
  BarChart3
} from "lucide-react";

const InstrumentOverview = () => {
  const instruments = [
    {
      name: "MODIS",
      fullName: "Moderate Resolution Imaging Spectroradiometer",
      icon: Eye,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      description: "Monitors land, ocean, and atmospheric conditions with 36 spectral bands",
      capabilities: [
        "Vegetation indices (NDVI, EVI)",
        "Land surface temperature",
        "Ocean color and productivity", 
        "Cloud properties and coverage",
        "Fire detection and mapping"
      ],
      keyStats: {
        resolution: "250m - 1km",
        coverage: "Global",
        revisit: "1-2 days"
      }
    },
    {
      name: "ASTER",
      fullName: "Advanced Spaceborne Thermal Emission and Reflection Radiometer",
      icon: Thermometer,
      color: "text-thermal",
      bgColor: "bg-thermal/10",
      borderColor: "border-thermal/20",
      description: "High-resolution imaging for detailed land surface analysis",
      capabilities: [
        "Surface temperature mapping",
        "Digital elevation models",
        "Mineral and rock mapping",
        "Volcanic monitoring",
        "Land use classification"
      ],
      keyStats: {
        resolution: "15m - 90m",
        coverage: "On-demand",
        revisit: "16 days"
      }
    },
    {
      name: "CERES",
      fullName: "Clouds and Earth's Radiant Energy System",
      icon: Zap,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
      description: "Measures Earth's energy budget and climate forcing",
      capabilities: [
        "Solar radiation measurement",
        "Earth's energy balance",
        "Cloud radiative effects",
        "Atmospheric heating rates",
        "Climate sensitivity analysis"
      ],
      keyStats: {
        resolution: "20km",
        coverage: "Global",
        revisit: "Continuous"
      }
    },
    {
      name: "MISR",
      fullName: "Multi-angle Imaging SpectroRadiometer",
      icon: Cloud,
      color: "text-atmospheric",
      bgColor: "bg-atmospheric/10",
      borderColor: "border-atmospheric/20",
      description: "Multi-angle observations for atmospheric particle analysis",
      capabilities: [
        "Aerosol optical depth",
        "Cloud height and motion",
        "Surface albedo patterns",
        "Particle size distribution",
        "Atmospheric correction"
      ],
      keyStats: {
        resolution: "275m - 1.1km",
        coverage: "Global",
        revisit: "9 days"
      }
    },
    {
      name: "MOPITT",
      fullName: "Measurements of Pollution in the Troposphere",
      icon: Wind,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      description: "Monitors carbon monoxide in Earth's atmosphere",
      capabilities: [
        "CO concentration profiles",
        "Air quality assessment",
        "Pollution source tracking",
        "Biomass burning emissions",
        "Urban air quality monitoring"
      ],
      keyStats: {
        resolution: "22km x 22km",
        coverage: "Global",
        revisit: "3 days"
      }
    }
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Satellite className="w-10 h-10 text-primary mr-3" />
            <Badge variant="outline" className="text-lg px-4 py-2">
              5 Instruments
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Terra's <span className="terra-gradient-text">Scientific Arsenal</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each instrument aboard Terra provides unique insights into our planet's systems. 
            Together, they create a comprehensive view of Earth's changing environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {instruments.map((instrument, index) => {
            const Icon = instrument.icon;
            return (
              <Card 
                key={instrument.name}
                className={`terra-card border-2 ${instrument.borderColor} hover:scale-105 transition-transform duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-4 rounded-xl ${instrument.bgColor}`}>
                      <Icon className={`w-8 h-8 ${instrument.color}`} />
                    </div>
                    <Badge className="animate-pulse-data bg-success text-success-foreground">
                      Active
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{instrument.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium mb-3">
                    {instrument.fullName}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {instrument.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Key Statistics */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Resolution</div>
                      <div className="font-semibold text-sm">{instrument.keyStats.resolution}</div>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Coverage</div>
                      <div className="font-semibold text-sm">{instrument.keyStats.coverage}</div>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Revisit</div>
                      <div className="font-semibold text-sm">{instrument.keyStats.revisit}</div>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-primary" />
                      Key Capabilities
                    </h4>
                    <ul className="space-y-2">
                      {instrument.capabilities.map((capability, capIndex) => (
                        <li 
                          key={capIndex}
                          className="text-sm text-muted-foreground flex items-start"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${instrument.bgColor} mt-2 mr-3 flex-shrink-0`} />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Data Visualization Preview */}
                  <div className="p-4 data-visualization rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Live Data Stream</span>
                      <div className={`w-2 h-2 rounded-full ${instrument.color.replace('text-', 'bg-')} animate-pulse-data`} />
                    </div>
                    <div className="flex justify-between items-end h-12">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 ${instrument.bgColor} rounded-full animate-data-flow`}
                          style={{
                            height: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Overview */}
        <div className="mt-16 text-center">
          <Card className="terra-card max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Globe className="w-12 h-12 text-primary animate-orbit mr-4" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold">Integrated Earth System Science</h3>
                  <p className="text-muted-foreground">Comprehensive monitoring since December 1999</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Terra's five instruments work together to provide unprecedented insights into Earth's 
                interconnected systems. From monitoring climate change and natural disasters to tracking 
                environmental health and human impacts, Terra continues to advance our understanding 
                of our home planet after 25 years in orbit.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InstrumentOverview;