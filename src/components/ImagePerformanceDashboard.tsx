import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useImagePerformance } from '@/utils/imagePerformanceMonitor';
import { Timer, TrendingUp, Zap, AlertTriangle } from 'lucide-react';

const ImagePerformanceDashboard: React.FC = () => {
  const { stats, slowImages } = useImagePerformance();

  if (stats.totalImages === 0) {
    return null; // Don't show dashboard if no images loaded yet
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50 max-w-sm"
    >
      <Card className="p-4 bg-background/95 backdrop-blur-sm border shadow-lg">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Image Performance</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Timer className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Avg Load Time</span>
              </div>
              <Badge variant={stats.averageLoadTime < 500 ? 'default' : 'destructive'}>
                {stats.averageLoadTime}ms
              </Badge>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Cache Hit Rate</span>
              </div>
              <Badge variant={stats.cacheHitRate > 50 ? 'default' : 'secondary'}>
                {stats.cacheHitRate}%
              </Badge>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Total: {stats.totalImages}</span>
            {stats.slowImages > 0 && (
              <div className="flex items-center gap-1 text-orange-600">
                <AlertTriangle className="w-3 h-3" />
                <span>{stats.slowImages} slow</span>
              </div>
            )}
          </div>
          
          {/* Show slow images if any */}
          {slowImages.length > 0 && (
            <div className="mt-2 pt-2 border-t">
              <p className="text-xs text-muted-foreground mb-1">Slow images:</p>
              <div className="space-y-1 max-h-20 overflow-y-auto">
                {slowImages.slice(0, 3).map((img, idx) => (
                  <div key={idx} className="text-xs">
                    <span className="text-orange-600">{Math.round(img.duration)}ms</span>
                    <span className="ml-2 truncate text-muted-foreground">
                      {img.url.split('/').pop()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ImagePerformanceDashboard;
