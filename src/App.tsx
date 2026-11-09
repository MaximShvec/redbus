import { useEffect } from 'react';
import { LangProvider, useLang } from './i18n';
import { copy } from './i18n/copy';
import { CartProvider } from './state/cart';
import { initScroll } from './lib/scroll';
import { ScrollTrigger } from './lib/gsap';
import Preloader from './components/Preloader';
import Ride from './components/Ride';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import RouteProgress from './components/RouteProgress';
import Hero from './components/Hero';
import Story from './components/Story';
import Strip from './components/Strip';
import Menu from './components/Menu';
import Drinks from './components/Drinks';
import Delivery from './components/Delivery';
import Places from './components/Places';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

function Page() {
  const { t, lang } = useLang();

  useEffect(() => {
    initScroll();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    // fonts & lazy images shift layout – refresh the triggers once they settle
    document.fonts?.ready.then(refresh);
    const id = window.setTimeout(refresh, 1500);
    return () => {
      window.removeEventListener('load', refresh);
      window.clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => window.clearTimeout(id);
  }, [lang]);

  return (
    <>
      <a className="skip-link" href="#menu">
        {t(copy.skip)}
      </a>
      <Preloader />
      <Ride />
      <Cursor />
      <Nav />
      <RouteProgress />
      <main>
        <Hero />
        <Story />
        <Strip />
        <Menu />
        <Drinks />
        <Delivery />
        <Places />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <CartProvider>
        <Page />
      </CartProvider>
    </LangProvider>
  );
}
