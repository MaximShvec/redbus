import Lenis from 'lenis';
import { gsap, ScrollTrigger, reducedMotion } from './gsap';

let lenis: Lenis | null = null;
let locks = 0;
let paused = 0;

type Ride = (id: string, arrive: () => void, done: () => void) => void;
let ride: Ride | null = null;
let busy = false;

/** Section changes play this instead of scrolling the whole page in view. */
export function setRide(fn: Ride | null) {
  ride = fn;
}

/** Freeze Lenis without toggling overflow (that would jump the scroll position). */
export function pauseScroll() {
  paused += 1;
  lenis?.stop();
}

export function resumeScroll() {
  paused = Math.max(0, paused - 1);
  if (paused === 0 && locks === 0) lenis?.start();
}

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
    document.documentElement.classList.remove('is-locked');
    if (paused === 0) lenis?.start();
  }
}

export function scrollToId(id: string, offset = 0) {
  if (busy) return;
  const el = id === 'top' ? null : document.getElementById(id);
  if (id !== 'top' && !el) return;
  const delta = id === 'top' ? window.scrollY : el!.getBoundingClientRect().top + offset;
  if (Math.abs(delta) < 48) return;

  const arrive = () => {
    if (lenis) {
      lenis.scrollTo(id === 'top' ? 0 : el!, { offset, immediate: true, force: true });
    } else {
      const y = id === 'top' ? 0 : el!.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: 'instant' });
    }
    ScrollTrigger.update();
  };

  if (reducedMotion() || !ride) {
    arrive();
    return;
  }
  busy = true;
  ride(id, arrive, () => {
    busy = false;
  });
}
