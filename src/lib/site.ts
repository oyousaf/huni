export const site = {
  name: 'huni',
  tagline: 'pure beauty, powered by bees',
  description:
    'Unofficial concept redesign of huni — small-batch hair & body care made with organic raw honey from Mayan beekeepers in Yucatán.',
  disclaimer:
    'Unofficial concept redesign for portfolio purposes. Not affiliated with, endorsed by or connected to huni Beauty Limited.',
  original: 'https://www.beehuni.com',
};

export const nav = [
  { href: '/honey', label: 'Our honey' },
  { href: '/origin', label: 'Origin' },
  { href: '/pollinator-index', label: 'Pollinator Index' },
  { href: '/shop', label: 'The range' },
];

// Mérida, Yucatán — where the honey comes from.
export const MERIDA = { lat: 20.97, lng: -89.62 };

// Public, read-only endpoint of the live brand's corridor API. Never POST to it.
export const CORRIDOR_API = 'https://huni-corridor-api.polly-c13.workers.dev';
