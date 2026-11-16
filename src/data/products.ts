export const speciesList = ['perros', 'gatos'] as const;

export type Species = (typeof speciesList)[number];

export interface Product {
  slug: string;
  name: string;
  species: Species;
  weight: string;
  /** Precio en la moneda definida en `site.currency`. */
  price: number;
  image: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  featured?: boolean;
}

export const speciesInfo: Record<Species, { label: string; title: string; description: string }> = {
  perros: {
    label: 'Perros',
    title: 'Alimento para perros',
    description: 'Fórmulas pensadas para cada etapa y tamaño de tu perro.',
  },
  gatos: {
    label: 'Gatos',
    title: 'Alimento para gatos',
    description: 'Nutrición balanceada para gatitos, gatos adultos y esterilizados.',
  },
};

const placeholderImage = '/images/product-placeholder.svg';

export const products: Product[] = [
  {
    slug: 'croquetas-perro-adulto-15kg',
    name: 'Croquetas para perro adulto',
    species: 'perros',
    weight: '15 kg',
    price: 96000,
    image: placeholderImage,
    shortDescription: 'Fórmula completa para perros adultos de todas las razas.',
    description:
      'Croquetas balanceadas con proteína de alta digestibilidad, fibra para un tránsito saludable y omega 3 para una piel y pelaje brillantes.',
    benefits: ['Proteína de alta digestibilidad', 'Omega 3 para piel y pelaje', 'Fibra para un buen tránsito'],
    featured: true,
  },
  {
    slug: 'croquetas-cachorro-perro-3kg',
    name: 'Croquetas para cachorro',
    species: 'perros',
    weight: '3 kg',
    price: 48000,
    image: placeholderImage,
    shortDescription: 'Nutrición para el crecimiento de tu cachorro.',
    description:
      'Alimento formulado para cachorros en crecimiento, con calcio y fósforo balanceados para el desarrollo de huesos y dientes.',
    benefits: ['Apoya el crecimiento', 'Calcio y fósforo balanceados', 'Croqueta de tamaño fácil de masticar'],
    featured: true,
  },
  {
    slug: 'humedo-pollo-perro-400g',
    name: 'Alimento húmedo de pollo',
    species: 'perros',
    weight: '400 g',
    price: 7500,
    image: placeholderImage,
    shortDescription: 'Receta de pollo con verduras, lista para servir.',
    description:
      'Alimento húmedo con trozos de pollo y vegetales naturales. Ideal como complemento o para perros que necesitan hidratación extra.',
    benefits: ['Trozos de pollo reales', 'Ideal para hidratar', 'Listo para servir'],
  },
  {
    slug: 'croquetas-gato-adulto-2kg',
    name: 'Croquetas para gato adulto',
    species: 'gatos',
    weight: '2 kg',
    price: 58000,
    image: placeholderImage,
    shortDescription: 'Alimento completo para gatos adultos y esterilizados.',
    description:
      'Croquetas con taurina para la salud del corazón y la visión, y un contenido controlado de calorías para mantener el peso ideal.',
    benefits: ['Taurina para corazón y visión', 'Control de peso', 'Apto para gatos esterilizados'],
    featured: true,
  },
  {
    slug: 'croquetas-gatito-1-5kg',
    name: 'Croquetas para gatito',
    species: 'gatos',
    weight: '1.5 kg',
    price: 42000,
    image: placeholderImage,
    shortDescription: 'Desarrollo sano para gatitos de 1 a 12 meses.',
    description:
      'Fórmula con DHA para el desarrollo cerebral y visual, y nutrientes para fortalecer el sistema inmunológico en la etapa de crecimiento.',
    benefits: ['DHA para desarrollo cerebral', 'Fortalece defensas', 'Croqueta suave y pequeña'],
  },
  {
    slug: 'humedo-salmon-gato-85g',
    name: 'Alimento húmedo de salmón',
    species: 'gatos',
    weight: '85 g',
    price: 4200,
    image: placeholderImage,
    shortDescription: 'Sobre de salmón con textura suave.',
    description:
      'Sobre individual con salmón y textura suave que a los gatos les encanta. Perfecto como premio o para variar su dieta.',
    benefits: ['Sabor salmón', 'Textura suave', 'Porción individual'],
  },
];
