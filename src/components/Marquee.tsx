import { IconStar } from './ui';
import type { ReactNode } from 'react';

export default function Marquee({
  items,
  className = '',
  speed = 38,
  reverse = false,
}: {
  items: ReactNode[];
  className?: string;
  speed?: number;
  reverse?: boolean;
}) {
  const row = (aria: boolean) => (
    <ul className="marquee__row" aria-hidden={aria || undefined}>
      {items.map((it, i) => (
        <li key={i}>
          <span>{it}</span>
          <IconStar className="marquee__star" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${className}`} style={{ ['--speed' as string]: `${speed}s`, ['--dir' as string]: reverse ? 'reverse' : 'normal' }}>
      <div className="marquee__track">
        {row(false)}
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}
