import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import { drinkById, pizzaById, type PizzaSize } from '../data/menu';

export interface CartLine {
  key: string;
  kind: 'pizza' | 'drink';
  id: number;
  size?: PizzaSize;
  qty: number;
}

type Action =
  | { type: 'add'; line: Omit<CartLine, 'qty' | 'key'> }
  | { type: 'inc'; key: string }
  | { type: 'dec'; key: string }
  | { type: 'remove'; key: string }
  | { type: 'clear' };

const keyOf = (l: Omit<CartLine, 'qty' | 'key'>) => `${l.kind}-${l.id}${l.size ? '-' + l.size : ''}`;
const STORAGE = 'redbus-cart-v1';

function reducer(state: CartLine[], a: Action): CartLine[] {
  switch (a.type) {
    case 'add': {
      const key = keyOf(a.line);
      const found = state.find((l) => l.key === key);
      if (found) return state.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + 1, 20) } : l));
      return [...state, { ...a.line, key, qty: 1 }];
    }
    case 'inc':
      return state.map((l) => (l.key === a.key ? { ...l, qty: Math.min(l.qty + 1, 20) } : l));
    case 'dec':
      return state.flatMap((l) => (l.key === a.key ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l]));
    case 'remove':
      return state.filter((l) => l.key !== a.key);
    case 'clear':
      return [];
  }
}

function load(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    // drop anything that no longer exists on the menu
    return parsed.filter((l) => (l.kind === 'pizza' ? pizzaById(l.id) && l.size : drinkById(l.id)));
  } catch {
    return [];
  }
}

export function linePrice(l: CartLine): number {
  if (l.kind === 'pizza') return (pizzaById(l.id)?.prices[l.size!] ?? 0) * l.qty;
  return (drinkById(l.id)?.price ?? 0) * l.qty;
}

interface Ctx {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (line: Omit<CartLine, 'qty' | 'key'>) => void;
  inc: (key: string) => void;
  dec: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
  qtyOf: (kind: 'pizza' | 'drink', id: number, size?: PizzaSize) => number;
}

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, [], load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((line: Omit<CartLine, 'qty' | 'key'>) => dispatch({ type: 'add', line }), []);

  const value = useMemo<Ctx>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + linePrice(l), 0),
      open,
      setOpen,
      add,
      inc: (key) => dispatch({ type: 'inc', key }),
      dec: (key) => dispatch({ type: 'dec', key }),
      remove: (key) => dispatch({ type: 'remove', key }),
      clear: () => dispatch({ type: 'clear' }),
      qtyOf: (kind, id, size) => lines.find((l) => l.key === keyOf({ kind, id, size }))?.qty ?? 0,
    }),
    [lines, open, add],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
