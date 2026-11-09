import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';
import { gsap, reducedMotion } from '../lib/gsap';

/* ---------- Bus illustration ---------- */
export function BusSvg({
  body = '#e4202b',
  ink = '#14090a',
  glass = '#fff3e1',
  className,
  wheelsSpin = false,
  label = 'PIZZA',
}: {
  body?: string;
  ink?: string;
  glass?: string;
  className?: string;
  wheelsSpin?: boolean;
  label?: string;
}) {
  const wheel = (cx: number) => (
    <g transform={`translate(${cx} 108)`}>
      <circle r="15" fill={ink} />
      <g className={wheelsSpin ? 'bus-wheel' : undefined}>
        <circle r="8" fill={glass} />
        <path d="M0 -8V8M-8 0H8" stroke={ink} strokeWidth="2.4" />
        <circle r="2.6" fill={ink} />
      </g>
    </g>
  );
  return (
    <svg className={className} viewBox="0 0 250 128" role="img" aria-label="RedBus" focusable="false">
      {/* body */}
      <path
        d="M14 14Q14 6 22 6H196Q204 6 206 14L214 44H234Q244 46 244 56V98Q244 108 234 108H14Q6 108 6 100V22Q6 14 14 14Z"
        fill={body}
        stroke={ink}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* deck divider */}
      <path d="M6 56H240" stroke={ink} strokeWidth="4" />
      {/* roof sign */}
      <rect x="64" y="-2" width="78" height="16" rx="6" fill={ink} />
      <text x="103" y="10.5" fontSize="10.5" fontWeight="800" textAnchor="middle" fill={glass} letterSpacing="2.4" fontFamily="Rubik Variable, sans-serif">
        {label}
      </text>
      {/* upper windows */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={20 + i * 36} y="20" width="28" height="26" rx="6" fill={glass} stroke={ink} strokeWidth="3.5" />
      ))}
      {/* lower windows */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={20 + i * 36} y="66" width="28" height="24" rx="6" fill={glass} stroke={ink} strokeWidth="3.5" />
      ))}
      {/* door */}
      <rect x="132" y="64" width="30" height="42" rx="5" fill={glass} stroke={ink} strokeWidth="3.5" />
      <path d="M147 64V106" stroke={ink} strokeWidth="3" />
      {/* windshield */}
      <path d="M176 64H210L230 70V92H176Z" fill={glass} stroke={ink} strokeWidth="3.5" strokeLinejoin="round" />
      {/* lights */}
      <circle cx="238" cy="96" r="4" fill="#ffc93c" stroke={ink} strokeWidth="2" />
      <rect x="4" y="82" width="5" height="12" rx="2" fill="#ffc93c" stroke={ink} strokeWidth="2" />
      {wheel(56)}
      {wheel(196)}
    </svg>
  );
}

/* ---------- Starburst sticker ---------- */
export function Sticker({ children, className, style }: { children?: ReactNode; className?: string; style?: CSSProperties }) {
  const points = 22;
  const d = Array.from({ length: points * 2 }, (_, i) => {
    const r = i % 2 === 0 ? 100 : 88;
    const a = (Math.PI * 2 * i) / (points * 2);
    return `${(100 + r * Math.cos(a)).toFixed(2)},${(100 + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
  return (
    <div className={`sticker ${className ?? ''}`} style={style}>
      <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        <polygon points={d} fill="#ffc93c" />
        <polygon points={d} fill="none" stroke="#14090a" strokeWidth="3" strokeLinejoin="round" transform="translate(4 5)" opacity=".18" />
      </svg>
      <div className="sticker__text">{children}</div>
    </div>
  );
}

/* ---------- Circular text badge ---------- */
export function RingText({ text, className }: { text: string; className?: string }) {
  const id = 'ring-' + text.length;
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <path id={id} d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
      </defs>
      <text fontFamily="Rubik Variable, sans-serif" fontWeight="700" fontSize="15.5" letterSpacing="3.2" fill="currentColor">
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
    </svg>
  );
}

/* ---------- Icons ---------- */
const base = { width: '1em', height: '1em', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false } as const;

export const IconArrow = () => (
  <svg {...base}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const IconArrowUp = () => (
  <svg {...base}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);
export const IconPlus = () => (
  <svg {...base}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const IconMinus = () => (
  <svg {...base}>
    <path d="M5 12h14" />
  </svg>
);
export const IconClose = () => (
  <svg {...base}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const IconPhone = () => (
  <svg {...base} fill="currentColor" stroke="none">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />
  </svg>
);
export const IconBag = () => (
  <svg {...base}>
    <path d="M5 8h14l-1 12H6L5 8z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
export const IconPin = () => (
  <svg {...base}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);
export const IconFacebook = () => (
  <svg {...base} fill="currentColor" stroke="none">
    <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5H16.7V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3z" />
  </svg>
);
export const IconInstagram = () => (
  <svg {...base}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);
export const IconStar = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 0l2.6 8.3L23 6.5l-5.4 6.2L24 18l-8.5-.4L12 24l-3.5-6.4L0 18l6.4-5.3L1 6.5l8.4 1.8z" />
  </svg>
);

/* ---------- Magnetic wrapper ---------- */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      gsap.set(el, { clearProps: 'transform' });
    };
  }, [strength]);
  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  );
}

/* ---------- Reveal helpers ---------- */
/** Splits text into words, each wrapped in a masked span (animated via CSS when `.is-in` is set on an ancestor). */
export function Words({ text, className, step = 45, base = 0 }: { text: string; className?: string; step?: number; base?: number }) {
  const words = text.split(' ');
  return (
    <span className={`words ${className ?? ''}`} aria-label={text}>
      {words.map((w, i) => (
        <span className="words__mask" aria-hidden="true" key={i + w}>
          <span className="words__word" style={{ transitionDelay: `${base + i * step}ms` }}>
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ---------- Fly-to-cart micro-interaction ---------- */
export function flyToCart(from: Element | null) {
  const target = document.getElementById('cart-btn');
  if (!from || !target || reducedMotion()) {
    pulse(target);
    return;
  }
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const dot = document.createElement('div');
  dot.className = 'fly-dot';
  document.body.appendChild(dot);
  gsap.set(dot, { x: a.left + a.width / 2 - 14, y: a.top + a.height / 2 - 14, scale: 1, opacity: 1 });
  gsap
    .timeline({ onComplete: () => { dot.remove(); pulse(target); } })
    .to(dot, { x: b.left + b.width / 2 - 14, y: b.top + b.height / 2 - 14, duration: 0.75, ease: 'power3.inOut' }, 0)
    .to(dot, { scale: 0.35, duration: 0.75, ease: 'power2.in' }, 0);
}

function pulse(el: Element | null) {
  if (!el) return;
  gsap.fromTo(el, { scale: 1 }, { scale: 1.18, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' });
}
