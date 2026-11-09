import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n';
import { copy } from '../i18n/copy';
import { scrollToId } from '../lib/scroll';

const STOPS = [
  ['top', null],
  ['story', copy.nav.story],
  ['menu', copy.nav.menu],
  ['drinks', copy.nav.drinks],
  ['delivery', copy.nav.delivery],
  ['places', copy.nav.places],
] as const;

/** A vertical "bus route": the bus moves along the line as you scroll, sections are the stops. */
export default function RouteProgress() {
  const { t } = useLang();
  const bus = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [positions, setPositions] = useState<number[]>(STOPS.map((_, i) => i / (STOPS.length - 1)));

  useEffect(() => {
    const measure = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      setPositions(
        STOPS.map(([id]) => {
          const el = id === 'top' ? null : document.getElementById(id);
          const y = el ? el.getBoundingClientRect().top + window.scrollY : 0;
          return Math.min(1, Math.max(0, y / total));
        }),
      );
    };
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      if (bus.current) bus.current.style.top = `${p * 100}%`;
      if (line.current) line.current.style.transform = `scaleY(${p})`;
      const mid = window.scrollY + window.innerHeight * 0.45;
      let idx = 0;
      STOPS.forEach(([id], i) => {
        const el = id === 'top' ? null : document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= mid) idx = i;
      });
      setActive(idx);
    };
    measure();
    update();
    const ro = new ResizeObserver(() => {
      measure();
      update();
    });
    ro.observe(document.body);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    const late = window.setTimeout(measure, 2500);
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
      window.clearTimeout(late);
    };
  }, []);

  return (
    <aside className="route" aria-label="Route">
      <div className="route__rail">
        <div className="route__line" />
        <div className="route__fill" ref={line} />
        {STOPS.map(([id, label], i) => (
          <button
            key={id}
            className={`route__stop ${i <= active ? 'is-passed' : ''} ${i === active ? 'is-active' : ''}`}
            style={{ top: `${positions[i] * 100}%` }}
            onClick={() => scrollToId(id)}
            aria-label={label ? t(label) : 'RedBus.lv'}
          >
            <span className="route__tip">{label ? t(label) : 'RedBus.lv'}</span>
          </button>
        ))}
        <div className="route__bus" ref={bus} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="14" rx="3" />
            <path d="M4 11h16M8 21v-3M16 21v-3" />
          </svg>
        </div>
      </div>
    </aside>
  );
}
