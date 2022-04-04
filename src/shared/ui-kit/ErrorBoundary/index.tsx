import React, { ErrorInfo } from "react";

interface Props {}
interface IErrorBoundary {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}
export class ErrorBoundary extends React.Component<Props, IErrorBoundary> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }
  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details>
            {this.state.error && this.state.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
