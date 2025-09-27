import { Button } from "@/components/ui/button";
import { Satellite, Zap, Globe, BarChart3 } from "lucide-react";
import terraHeroImage from "@/assets/terra-satellite-hero.jpg";

const TerraHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${terraHeroImage})` }}
      >
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Floating Data Points */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="data-point data-point-atmospheric absolute top-1/4 left-1/4 animate-pulse-data" />
        <div className="data-point data-point-thermal absolute top-1/3 right-1/3 animate-pulse-data" style={{ animationDelay: '0.5s' }} />
        <div className="data-point data-point-vegetation absolute bottom-1/3 left-1/3 animate-pulse-data" style={{ animationDelay: '1s' }} />
        <div className="data-point data-point-atmospheric absolute bottom-1/4 right-1/4 animate-pulse-data" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Satellite className="w-12 h-12 text-primary animate-orbit mr-4" />
            <span className="text-lg font-semibold text-primary">NASA Terra Mission</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="terra-gradient-text">25 Years</span>
            <br />
            <span className="text-foreground">of Earth Science</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore a quarter-century of Earth observation data from Terra's five instruments. 
            Witness climate change, track environmental patterns, and discover the stories our planet tells from space.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button className="terra-button-hero">
              <BarChart3 className="w-5 h-5 mr-2" />
              Explore Live Data
            </Button>
            <Button variant="outline" className="terra-button-secondary">
              <Globe className="w-5 h-5 mr-2" />
              View Timeline
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="terra-card p-6 animate-terra-glow">
              <div className="text-3xl font-bold text-primary mb-2">5</div>
              <div className="text-sm text-muted-foreground">Instruments</div>
            </div>
            <div className="terra-card p-6 animate-terra-glow" style={{ animationDelay: '0.5s' }}>
              <div className="text-3xl font-bold text-accent mb-2">25</div>
              <div className="text-sm text-muted-foreground">Years Active</div>
            </div>
            <div className="terra-card p-6 animate-terra-glow" style={{ animationDelay: '1s' }}>
              <div className="text-3xl font-bold text-success mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
            <div className="terra-card p-6 animate-terra-glow" style={{ animationDelay: '1.5s' }}>
              <div className="text-3xl font-bold text-thermal mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Discoveries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Orbital Animation Element */}
      <div className="absolute top-20 right-20 pointer-events-none">
        <div className="w-4 h-4 bg-primary rounded-full animate-orbit opacity-60" />
      </div>
    </section>
  );
};

export default TerraHero;