import { animate, inView, scroll } from 'motion';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initMotion() {
  if (reduced) return;

  // Sections and cards rise in like honey settling.
  inView(
    '[data-reveal]',
    (el) => {
      const delay = Number((el as HTMLElement).dataset.delay ?? 0);
      animate(el, { opacity: [0, 1], y: [28, 0] }, { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] });
    },
    { margin: '0px 0px -10% 0px' },
  );

  // Hex stats fill up and count from zero.
  inView('[data-count]', (el) => {
    const node = el as HTMLElement;
    const target = Number(node.dataset.count);
    const decimals = Number(node.dataset.decimals ?? 0);
    const fmt = { minimumFractionDigits: decimals, maximumFractionDigits: decimals };
    animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (node.textContent = v.toLocaleString('en-GB', fmt)),
    });
  });

  // Slow drift on hero imagery.
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    scroll(animate(el, { y: ['0%', '18%'], scale: [1.08, 1.12] }, { ease: 'linear' }), {
      target: el.parentElement ?? undefined,
      offset: ['start start', 'end start'],
    });
  });

  // The bee follows its dotted flight path as the page scrolls.
  // The path is drawn in a stretched 64×1000 viewBox, so map points back to pixels.
  // The bee flies the path for most of the page, then lands on the back-to-top hexagon.
  const box = document.querySelector<HTMLElement>('#flight');
  const path = document.querySelector<SVGPathElement>('#flight-path');
  const bee = document.querySelector<SVGSVGElement>('#flight-bee');
  const toTop = document.querySelector<HTMLElement>('#to-top');
  const LAND = 0.93;
  const mix = (from: number, to: number, t: number) => from + (to - from) * t;
  if (box && path && bee) {
    const len = path.getTotalLength();
    scroll((p: number) => {
      const sx = box.clientWidth / 64;
      const sy = box.clientHeight / 1000;
      const at = Math.min(len - 2, (Math.min(p, LAND) / LAND) * len);
      const a = path.getPointAtLength(at);
      const b = path.getPointAtLength(at + 2);
      let x = a.x * sx;
      let y = a.y * sy;
      let angle = (Math.atan2((b.y - a.y) * sy, (b.x - a.x) * sx) * 180) / Math.PI;
      if (p > LAND && toTop?.dataset.visible === 'true') {
        const t = 1 - (1 - (p - LAND) / (1 - LAND)) ** 3;
        const btn = toTop.getBoundingClientRect();
        const origin = box.getBoundingClientRect();
        x = mix(x, btn.left + btn.width / 2 - origin.left, t);
        y = mix(y, btn.top + 3 - origin.top, t);
        angle = mix(angle, -90, t);
      }
      bee.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle}deg)`;
    });
  }
}
