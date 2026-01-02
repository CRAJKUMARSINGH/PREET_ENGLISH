import React, { useEffect, useMemo, useState } from 'react';

// A tiny in-memory router store for tests
let currentLocation = '/';
const listeners = new Set<() => void>();

const setLocationInternal = (to: string) => {
  currentLocation = to;
  listeners.forEach((l) => l());
};

export const __setLocation = (to: string) => setLocationInternal(to);
export const __getLocation = () => currentLocation;

export const useLocation = (): [string, (to: string) => void] => {
  const [, force] = useState(0);

  useEffect(() => {
    const onChange = () => force((x) => x + 1);
    listeners.add(onChange);
    return () => {
      listeners.delete(onChange);
    };
  }, []);

  return [currentLocation, (to: string) => setLocationInternal(to)];
};

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

export const Link = ({ href, children }: { href?: string; children?: React.ReactNode }) => {
  const [, setLoc] = useLocation();
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        if (href) setLoc(href);
      }}
    >
      {children}
    </a>
  );
};

export const Route = ({ path, component: Component }: { path?: string; component: React.ComponentType<any> }) => {
  const [match] = useRoute(path);
  if (!match) return null;
  return <Component />;
};

export const Switch = ({ children }: { children?: React.ReactNode }) => {
  // Subscribe to location changes so routes update after navigation
  const [loc] = useLocation();

  const items = React.Children.toArray(children) as React.ReactElement[];
  for (const child of items) {
    if (!React.isValidElement(child)) continue;
    // If it's a Route with a path, check match and render first match
    const path = (child.props as any).path as string | undefined;
    if (!path) return child;
    const { match } = matchPath(path, loc);
    if (match) return child;
  }
  return null;
};
