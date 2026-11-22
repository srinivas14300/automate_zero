import { Reveal } from './Reveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'paper' | 'dark' | 'lime';
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  tone = 'paper',
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const eyebrowColor =
    tone === 'dark'
      ? 'text-[#FF957A]'
      : tone === 'lime'
        ? 'text-[#090909]'
        : 'text-[#C41E45]';

  const titleColor =
    tone === 'dark' ? 'text-white' : 'text-[#090909]';

  const descColor =
    tone === 'dark'
      ? 'text-white/65'
      : tone === 'lime'
        ? 'text-[#090909]/75'
        : 'text-[#58584F]';

  const alignClasses =
    align === 'center' ? 'mx-auto text-center max-w-3xl' : 'max-w-2xl';

  return (
    <Reveal className={`${alignClasses} ${className}`}>
      <p className={`text-xs sm:text-sm font-semibold tracking-tight ${eyebrowColor}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08] ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${descColor}`}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
