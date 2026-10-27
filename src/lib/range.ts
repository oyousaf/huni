// Concept range for the redesign. Names and copy are illustrative, not real products.
import type { ImageMetadata } from 'astro';
import shampoo from '../assets/images/range/shampoo.png';
import conditioner from '../assets/images/range/conditioner.png';
import bodyWash from '../assets/images/range/body-wash.png';
import hairMask from '../assets/images/range/hair-mask.png';
import soapBar from '../assets/images/range/soap-bar.png';
import handCream from '../assets/images/range/hand-cream.png';
import essentialsSet from '../assets/images/range/sets/essentials.png';
import hairRitualSet from '../assets/images/range/sets/hair-ritual.png';
import bodyRitualSet from '../assets/images/range/sets/body-ritual.png';

export type Product = {
  id: string;
  name: string;
  category: 'hair' | 'body';
  note: string;
  format: string;
  copy: string;
  image: ImageMetadata;
};

export const range: Product[] = [
  {
    id: 'shampoo',
    name: 'huni shampoo',
    category: 'hair',
    note: 'Raw honey · botanical oils',
    format: '250 ml bottle',
    copy: 'A gentle, low-foam cleanse that leaves moisture where it belongs.',
    image: shampoo,
  },
  {
    id: 'conditioner',
    name: 'huni conditioner',
    category: 'hair',
    note: 'Raw honey · keratin',
    format: '250 ml bottle',
    copy: 'Smooths the cuticle and seals in softness without weighing hair down.',
    image: conditioner,
  },
  {
    id: 'hair-mask',
    name: 'huni hair mask',
    category: 'hair',
    note: 'Raw honey · shea · keratin',
    format: '200 ml amber glass jar',
    copy: 'A rich weekly treatment for hair that feels soft, glossy and easier to style.',
    image: hairMask,
  },
  {
    id: 'body-wash',
    name: 'huni body wash',
    category: 'body',
    note: 'Raw honey · wildflower extract',
    format: '250 ml bottle',
    copy: 'A slow, golden lather for skin that feels fed, not stripped.',
    image: bodyWash,
  },
  {
    id: 'soap-bar',
    name: 'huni soap bar',
    category: 'body',
    note: 'Raw honey · beeswax · oat',
    format: '100 g bar · paper band',
    copy: 'A creamy, plastic-free bar pressed with a honeycomb pattern.',
    image: soapBar,
  },
  {
    id: 'hand-cream',
    name: 'huni hand cream',
    category: 'body',
    note: 'Raw honey · shea',
    format: '75 ml tube',
    copy: 'A soft, non-greasy cream for hands that work hard.',
    image: handCream,
  },
];

export const bundles = [
  {
    id: 'essentials',
    name: 'huni essentials',
    tagline: 'The everyday three, for hair and body.',
    items: ['shampoo', 'conditioner', 'body-wash'],
    image: essentialsSet,
  },
  {
    id: 'hair-ritual',
    name: 'huni hair ritual',
    tagline: 'Cleanse and condition daily, then mask once a week.',
    items: ['shampoo', 'conditioner', 'hair-mask'],
    image: hairRitualSet,
  },
  {
    id: 'body-ritual',
    name: 'huni body ritual',
    tagline: 'Wash, lather and finish with hand cream.',
    items: ['body-wash', 'soap-bar', 'hand-cream'],
    image: bodyRitualSet,
  },
].map((b) => ({ ...b, products: b.items.map((id) => range.find((p) => p.id === id)!) }));
