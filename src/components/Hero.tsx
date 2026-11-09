import { useEffect, useRef } from 'react';
import { useLang } from '../i18n';
import { copy, PHONE_DISPLAY, PHONE_TEL } from '../i18n/copy';
import { gsap, useGSAP, reducedMotion } from '../lib/gsap';
import { scrollToId } from '../lib/scroll';
import Marquee from './Marquee';
import { IconArrow, IconPhone, Magnetic, Sticker } from './ui';

export default function Hero() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const morph = useRef<SVGFEMorphologyElement>(null);

  // outline thickness follows the viewport
  useEffect(() => {
    const set = () => morph.current?.setAttribute('radius', String(Math.min(2.8, Math.max(1.5, window.innerWidth * 0.0017))));
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(root);

      // scroll-scrubbed exit
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
        .to(q('.hero__pizza-scroll'), { yPercent: 16, scale: 1.4, rotate: 55, ease: 'none' }, 0)
        .to(q('.hero__line--1'), { xPercent: -16, ease: 'none' }, 0)
        .to(q('.hero__line--2'), { xPercent: 12, ease: 'none' }, 0)
        .to(q('.hero__sticker'), { y: -140, rotate: 70, ease: 'none' }, 0)
        .to(q('.hero__bottom'), { opacity: 0, y: -70, ease: 'none' }, 0);

      // pointer parallax (desktop)
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const px = gsap.quickTo(q('.hero__pizza-mouse')[0], 'x', { duration: 1.1, ease: 'power3.out' });
        const py = gsap.quickTo(q('.hero__pizza-mouse')[0], 'y', { duration: 1.1, ease: 'power3.out' });
        const sx = gsap.quickTo(q('.hero__sticker-mouse')[0], 'x', { duration: 1.4, ease: 'power3.out' });
        const sy = gsap.quickTo(q('.hero__sticker-mouse')[0], 'y', { duration: 1.4, ease: 'power3.out' });
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          px(nx * -34);
          py(ny * -26);
          sx(nx * 60);
          sy(ny * 44);
        };
        window.addEventListener('pointermove', move, { passive: true });
        return () => window.removeEventListener('pointermove', move);
      }
    },
    { scope: root },
  );

  return (
    <section className="hero" id="top" ref={root}>
      <h1 className="sr-only">Next stop: pizza — RedBus.lv</h1>

      <svg className="sr-only" width="0" height="0" aria-hidden="true" focusable="false">
        <filter id="rb-outline" x="-4%" y="-25%" width="108%" height="150%" colorInterpolationFilters="sRGB">
          <feMorphology ref={morph} in="SourceAlpha" operator="dilate" radius="2.4" result="grown" />
          <feComposite in="grown" in2="SourceAlpha" operator="out" result="ring" />
          <feFlood floodColor="#fff3df" result="ink" />
          <feComposite in="ink" in2="ring" operator="in" />
        </filter>
      </svg>

      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__stage">
        <div className="hero__line hero__line--1 display" aria-hidden="true">
          <span className="hero__mask">
            <span className="hero__word">Next stop</span>
          </span>
        </div>

        <div className="hero__pizza-scroll">
          <div className="hero__pizza-mouse">
            <div className="hero__pizza">
              <div className="hero__pizza-spin">
                <img src="/img/hero-pizza.webp" alt="Pizza Hot Pork — bacon, jalapeño, spring onion" width="1200" height="1200" fetchPriority="high" decoding="async" />
              </div>
            </div>
          </div>
        </div>

        <div className="hero__line hero__line--2 display" aria-hidden="true">
          <span className="hero__mask">
            <span className="hero__word">Pizza</span>
          </span>
        </div>

        <div className="hero__sticker">
          <div className="hero__sticker-mouse">
            <Sticker className="hero__sticker-el" style={{ ['--size' as string]: 'clamp(118px, 12vw, 190px)' }}>
              best
              <br />
              pizza
              <br />
              guaranteed
            </Sticker>
          </div>
        </div>
      </div>

      <div className="hero__bottom">
        <p className="eyebrow hero__eyebrow">{t(copy.hero.eyebrow)}</p>
        <p className="hero__sub">{t(copy.hero.sub)}</p>
        <div className="hero__cta">
          <Magnetic>
            <button className="btn" onClick={() => scrollToId('menu')}>
              {t(copy.hero.cta1)} <IconArrow />
            </button>
          </Magnetic>
          <Magnetic>
            <a className="btn btn--ghost" href={`tel:${PHONE_TEL}`}>
              <IconPhone /> {PHONE_DISPLAY}
            </a>
          </Magnetic>
        </div>
      </div>

      <Marquee className="hero__marquee" items={copy.ticker.map((x) => t(x))} />
    </section>
  );
}
