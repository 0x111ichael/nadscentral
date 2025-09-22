import React, { Component, ReactNode } from "react";
import { CosmicCard } from "./CosmicCard";
import { CosmicButton } from "./CosmicButton";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { EnhancedStarfield } from "./EnhancedStarfield";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Web3ErrorBoundary is intended to wrap only Web3-dependent components.
 * It provides a user-friendly fallback UI and can be extended for error reporting.
 */
export class Web3ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // TODO: Integrate with error reporting service (e.g., Sentry)
    console.error("Web3 error boundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative min-h-screen">
          <EnhancedStarfield />
          <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
            <div className="max-w-lg mx-auto text-center">
              <CosmicCard className="p-12">
                <div className="cosmic-pulse mb-8">
                  <AlertTriangle className="w-16 h-16 text-destructive mx-auto" />
                </div>
                <h2 className="text-3xl font-bold mb-6">
                  <span className="text-gradient-cosmic">Web3 Connection Error</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  There was a problem connecting to the blockchain or wallet. Please check your network and try again.
                </p>
                <div className="space-y-4">
                  <CosmicButton
                    onClick={this.handleRetry}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retry</span>
                  </CosmicButton>
                  <CosmicButton
                    variant="outline"
                    onClick={() => window.location.href = "/"}
                    className="w-full"
                  >
                    Return to Gateway
                  </CosmicButton>
                </div>
                {process.env.NODE_ENV === "development" && this.state.error && (
                  <details className="mt-6 text-left">
                    <summary className="text-sm text-muted-foreground cursor-pointer">
                      Error Details (Development)
                    </summary>
                    <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
              </CosmicCard>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
