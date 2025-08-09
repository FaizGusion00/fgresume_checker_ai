import Link from 'next/link';
import { FgAiIcon } from './fg-ai-icon';

export default function Header() {
  return (
    <header className="bg-transparent sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <FgAiIcon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
              FGResume Checker AI
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
