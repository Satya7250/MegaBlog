import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log for diagnostics
    console.error('UI ErrorBoundary caught an error:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
          <div className="max-w-lg w-full bg-white rounded-xl shadow p-8 text-center">
            <div className="text-5xl mb-3">⚠️</div>
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">An unexpected error occurred. Please try reloading the page.</p>
            <button onClick={this.handleReload} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Reload</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}