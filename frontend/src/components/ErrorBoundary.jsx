import React from "react";
import { Button } from "@/components/ui/button";
import "../styles/Global.css";

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
        <div className="error-boundary-v2">
          <h1>TrainIQ ran into a problem.</h1>
          <p>
            Something unexpected happened. Reload TrainIQ to continue.
          </p>
          <Button variant="default" onClick={this.handleReload}>
            Reload TrainIQ
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;