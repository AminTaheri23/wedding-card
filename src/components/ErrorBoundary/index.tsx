import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-wedding-cream flex flex-col items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-3xl font-persian-title text-wedding-dark mb-4">متاسفیم</h1>
            <p className="text-wedding-dark/80 font-persian-body text-lg mb-6">
              مشکلی پیش آمده است. لطفاً صفحه را دوباره بارگذاری کنید.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-wedding-gold text-white px-6 py-2 rounded-full font-persian-title"
            >
              بارگذاری مجدد
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
