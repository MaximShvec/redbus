import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n';
import { copy } from '../i18n/copy';
import { gsap, useGSAP, reducedMotion } from '../lib/gsap';
import { useInView } from '../lib/hooks';
import { openState, type OpenState } from '../lib/hours';
import { IconArrow, IconPhone, IconPin, Words } from './ui';

const mapUrl = (address: string, city: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`RedBus ${address}, ${city.split('·')[0].trim()}`)}`;

export default function Places() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const [headRef, headSeen] = useInView<HTMLDivElement>(0.25);
  const [gridRef, gridSeen] = useInView<HTMLDivElement>(0.1);
  const [status, setStatus] = useState<OpenState>(() => openState());

  useEffect(() => {
    const id = window.setInterval(() => setStatus(openState()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.fromTo(
        '.places__photo img',
        { yPercent: -14, scale: 1.2 },
        { yPercent: 14, scale: 1.2, ease: 'none', scrollTrigger: { trigger: '.places__photo', start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <section className="places section" id="places" ref={root}>
      <div className={`places__head ${headSeen ? 'is-in' : ''}`} ref={headRef}>
        <p className="eyebrow fade-up">{t(copy.places.eyebrow)}</p>
        <h2 className="places__title display">
          <Words text={t(copy.places.title)} />
        </h2>
      </div>

      <figure className="places__photo">
        <img src="/img/terrace-night.webp" alt="RedBus.lv terrace at night with string lights and a red double-decker bus" loading="lazy" decoding="async" />
        <figcaption>Majori · Tirgoņu iela 21</figcaption>
      </figure>

      <div className={`places__grid ${gridSeen ? 'is-in' : ''}`} ref={gridRef}>
        {copy.places.list.map((p, i) => (
          <article key={p.address} className="stop fade-up" style={{ ['--d' as string]: `${i * 100}ms` }}>
            <div className="stop__sign" aria-hidden="true">
              <span className="stop__disc">{i + 1}</span>
              <span className="stop__pole" />
            </div>
            <div className="stop__body">
              <p className="stop__label">
                {t(copy.places.stop)} {i + 1} · {t(p.city)}
              </p>
              <h3 className="stop__address display">{p.address}</h3>
              <ul className="stop__tags">
                {p.tags.map((tag, j) => (
                  <li key={j}>{t(tag)}</li>
                ))}
              </ul>
              <div className="stop__actions">
                <a className="btn btn--ink btn--sm" href={mapUrl(p.address, t(p.city))} target="_blank" rel="noopener noreferrer">
                  <IconPin /> {t(copy.places.route)} <IconArrow />
                </a>
                <a className="stop__phone" href={`tel:${p.tel}`}>
                  <IconPhone /> {p.phone}
                </a>
              </div>
            </div>
          </article>
        ))}

        <aside className="hours fade-up" style={{ ['--d' as string]: '400ms' }}>
          <h3 className="hours__title">{t(copy.places.hoursTitle)}</h3>
          <div className={`hours__status ${status.open ? 'is-open' : 'is-closed'}`} aria-live="polite" key={lang}>
            <span className="hours__dot" />
            <strong>{t(status.open ? copy.places.open : copy.places.closed)}</strong>
            <span>
              {t(status.open ? copy.places.until : copy.places.opensAt)} {status.time}
            </span>
          </div>
          <dl className="hours__table">
            <div>
              <dt>{t(copy.places.days.week)}</dt>
              <dd>11:00 — 24:00</dd>
            </div>
            <div>
              <dt>{t(copy.places.days.weekend)}</dt>
              <dd>11:00 — 03:00</dd>
            </div>
            <div>
              <dt>{t(copy.places.days.sun)}</dt>
              <dd>11:00 — 24:00</dd>
            </div>
          </dl>
          <p className="hours__note">{t(copy.places.orLast)}</p>
        </aside>
      </div>
    </section>
  );
}
