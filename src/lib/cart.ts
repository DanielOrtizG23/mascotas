import type { Product } from '../data/products';

export const CART_STORAGE_KEY = 'dispensario-mascotas:cart';

export interface CartItem {
  slug: string;
  quantity: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
  subtotal: number;
}

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as CartItem;
  return typeof item.slug === 'string' && Number.isInteger(item.quantity) && item.quantity > 0;
}

export function parseCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

export function addItem(items: CartItem[], slug: string, quantity = 1): CartItem[] {
  if (!items.some((item) => item.slug === slug)) {
    return [...items, { slug, quantity }];
  }
  return items.map((item) => (item.slug === slug ? { ...item, quantity: item.quantity + quantity } : item));
}

export function setQuantity(items: CartItem[], slug: string, quantity: number): CartItem[] {
  if (quantity <= 0) return removeItem(items, slug);
  return items.map((item) => (item.slug === slug ? { ...item, quantity } : item));
}

export function removeItem(items: CartItem[], slug: string): CartItem[] {
  return items.filter((item) => item.slug !== slug);
}

export function countItems(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

/** Cruza el carrito con el catálogo; descarta productos que ya no existen. */
export function resolveCart(items: CartItem[], catalog: Product[]): CartLine[] {
  return items.flatMap((item) => {
    const product = catalog.find((p) => p.slug === item.slug);
    if (!product) return [];
    return [{ product, quantity: item.quantity, subtotal: product.price * item.quantity }];
  });
}

export function buildWhatsAppUrl(
  whatsappNumber: string,
  lines: CartLine[],
  format: (value: number) => string,
): string {
  const total = lines.reduce((sum, line) => sum + line.subtotal, 0);
  const details = lines
    .map((line) => `• ${line.quantity} x ${line.product.name} (${line.product.weight}) - ${format(line.subtotal)}`)
    .join('\n');
  const text = `Hola, quisiera hacer este pedido:\n\n${details}\n\nTotal estimado: ${format(total)}`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}
