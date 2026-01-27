import React, { useEffect, useMemo, useState } from 'react';
// Mock wouter router for testing
import { createContext, useContext } from 'react';

// Create a mock location context for testing
const LocationContext = createContext({
  pathname: '/',
  search: '',
});

// Mock useLocation hook
export const useLocation = () => {
  const location = useContext(LocationContext);
  return [location.pathname + location.search, () => {}];
};

// Mock useParams hook
export const useParams = () => ({});

// Mock useNavigate hook
export const useNavigate = () => {
  return () => {};
};

// Mock Link component as a simple function that returns a string representation
export const Link = ({ children, to, ...props }: { children: any; to: string; [key: string]: any }) => {
  return `Link to: ${to}`;
};

// Mock Route component
export const Route = ({ children }: { children: any }) => {
  return children;
};

// Mock Switch component
export const Switch = ({ children }: { children: any }) => {
  return children;
};

// Export a mock __setLocation function for testing navigation
export const __setLocation = (pathname: string, search = '') => {
  // For testing purposes, we can set a global location
  if (typeof window !== 'undefined') {
    (window as any).__TEST_LOCATION = { pathname, search };
  } else {
    (globalThis as any).__TEST_LOCATION = { pathname, search };
  }
};

// A tiny in-memory router store for tests
let currentLocation = '/';
const listeners = new Set<() => void>();

const setLocationInternal = (to: string) => {
  currentLocation = to;
  listeners.forEach((l) => l());
};

export const __getLocation = () => currentLocation;

const matchPath = (pattern: string, path: string): { match: boolean; params: any } => {
  if (!pattern) return { match: false, params: {} };

  // Exact match
  if (!pattern.includes(':')) {
    return { match: pattern === path, params: {} };
  }

  // Support one param pattern like /lesson/:id
  const [p1, p2] = pattern.split('/:');
  if (p2) {
    if (path.startsWith(p1 + '/')) {
      const value = path.slice((p1 + '/').length);
      if (value.length > 0) {
        return { match: true, params: { [p2]: value } };
      }
    }
  }

  return { match: false, params: {} };
};

export const useRoute = (pattern?: string): [boolean, any] => {
  const [loc] = useLocation();
  const res = useMemo(() => matchPath(pattern || '', loc), [pattern, loc]);
  return [res.match, res.params];
};
