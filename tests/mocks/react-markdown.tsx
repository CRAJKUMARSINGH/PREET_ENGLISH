import React from 'react';

// Minimal react-markdown mock that simply renders children
export default function ReactMarkdown({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}
