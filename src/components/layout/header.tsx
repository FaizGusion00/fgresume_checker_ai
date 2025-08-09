import Link from 'next/link';
import { FgAiIcon } from './fg-ai-icon';

export default function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <FgAiIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              FGResume Checker AI
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
