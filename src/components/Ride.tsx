import { useEffect, useRef } from 'react';
import { useLang, type L } from '../i18n';
import { copy } from '../i18n/copy';
import { gsap } from '../lib/gsap';
import { pauseScroll, resumeScroll, setRide } from '../lib/scroll';
import { BusSvg } from './ui';

const STOPS: Record<string, L> = {
  story: copy.nav.story,
  menu: copy.nav.menu,
  drinks: copy.nav.drinks,
  delivery: copy.nav.delivery,
  places: copy.nav.places,
};

/** Covers an anchor jump: the bus "changes stops" while the page moves underneath. */
export default function Ride() {
  const root = useRef<HTMLDivElement>(null);
  const kicker = useRef<HTMLParagraphElement>(null);
  const name = useRef<HTMLParagraphElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    let tl: gsap.core.Timeline | null = null;
    let held = false;
    const release = () => {
      if (!held) return;
      held = false;
      resumeScroll();
      root.current?.classList.remove('is-on');
    };

    setRide((id, arrive, done) => {
      const el = root.current;
      if (!el || !kicker.current || !name.current) {
        arrive();
        done();
        return;
      }
      kicker.current.textContent = t(id === 'top' ? copy.ride.home : copy.ride.next);
      name.current.textContent = id === 'top' ? 'RedBus.lv' : t(STOPS[id] ?? copy.nav.menu);

      const bus = el.querySelector<HTMLElement>('.ride__bus')!;
      const road = el.querySelector<HTMLElement>('.ride__road')!;
      const travel = () => Math.max(0, road.clientWidth - bus.clientWidth);

      held = true;
      pauseScroll();
      el.classList.add('is-on');

      tl = gsap
        .timeline({
          onComplete: () => {
            release();
            done();
          },
          onInterrupt: () => {
            release();
            done();
          },
        })
        .set(bus, { x: 0 })
        .fromTo('.ride__panel--top', { yPercent: -100 }, { yPercent: 0, duration: 0.5, ease: 'expo.inOut' }, 0)
        .fromTo('.ride__panel--bottom', { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: 'expo.inOut' }, 0)
        .to(bus, { x: travel, duration: 0.85, ease: 'power2.inOut' }, 0.12)
        .add(arrive, 0.46)
        .to('.ride__panel--top', { yPercent: -100, duration: 0.55, ease: 'expo.inOut' }, 0.95)
        .to('.ride__panel--bottom', { yPercent: 100, duration: 0.55, ease: 'expo.inOut' }, 0.95);
    });

    return () => {
      tl?.kill();
      release();
      setRide(null);
    };
  }, [t, lang]);

  return (
    <div className="ride" ref={root} aria-hidden="true">
      <div className="ride__panel ride__panel--top">
        <div className="ride__card">
          <p className="ride__kicker" ref={kicker}>
            {t(copy.ride.next)}
          </p>
          <p className="ride__name" ref={name}>
            RedBus.lv
          </p>
        </div>
      </div>
      <div className="ride__panel ride__panel--bottom">
        <div className="ride__road">
          <div className="ride__bus">
            <BusSvg body="#fff3e1" ink="#14090a" glass="#e4202b" wheelsSpin />
          </div>
          <i className="ride__dashes" />
        </div>
      </div>
    </div>
  );
}
