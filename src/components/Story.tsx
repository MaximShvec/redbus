import { useRef } from 'react';
import { useLang } from '../i18n';
import { copy } from '../i18n/copy';
import { gsap, useGSAP, reducedMotion } from '../lib/gsap';
import { useCountUp, useInView } from '../lib/hooks';
import { BusSvg, RingText } from './ui';

function Stat({ n, label, started, delay }: { n: number; label: string; started: boolean; delay: number }) {
  const v = useCountUp(n, started, 1800);
  const text = n === 3 ? `0${v}:00` : String(v);
  return (
    <div className="stat fade-up" style={{ ['--d' as string]: `${delay}ms` }}>
      <div className="stat__n display">{text}</div>
      <p className="stat__l">{label}</p>
    </div>
  );
}

export default function Story() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const [statsRef, statsSeen] = useInView<HTMLDivElement>(0.3);
  const [headRef, headSeen] = useInView<HTMLDivElement>(0.3);
  const words = t(copy.story.text).split(' ');

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const spans = gsap.utils.toArray<HTMLElement>('.story__text .sw', root.current);
      gsap.fromTo(
        spans,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: { trigger: '.story__text', start: 'top 80%', end: 'bottom 55%', scrub: true },
        },
      );
      gsap.to('.story__ring', {
        rotate: 180,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.fromTo(
        '.story__bus',
        { x: '-14vw' },
        { x: '100vw', ease: 'none', scrollTrigger: { trigger: '.story__stats', start: 'top bottom', end: 'bottom 40%', scrub: true } },
      );
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section className="story section" id="story" ref={root}>
      <div className={`story__head ${headSeen ? 'is-in' : ''}`} ref={headRef}>
        <p className="eyebrow fade-up">{t(copy.story.eyebrow)}</p>
        <RingText className="story__ring" text="RED BUS • BEST PIZZA • JŪRMALA • RĪGA • SINCE 2008 • " />
      </div>

      <p className="story__text">
        {words.map((w, i) => (
          <span key={i + w} className={`sw ${/^(2008|ZOE|ZOE,|ZOE\.)/.test(w) ? 'is-hl' : ''}`}>
            {w}{' '}
          </span>
        ))}
      </p>

      <p className="story__text2">{t(copy.story.text2)}</p>

      <div className={`story__stats ${statsSeen ? 'is-in' : ''}`} ref={statsRef}>
        {copy.story.stats.map((s, i) => (
          <Stat key={i} n={s.n} label={t(s.label)} started={statsSeen} delay={i * 110} />
        ))}
        <div className="story__road" aria-hidden="true">
          <div className="story__bus">
            <BusSvg body="#e4202b" ink="#14090a" glass="#fff3e1" wheelsSpin />
          </div>
        </div>
      </div>
    </section>
  );
}
