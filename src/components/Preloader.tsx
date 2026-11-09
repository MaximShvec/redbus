import { useRef, useState } from 'react';
import { gsap, useGSAP, reducedMotion } from '../lib/gsap';
import { lockScroll, unlockScroll } from '../lib/scroll';
import { BusSvg } from './ui';

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(() => reducedMotion());

  useGSAP(
    () => {
      const html = document.documentElement;
      if (reducedMotion()) {
        html.classList.add('is-ready');
        return;
      }
      const el = root.current;
      if (!el) return;
      lockScroll();
      let cancelled = false;
      let unlocked = false;
      const release = () => {
        if (unlocked) return;
        unlocked = true;
        unlockScroll();
      };

      const num = el.querySelector<HTMLElement>('.pre__num')!;
      const bus = el.querySelector<HTMLElement>('.pre__bus')!;
      const bar = el.querySelector<HTMLElement>('.pre__line i')!;
      const road = el.querySelector<HTMLElement>('.pre__road')!;
      const state = { v: 0 };
      const paint = () => {
        const v = state.v;
        num.textContent = String(Math.round(v)).padStart(3, '0');
        bar.style.transform = `scaleX(${v / 100})`;
        const max = road.clientWidth - bus.clientWidth;
        bus.style.transform = `translateX(${(v / 100) * max}px)`;
      };

      const img = new Image();
      img.src = '/img/hero-pizza.webp';
      const imgReady = new Promise<void>((res) => {
        img.decode().then(() => res(), () => res());
        window.setTimeout(res, 3500);
      });
      const fonts = document.fonts?.ready ?? Promise.resolve();

      gsap.from('.pre__brand, .pre__tag', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 });
      const first = gsap.to(state, { v: 88, duration: 1.5, ease: 'power2.out', onUpdate: paint });

      Promise.all([imgReady, fonts, new Promise((r) => first.eventCallback('onComplete', () => r(null)))]).then(() => {
        if (cancelled) return;
        gsap
          .timeline({
            onComplete: () => {
              html.classList.add('is-ready');
              release();
              setGone(true);
            },
          })
          .to(state, { v: 100, duration: 0.45, ease: 'power2.inOut', onUpdate: paint })
          .to('.pre__content', { opacity: 0, y: -30, duration: 0.45, ease: 'power2.in' }, '+=0.12')
          .add(() => html.classList.add('is-ready'), '-=0.05')
          .to('.pre__panel--top', { yPercent: -101, duration: 1, ease: 'expo.inOut' }, '<0.1')
          .to('.pre__panel--bottom', { yPercent: 101, duration: 1, ease: 'expo.inOut' }, '<');
      });

      return () => {
        cancelled = true;
        release();
      };
    },
    { scope: root },
  );

  if (gone) return null;
  return (
    <div className="pre" ref={root} aria-hidden="true">
      <div className="pre__panel pre__panel--top" />
      <div className="pre__panel pre__panel--bottom" />
      <div className="pre__content">
        <div className="pre__brand">
          RedBus<span>.lv</span>
        </div>
        <div className="pre__road">
          <div className="pre__bus">
            <BusSvg body="#fff3e1" ink="#14090a" glass="#e4202b" wheelsSpin />
          </div>
          <div className="pre__line">
            <i />
          </div>
        </div>
        <div className="pre__foot">
          <span className="pre__num">000</span>
          <span className="pre__tag">Next stop: pizza</span>
        </div>
      </div>
    </div>
  );
}
