import { AutomateLogo } from '../brand/AutomateLogo';

export function Navbar() {
  return (
    <header className="absolute top-0 inset-x-0 z-40 bg-transparent">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        <a href="#top" className="inline-flex items-center shrink-0">
          <AutomateLogo tone="on-dark" />
        </a>
      </div>
    </header>
  );
}
