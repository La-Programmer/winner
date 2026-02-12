import './app-layout.css';
import { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-root">
      <main className="app-content">
        {children}
      </main>
    </div>
  );
}
