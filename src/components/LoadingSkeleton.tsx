import { EnhancedStarfield } from "./EnhancedStarfield";

export function LoadingSkeleton() {
  return (
    <div className="relative min-h-screen">
      <EnhancedStarfield />
      
      {/* Header Skeleton */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="h-8 w-48 bg-gradient-cosmic rounded animate-pulse" />
        <div className="h-12 w-32 bg-muted rounded-xl animate-pulse" />
      </header>

      {/* Main Content Skeleton */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card/20 backdrop-blur-md border border-border rounded-xl p-6 animate-pulse"
              >
                <div className="h-4 w-16 bg-muted rounded mb-3" />
                <div className="h-8 w-24 bg-gradient-cosmic rounded mb-2" />
                <div className="h-3 w-32 bg-muted rounded" />
              </div>
            ))}
          </div>

          {/* Feed Skeleton */}
          <div className="bg-card/20 backdrop-blur-md border border-border rounded-xl p-6">
            <div className="h-6 w-32 bg-gradient-cosmic rounded mb-6" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-muted/20 rounded-lg p-4 animate-pulse"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 bg-muted rounded" />
                    <div className="h-4 w-24 bg-muted rounded" />
                    <div className="h-3 w-16 bg-muted rounded ml-auto" />
                  </div>
                  <div className="h-4 w-full bg-muted rounded mb-2" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}