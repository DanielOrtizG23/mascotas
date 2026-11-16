import { products } from '../data/products';
import { site } from '../data/site';
import { formatPrice } from '../lib/format';
import {
  CART_STORAGE_KEY,
  addItem,
  buildWhatsAppUrl,
  countItems,
  parseCart,
  removeItem,
  resolveCart,
  setQuantity,
  type CartItem,
  type CartLine,
} from '../lib/cart';

let items: CartItem[] = parseCart(window.localStorage.getItem(CART_STORAGE_KEY));

function persist(): void {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  render();
}

function render(): void {
  document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((el) => {
    el.textContent = String(countItems(items));
  });

  const list = document.querySelector<HTMLUListElement>('[data-cart-list]');
  if (list) renderCartPage(list, resolveCart(items, products));
}

function renderCartPage(list: HTMLUListElement, lines: CartLine[]): void {
  const hasItems = lines.length > 0;
  const empty = document.querySelector<HTMLElement>('[data-cart-empty]');
  const summary = document.querySelector<HTMLElement>('[data-cart-summary]');
  const total = document.querySelector<HTMLElement>('[data-cart-total]');
  const checkout = document.querySelector<HTMLAnchorElement>('[data-whatsapp-checkout]');

  list.replaceChildren(...lines.map(createLine));
  list.hidden = !hasItems;
  if (empty) empty.hidden = hasItems;
  if (summary) summary.hidden = !hasItems;

  if (total) total.textContent = formatPrice(lines.reduce((sum, line) => sum + line.subtotal, 0));
  if (checkout) checkout.href = buildWhatsAppUrl(site.whatsappNumber, lines, formatPrice);
}

function createElement<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, text?: string): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function createLine(line: CartLine): HTMLLIElement {
  const { product, quantity, subtotal } = line;
  const li = createElement('li', 'cart-line');

  const info = createElement('div', 'cart-line__info');
  info.append(
    createElement('h3', 'cart-line__name', product.name),
    createElement('p', 'cart-line__meta', `${product.weight} · ${formatPrice(product.price)} c/u`),
  );

  const controls = createElement('div', 'cart-line__controls');
  controls.append(
    createQtyButton('dec', product.slug, '−', 'Disminuir cantidad'),
    createElement('span', 'cart-line__qty', String(quantity)),
    createQtyButton('inc', product.slug, '+', 'Aumentar cantidad'),
  );

  const price = createElement('p', 'cart-line__subtotal', formatPrice(subtotal));

  const remove = createElement('button', 'cart-line__remove', 'Quitar');
  remove.type = 'button';
  remove.dataset.cartAction = 'remove';
  remove.dataset.slug = product.slug;

  li.append(info, controls, price, remove);
  return li;
}

function createQtyButton(action: 'inc' | 'dec', slug: string, label: string, ariaLabel: string): HTMLButtonElement {
  const button = createElement('button', 'qty-btn', label);
  button.type = 'button';
  button.dataset.cartAction = action;
  button.dataset.slug = slug;
  button.setAttribute('aria-label', ariaLabel);
  return button;
}

function flash(button: HTMLButtonElement): void {
  const original = button.textContent;
  button.textContent = '¡Agregado!';
  button.classList.add('is-added');
  window.setTimeout(() => {
    button.textContent = original;
    button.classList.remove('is-added');
  }, 1200);
}

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;

  const addButton = event.target.closest<HTMLButtonElement>('[data-add-to-cart]');
  if (addButton?.dataset.addToCart) {
    items = addItem(items, addButton.dataset.addToCart);
    persist();
    flash(addButton);
    return;
  }

  const actionButton = event.target.closest<HTMLButtonElement>('[data-cart-action]');
  const slug = actionButton?.dataset.slug;
  if (!actionButton || !slug) return;

  const current = items.find((item) => item.slug === slug)?.quantity ?? 0;
  switch (actionButton.dataset.cartAction) {
    case 'inc':
      items = setQuantity(items, slug, current + 1);
      break;
    case 'dec':
      items = setQuantity(items, slug, current - 1);
      break;
    case 'remove':
      items = removeItem(items, slug);
      break;
    default:
      return;
  }
  persist();
});

render();
