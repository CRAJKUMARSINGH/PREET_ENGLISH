import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Log to analytics
    if (import.meta.env.PROD) {
      // Send to error tracking service
      console.error('Production error:', {
        error: error.toString(),
        componentStack: errorInfo.componentStack,
      });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border-2 border-red-200 dark:border-red-800">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
                <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-center mb-4 text-slate-900 dark:text-white">
              कुछ गलत हो गया
            </h1>
            <p className="text-center text-lg text-slate-600 dark:text-slate-400 mb-6">
              Something went wrong
            </p>

            {/* Error Message (Development only) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <p className="font-mono text-sm text-red-800 dark:text-red-300 mb-2">
                  <strong>Error:</strong> {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200">
                      Show details
                    </summary>
                    <pre className="mt-2 text-xs overflow-auto max-h-40 text-red-600 dark:text-red-400">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* User-friendly message */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-blue-800 dark:text-blue-300 text-center">
                😊 चिंता न करें! यह एक अस्थायी समस्या है।
                <br />
                <span className="text-sm">Don't worry! This is a temporary issue.</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleReset}
                className="flex items-center gap-2"
                size="lg"
              >
                <RefreshCw className="w-5 h-5" />
                फिर से कोशिश करें (Try Again)
              </Button>
              <Button
                onClick={this.handleGoHome}
                variant="outline"
                className="flex items-center gap-2"
                size="lg"
              >
                <Home className="w-5 h-5" />
                होम पर जाएं (Go Home)
              </Button>
            </div>

            {/* Help text */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              अगर समस्या बनी रहती है, तो पेज को रिफ्रेश करें या बाद में कोशिश करें।
              <br />
              <span className="text-xs">If the problem persists, refresh the page or try again later.</span>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
