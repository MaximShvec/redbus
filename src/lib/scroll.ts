import Lenis from 'lenis';
import { gsap, ScrollTrigger, reducedMotion } from './gsap';

let lenis: Lenis | null = null;
let locks = 0;

export function initScroll() {
  if (lenis || reducedMotion()) return;
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function lockScroll() {
  locks += 1;
  lenis?.stop();
  document.documentElement.classList.add('is-locked');
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    lenis?.start();
    document.documentElement.classList.remove('is-locked');
  }
}

export function scrollToId(id: string, offset = 0) {
  const el = id === 'top' ? document.documentElement : document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(id === 'top' ? 0 : el, { offset, duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    const y = id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
