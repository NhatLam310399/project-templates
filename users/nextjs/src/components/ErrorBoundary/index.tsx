/**
 * This is component which will prevent your app is cracked when something wrong
 * with typescript.
 * This component is similar with try-catch wrapper
 */

import React, { Component, ErrorInfo, isValidElement, ReactNode } from "react";
import { ErrorBoundaryContainer, Title, Details } from "./styles";

interface IErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface IErrorBoundaryState {
  error: Error;
  errorInfo: ErrorInfo;
}

export default class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props) {
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
      // Error path
      return isValidElement(this.props.fallback) ? (
        this.props.fallback
      ) : (
        <ErrorBoundaryContainer>
          <Title>Có lỗi xẩy ra</Title>
          <Details>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </Details>
        </ErrorBoundaryContainer>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
