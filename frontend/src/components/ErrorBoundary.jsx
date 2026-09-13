import React from "react";
import Button from "./ui/Button/Button";
import "../styles/Global.css"; // Ensure standard button styles are available

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Error tracking can be added here
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: 'var(--background)',
          color: 'var(--text)'
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: '800' }}>
            TrainIQ ran into a problem.
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
            Something unexpected happened. Reload TrainIQ to continue.
          </p>
          <Button variant="primary" onClick={this.handleReload}>
            Reload TrainIQ
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
