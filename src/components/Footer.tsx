import { useRef } from 'react';
import { useLang } from '../i18n';
import { copy, COMPANY, PHONE_DISPLAY, PHONE_TEL } from '../i18n/copy';
import { scrollToId } from '../lib/scroll';
import { useInView } from '../lib/hooks';
import { gsap, useGSAP, reducedMotion } from '../lib/gsap';
import { BusSvg, IconArrowUp, IconFacebook, IconInstagram, IconPhone, Magnetic, Sticker } from './ui';

export default function Footer() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const [ref, seen] = useInView<HTMLDivElement>(0.2);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.fromTo(
        '.footer__bus',
        { x: '-30vw' },
        { x: '110vw', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } },
      );
      gsap.fromTo(
        '.footer__mark',
        { yPercent: 30 },
        { yPercent: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <footer className="footer" ref={root}>
      <div className={`footer__cta ${seen ? 'is-in' : ''}`} ref={ref}>
        <h2 className="footer__title display" aria-label="Next stop: pizza">
          <span className="footer__mask">
            <span className="footer__line footer__line--1">{t(copy.footer.cta1)}</span>
          </span>
          <span className="footer__mask">
            <span className="footer__line footer__line--2">{t(copy.footer.cta2)}</span>
          </span>
        </h2>
        <Sticker className="footer__sticker" style={{ ['--size' as string]: 'clamp(110px, 13vw, 200px)' }}>
          call
          <br />
          now
        </Sticker>
        <div className="footer__call fade-up" style={{ ['--d' as string]: '400ms' }}>
          <Magnetic strength={0.2}>
            <a className="footer__phone display" href={`tel:${PHONE_TEL}`} data-cursor="CALL">
              <IconPhone /> {PHONE_DISPLAY}
            </a>
          </Magnetic>
          <p>{t(copy.footer.call)}</p>
        </div>
      </div>

      <div className="footer__road" aria-hidden="true">
        <div className="footer__bus">
          <BusSvg body="#fff3e1" ink="#14090a" glass="#e4202b" wheelsSpin />
        </div>
      </div>

      <div className="footer__grid">
        <div className="footer__col">
          <h3>{t(copy.footer.info)}</h3>
          <ul>
            {(
              [
                ['story', copy.nav.story],
                ['menu', copy.nav.menu],
                ['drinks', copy.nav.drinks],
                ['delivery', copy.nav.delivery],
                ['places', copy.nav.places],
              ] as const
            ).map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(id);
                  }}
                >
                  {t(label)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3>{t(copy.nav.places)}</h3>
          <ul>
            {copy.places.list.map((p) => (
              <li key={p.address}>
                <span className="footer__city">{t(p.city)}</span>
                <br />
                {p.address}
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3>{t(copy.footer.social)}</h3>
          <ul className="footer__social">
            <li>
              <a href="https://www.facebook.com/RedBus.lv" target="_blank" rel="noopener noreferrer">
                <IconFacebook /> Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/redbus.lv_pizza/" target="_blank" rel="noopener noreferrer">
                <IconInstagram /> Instagram
              </a>
            </li>
            <li>
              <a href="mailto:info@redbus.lv">info@redbus.lv</a>
            </li>
          </ul>
        </div>

        <div className="footer__col footer__col--company">
          <h3>{t(copy.footer.company)}</h3>
          <p>
            {COMPANY.name}
            <br />
            {t(copy.footer.reg)} {COMPANY.reg}
            <br />
            {t(copy.footer.vat)} {COMPANY.vat}
            <br />
            {t(copy.footer.legal)}: {COMPANY.legal}
            <br />
            {t(copy.footer.bank)}: {COMPANY.bank}
            <br />
            {t(copy.footer.account)}: {COMPANY.iban} · {COMPANY.bic}
          </p>
        </div>
      </div>

      <div className="footer__mark display" aria-hidden="true">
        RedBus<span>.lv</span>
      </div>

      <div className="footer__bar">
        <p>© {new Date().getFullYear()} RedBus.lv · {t(copy.footer.fineprint)}</p>
        <button className="footer__top" onClick={() => scrollToId('top')}>
          {t(copy.footer.top)} <IconArrowUp />
        </button>
      </div>
    </footer>
  );
}
