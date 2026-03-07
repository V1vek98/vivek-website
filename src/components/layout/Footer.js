import { footerContent } from '../../config/data';

export default function Footer() {
  const { builtWith, journey, copyright, version } = footerContent;

  return (
    <footer className="py-12 bg-surface-secondary border-t border-surface-tertiary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-content-secondary mb-4">{builtWith}</p>

        {/* Journey */}
        <div className="flex items-center justify-center gap-2 mb-4 text-xs text-content-tertiary font-mono">
          {journey.map((stop, i) => (
            <span key={stop.city} className="flex items-center gap-1">
              {i > 0 && <span className="text-content-tertiary/50 mx-1">&rarr;</span>}
              <span>{stop.flag === 'GB' ? '🇬🇧' : stop.flag === 'IN' ? '🇮🇳' : '🇺🇸'}</span>
              <span>{stop.city}</span>
            </span>
          ))}
        </div>

        <p className="text-xs text-content-tertiary">
          &copy; {new Date().getFullYear()} Vivek Patel &middot; {version}
        </p>
        <p className="text-xs text-content-tertiary/60 mt-1 italic">{copyright}</p>
      </div>
    </footer>
  );
}
