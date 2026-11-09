import { useMemo, useRef } from 'react';
import { useLang } from '../i18n';
import { copy, PHONE_DISPLAY, PHONE_TEL } from '../i18n/copy';
import { gsap, useGSAP, reducedMotion } from '../lib/gsap';
import { useInView } from '../lib/hooks';
import { BusSvg, IconPhone, Magnetic, Sticker, Words } from './ui';

/** deterministic pseudo random so SSR/CSR and re-renders match */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function Skyline({ seed, color, lit, className }: { seed: number; color: string; lit: boolean; className?: string }) {
  const shapes = useMemo(() => {
    const r = rng(seed);
    const out: { x: number; w: number; h: number; wins: { x: number; y: number; on: boolean; tw: boolean }[] }[] = [];
    let x = -20;
    while (x < 1620) {
      const w = 50 + Math.floor(r() * 90);
      const h = 70 + Math.floor(r() * 190);
      const wins: { x: number; y: number; on: boolean; tw: boolean }[] = [];
      if (lit) {
        for (let wy = 16; wy < h - 14; wy += 20) {
          for (let wx = 10; wx < w - 12; wx += 18) {
            if (r() > 0.55) wins.push({ x: wx, y: wy, on: r() > 0.35, tw: r() > 0.85 });
          }
        }
      }
      out.push({ x, w, h, wins });
      x += w + Math.floor(r() * 12);
    }
    return out;
  }, [seed, lit]);

  return (
    <svg className={className} viewBox="0 0 1600 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      {shapes.map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${300 - b.h})`}>
          <rect width={b.w} height={b.h + 2} fill={color} />
          {b.wins.map((w, j) => (
            <rect key={j} x={w.x} y={w.y} width="8" height="11" rx="1.5" fill={w.on ? '#ffc93c' : '#2b2f5a'} className={w.tw ? 'win-tw' : undefined} opacity={w.on ? 0.9 : 0.7} />
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function Delivery() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const [headRef, headSeen] = useInView<HTMLDivElement>(0.2);
  const [gridRef, gridSeen] = useInView<HTMLDivElement>(0.15);
  const [stepsRef, stepsSeen] = useInView<HTMLOListElement>(0.2);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const st = { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true };
      gsap.fromTo(
        '.delivery__bus',
        { x: '-30vw' },
        { x: '104vw', ease: 'none', scrollTrigger: { trigger: '.delivery__road', start: 'top 92%', end: 'bottom 22%', scrub: 0.6 } },
      );
      gsap.fromTo('.delivery__city--far', { xPercent: 2 }, { xPercent: -4, ease: 'none', scrollTrigger: st });
      gsap.fromTo('.delivery__city--near', { xPercent: 4 }, { xPercent: -9, ease: 'none', scrollTrigger: st });
      gsap.fromTo('.delivery__stars', { yPercent: 0 }, { yPercent: 18, ease: 'none', scrollTrigger: st });
      gsap.fromTo(
        '.delivery__photo-inner',
        { yPercent: -7, rotate: -2.5 },
        { yPercent: 7, rotate: 2, ease: 'none', scrollTrigger: { trigger: '.delivery__photo', start: 'top bottom', end: 'bottom top', scrub: true } },
      );
      gsap.fromTo(
        '.delivery__amount',
        { yPercent: 6 },
        { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.delivery__big', start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section className="delivery" id="delivery" ref={root}>
      <div className="delivery__stars" aria-hidden="true" />

      <div className="delivery__inner">
        <div className={`delivery__head ${headSeen ? 'is-in' : ''}`} ref={headRef}>
          <p className="eyebrow fade-up">{t(copy.delivery.eyebrow)}</p>
          <h2 className="delivery__title display">
            <Words text={t(copy.delivery.title)} />
          </h2>
        </div>

        <div className={`delivery__grid ${gridSeen ? 'is-in' : ''}`} ref={gridRef}>
          <div className="delivery__left">
            <div className="delivery__big fade-up" style={{ ['--d' as string]: '150ms' }}>
              <span className="delivery__from">{t(copy.delivery.from)}</span>
              <span className="delivery__amount display">1&nbsp;€</span>
            </div>
            <p className="delivery__text fade-up" style={{ ['--d' as string]: '250ms' }}>
              {t(copy.delivery.text)}
            </p>
            <ul className="zones fade-up" style={{ ['--d' as string]: '350ms' }}>
              {copy.delivery.zones.map((z, i) => (
                <li key={i}>{t(z)}</li>
              ))}
            </ul>
            <div className="delivery__free fade-up" style={{ ['--d' as string]: '450ms' }}>
              <span className="delivery__free-dot" />
              <div>
                <strong>{t(copy.delivery.free)}</strong>
                <small>{t(copy.delivery.freeNote)}</small>
              </div>
            </div>
            <div className="fade-up" style={{ ['--d' as string]: '550ms' }}>
              <Magnetic>
                <a className="btn" href={`tel:${PHONE_TEL}`}>
                  <IconPhone /> {PHONE_DISPLAY}
                </a>
              </Magnetic>
            </div>
          </div>

          <figure className="delivery__photo fade-up" style={{ ['--d' as string]: '200ms' }}>
            <div className="delivery__photo-inner">
              <img src="/img/courier.webp" alt="RedBus.lv courier with a box of pizza next to the red delivery car" loading="lazy" decoding="async" width="1200" height="680" />
              <Sticker className="delivery__sticker" style={{ ['--size' as string]: 'clamp(96px, 11vw, 150px)' }}>
                hot
                <br />
                &amp; fast
              </Sticker>
            </div>
          </figure>
        </div>

        <ol className={`steps ${stepsSeen ? 'is-in' : ''}`} ref={stepsRef}>
          {copy.delivery.steps.map((s, i) => (
            <li key={i} className="step fade-up" style={{ ['--d' as string]: `${i * 130}ms` }}>
              <span className="step__n display">0{i + 1}</span>
              <h3 className="step__t">{t(s.t)}</h3>
              <p className="step__d">{t(s.d)}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="delivery__road" aria-hidden="true">
        <Skyline seed={7} color="#191d42" lit={false} className="delivery__city delivery__city--far" />
        <Skyline seed={21} color="#0a0c1c" lit className="delivery__city delivery__city--near" />
        <div className="delivery__bus">
          <div className="delivery__beam" />
          <BusSvg body="#e4202b" ink="#0a0c1c" glass="#ffc93c" wheelsSpin label="PIZZA" />
        </div>
        <div className="delivery__asphalt">
          <i />
        </div>
      </div>
    </section>
  );
}
