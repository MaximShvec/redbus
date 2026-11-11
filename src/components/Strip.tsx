import { useRef } from 'react';
import { useLang } from '../i18n';
import { copy } from '../i18n/copy';
import { gsap, useGSAP, reducedMotion } from '../lib/gsap';

/** Full-bleed photo of the real Hot pork pizza, with parallax and giant type. */
export default function Strip() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.fromTo(
        '.strip__img',
        { yPercent: -12, scale: 1.25 },
        { yPercent: 12, scale: 1.25, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
      gsap.fromTo(
        '.strip__text',
        { xPercent: 12 },
        { xPercent: -22, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <section className="strip" ref={root} aria-label={t(copy.strip)}>
      <img className="strip__img" src="/img/cheese-strip.webp" alt="" loading="lazy" decoding="async" />
      <div className="strip__veil" />
      <div className="strip__text display" aria-hidden="true">
        {t(copy.strip)} · {t(copy.strip)} ·
      </div>
    </section>
  );
}
