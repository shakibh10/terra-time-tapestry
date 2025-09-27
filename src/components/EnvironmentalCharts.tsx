import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

interface EnvironmentalChartsProps {
  timelineData: any[];
  currentData: any;
  story: string;
}

export const EnvironmentalCharts: React.FC<EnvironmentalChartsProps> = ({
  timelineData,
  currentData,
  story
}) => {
  // Process timeline data for charts
  const chartData = timelineData.map((point, index) => {
    const baseData = {
      index,
      year: point.year,
      month: point.month,
      date: point.date,
    };

    if (point.data) {
      return {
        ...baseData,
        temperature: point.data.modis?.temperature || 25 + Math.sin(index * 0.1) * 5,
        vegetation: point.data.modis?.vegetation_index || 0.7 + Math.sin(index * 0.05) * 0.2,
        co_level: point.data.mopitt?.co_concentration || 100 + Math.sin(index * 0.08) * 30,
        cloud_cover: point.data.modis?.cloud_cover || 40 + Math.sin(index * 0.12) * 20,
        energy_flux: point.data.ceres?.solar_radiation || 300 + Math.sin(index * 0.06) * 50,
        fires: point.data.fires?.length || Math.floor(Math.random() * 10),
      };
    }

    return {
      ...baseData,
      temperature: 25 + Math.sin(index * 0.1) * 5,
      vegetation: 0.7 + Math.sin(index * 0.05) * 0.2,
      co_level: 100 + Math.sin(index * 0.08) * 30,
      cloud_cover: 40 + Math.sin(index * 0.12) * 20,
      energy_flux: 300 + Math.sin(index * 0.06) * 50,
      fires: Math.floor(Math.random() * 10),
    };
  });

  const getChartConfig = () => {
    switch (story) {
      case 'monsoon':
        return {
          title: 'Monsoon Patterns',
          charts: [
            {
              type: 'area',
              title: 'Cloud Cover %',
              dataKey: 'cloud_cover',
              color: '#3b82f6',
              unit: '%'
            },
            {
              type: 'line',
              title: 'Energy Flux',
              dataKey: 'energy_flux',
              color: '#f59e0b',
              unit: 'W/m²'
            }
          ]
        };
      case 'fires':
        return {
          title: 'Fire Activity',
          charts: [
            {
              type: 'bar',
              title: 'Active Fires',
              dataKey: 'fires',
              color: '#ef4444',
              unit: 'count'
            },
            {
              type: 'line',
              title: 'Temperature',
              dataKey: 'temperature',
              color: '#f97316',
              unit: '°C'
            }
          ]
        };
      case 'pollution':
        return {
          title: 'Air Quality',
          charts: [
            {
              type: 'area',
              title: 'CO Concentration',
              dataKey: 'co_level',
              color: '#eab308',
              unit: 'ppb'
            }
          ]
        };
      case 'vegetation':
        return {
          title: 'Vegetation Health',
          charts: [
            {
              type: 'line',
              title: 'NDVI Index',
              dataKey: 'vegetation',
              color: '#22c55e',
              unit: 'index'
            }
          ]
        };
      case 'temperature':
        return {
          title: 'Climate Trends',
          charts: [
            {
              type: 'line',
              title: 'Land Surface Temperature',
              dataKey: 'temperature',
              color: '#f97316',
              unit: '°C'
            }
          ]
        };
      default:
        return {
          title: 'Overview',
          charts: [
            {
              type: 'line',
              title: 'Temperature',
              dataKey: 'temperature',
              color: '#f97316',
              unit: '°C'
            }
          ]
        };
    }
  };

  const config = getChartConfig();

  const calculateTrend = (dataKey: string) => {
    if (chartData.length < 10) return { trend: 'stable', percentage: 0 };
    
    const recent = chartData.slice(-12).map(d => d[dataKey as keyof typeof d] as number);
    const older = chartData.slice(-24, -12).map(d => d[dataKey as keyof typeof d] as number);
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
    
    const percentage = ((recentAvg - olderAvg) / olderAvg) * 100;
    
    if (Math.abs(percentage) < 2) return { trend: 'stable', percentage: 0 };
    return {
      trend: percentage > 0 ? 'increasing' : 'decreasing',
      percentage: Math.abs(percentage)
    };
  };

  const renderChart = (chart: any, index: number) => {
    const trend = calculateTrend(chart.dataKey);
    
    return (
      <motion.div
        key={chart.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{chart.title}</CardTitle>
              <Badge 
                variant={trend.trend === 'increasing' ? 'destructive' : 
                       trend.trend === 'decreasing' ? 'secondary' : 'outline'}
                className="text-xs"
              >
                {trend.trend === 'increasing' && <TrendingUp className="w-3 h-3 mr-1" />}
                {trend.trend === 'decreasing' && <TrendingDown className="w-3 h-3 mr-1" />}
                {trend.trend === 'stable' && <Minus className="w-3 h-3 mr-1" />}
                {trend.percentage > 0 ? `${trend.percentage.toFixed(1)}%` : 'Stable'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                {chart.type === 'line' ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      dataKey="year" 
                      fontSize={10}
                      tickFormatter={(value) => value.toString().slice(2)}
                    />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey={chart.dataKey}
                      stroke={chart.color}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 3 }}
                    />
                  </LineChart>
                ) : chart.type === 'area' ? (
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      dataKey="year" 
                      fontSize={10}
                      tickFormatter={(value) => value.toString().slice(2)}
                    />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey={chart.dataKey}
                      stroke={chart.color}
                      fill={`${chart.color}40`}
                      strokeWidth={2}
                    />
                  </AreaChart>
                ) : (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      dataKey="year" 
                      fontSize={10}
                      tickFormatter={(value) => value.toString().slice(2)}
                    />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Bar
                      dataKey={chart.dataKey}
                      fill={chart.color}
                      opacity={0.8}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const getEnvironmentalAlerts = () => {
    if (!currentData) return [];
    
    const alerts = [];
    
    if (story === 'fires' && currentData.fires?.length > 5) {
      alerts.push({
        type: 'warning',
        message: `High fire activity detected: ${currentData.fires.length} active fires`
      });
    }
    
    if (story === 'pollution' && currentData.mopitt?.co_concentration > 150) {
      alerts.push({
        type: 'danger',
        message: `Elevated CO levels: ${currentData.mopitt.co_concentration.toFixed(0)} ppb`
      });
    }
    
    if (story === 'temperature' && currentData.modis?.temperature > 35) {
      alerts.push({
        type: 'warning',
        message: `High temperature alert: ${currentData.modis.temperature.toFixed(1)}°C`
      });
    }
    
    return alerts;
  };

  const alerts = getEnvironmentalAlerts();

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">{config.title}</h3>
        <p className="text-xs text-muted-foreground">
          25-year trend analysis
        </p>
      </div>

      {/* Environmental Alerts */}
      {alerts.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <CardContent className="p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-yellow-800 dark:text-yellow-200">
                  Environmental Alert
                </p>
                {alerts.map((alert, index) => (
                  <p key={index} className="text-xs text-yellow-700 dark:text-yellow-300">
                    {alert.message}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Measurements */}
      {currentData && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Current Values</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-1 gap-2 text-xs">
              {story === 'monsoon' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cloud Cover:</span>
                    <span>{currentData.modis?.cloud_cover?.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Energy Flux:</span>
                    <span>{currentData.ceres?.solar_radiation?.toFixed(1)} W/m²</span>
                  </div>
                </>
              )}
              {story === 'temperature' && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Temperature:</span>
                  <span>{currentData.modis?.temperature?.toFixed(1)}°C</span>
                </div>
              )}
              {story === 'pollution' && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CO Level:</span>
                  <span>{currentData.mopitt?.co_concentration?.toFixed(0)} ppb</span>
                </div>
              )}
              {story === 'vegetation' && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NDVI:</span>
                  <span>{currentData.modis?.vegetation_index?.toFixed(3)}</span>
                </div>
              )}
              {story === 'fires' && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Fires:</span>
                  <span>{currentData.fires?.length || 0}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      <div className="space-y-4">
        {config.charts.map((chart, index) => renderChart(chart, index))}
      </div>

      {/* Data Quality Indicator */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Data Points:</span>
            <Badge variant="outline">{chartData.length} samples</Badge>
          </div>
          <div className="mt-2 w-full bg-muted rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((chartData.length / 300) * 100, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};