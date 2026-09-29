import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught render error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "34rem" }}>
            <h1
              style={{
                fontSize: "clamp(28px, 5vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
                color: "var(--text)",
              }}
            >
              Something went wrong loading this page.
            </h1>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.6,
                color: "var(--muted)",
              }}
            >
              Please refresh, or get in touch at{" "}
              <a
                href="mailto:jega4044@gmail.com"
                style={{ color: "var(--accent)" }}
              >
                jega4044@gmail.com
              </a>
              .
            </p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
