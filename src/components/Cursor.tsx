import { useEffect, useRef } from 'react';
import { gsap, reducedMotion } from '../lib/gsap';
import { BusSvg } from './ui';

const TRAIL = 7;

/**
 * "Route" cursor (desktop / fine pointer only):
 *  - a small yellow bus that turns towards the direction of travel and leans with vertical speed
 *  - a trail of "route dots" that snake behind it
 *  - over links / buttons it becomes a round bus-stop sign (with a label from data-cursor)
 *  - a click "honks" (expanding ring)
 */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const bus = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const busEl = bus.current;
    const trailEl = trail.current;
    if (!el || !busEl || !trailEl || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const calm = reducedMotion();
    const html = document.documentElement;
    html.classList.add('has-cursor');

    const dots = Array.from(trailEl.children) as HTMLElement[];
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    const chain = dots.map(() => ({ x: -100, y: -100 }));
    let face = 1; // 1 = looking right, -1 = left (smoothed)
    let faceTarget = 1;
    let seen = false;
    let t = 0;

    const setBus = gsap.quickSetter(busEl, 'css');

    const tick = (_time: number, deltaTime: number) => {
      const dt = Math.min(deltaTime / 16.67, 3);
      const k = 1 - Math.pow(1 - 0.34, dt);
      const px = pos.x;
      const py = pos.y;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      const vx = (pos.x - px) / dt;
      const vy = (pos.y - py) / dt;
      const speed = Math.hypot(vx, vy);
      t += dt;

      gsap.set(el, { x: pos.x, y: pos.y });

      if (Math.abs(vx) > 1.1) faceTarget = vx > 0 ? 1 : -1;
      face += (faceTarget - face) * (1 - Math.pow(1 - 0.2, dt));
      const lean = Math.max(-16, Math.min(16, vy * 1.1)) * faceTarget;
      const bob = calm ? 0 : Math.sin(t * 0.9) * Math.min(1.6, speed * 0.25);
      setBus({ scaleX: face, rotation: lean, y: bob });

      if (calm) return;
      let lx = pos.x;
      let ly = pos.y;
      for (let i = 0; i < dots.length; i++) {
        const c = chain[i];
        const kk = 1 - Math.pow(1 - 0.3, dt);
        c.x += (lx - c.x) * kk;
        c.y += (ly - c.y) * kk;
        // offset the first dot behind the bus
        dots[i].style.transform = `translate3d(${c.x - pos.x}px, ${c.y - pos.y}px, 0)`;
        lx = c.x;
        ly = c.y;
      }
    };
    gsap.ticker.add(tick);

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!seen) {
        seen = true;
        pos.x = target.x;
        pos.y = target.y;
        chain.forEach((c) => {
          c.x = target.x;
          c.y = target.y;
        });
      }
      el.classList.add('is-on');
    };
    const over = (e: PointerEvent) => {
      const t0 = (e.target as Element | null)?.closest<HTMLElement>('a, button, input, [data-cursor], [role="button"]');
      el.classList.toggle('is-hover', !!t0);
      const text = t0?.dataset.cursor;
      el.classList.toggle('is-label', !!text);
      if (label.current) label.current.textContent = text ?? '';
    };
    const leave = () => el.classList.remove('is-on');
    const down = (e: PointerEvent) => {
      el.classList.add('is-down');
      const ring = document.createElement('div');
      ring.className = 'cursor__honk';
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
      document.body.appendChild(ring);
      gsap.fromTo(
        ring,
        { scale: 0.3, opacity: 0.9 },
        { scale: 2.6, opacity: 0, duration: 0.7, ease: 'power3.out', onComplete: () => ring.remove() },
      );
    };
    const up = () => el.classList.remove('is-down');

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      gsap.ticker.remove(tick);
      html.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <div className="cursor__trail" ref={trail}>
        {Array.from({ length: TRAIL }, (_, i) => (
          <i key={i} style={{ ['--i' as string]: i }} />
        ))}
      </div>
      <div className="cursor__stop">
        <span className="cursor__label" ref={label} />
      </div>
      <div className="cursor__bus-wrap">
        <div className="cursor__bus" ref={bus}>
          <BusSvg body="#ffc93c" glass="#fff3e1" label="" wheelsSpin />
        </div>
      </div>
    </div>
  );
}
