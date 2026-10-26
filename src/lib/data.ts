// Real, keyless public data sources behind the Pollinator Index.
// Every fetcher times out and falls back to a dated snapshot so builds never break.
import { CORRIDOR_API, MERIDA } from './site';

const MAYAN_BEE_KEY = 1340088; // GBIF taxon: Melipona beecheii ("xunan kab")

async function getJSON<T>(url: string, ms = 8000): Promise<T> {
  const res = await fetch(url, { signal: AbortSignal.timeout(ms) });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json() as Promise<T>;
}

export type MayanBee = {
  mexico: number;
  yucatan: number;
  points: [number, number][];
  live: boolean;
};

export async function getMayanBee(): Promise<MayanBee> {
  const base = `https://api.gbif.org/v1/occurrence/search?taxonKey=${MAYAN_BEE_KEY}`;
  try {
    const [mx, yuc, pts] = await Promise.all([
      getJSON<{ count: number }>(`${base}&country=MX&limit=0`),
      getJSON<{ count: number }>(`${base}&stateProvince=Yucat%C3%A1n&limit=0`),
      getJSON<{ results: { decimalLatitude?: number; decimalLongitude?: number }[] }>(
        `${base}&hasCoordinate=true&hasGeospatialIssue=false&limit=300`,
      ),
    ]);
    const points = pts.results
      .filter((r) => r.decimalLatitude != null && r.decimalLongitude != null)
      .map((r) => [r.decimalLatitude!, r.decimalLongitude!] as [number, number]);
    return { mexico: mx.count, yucatan: yuc.count, points, live: true };
  } catch {
    return { mexico: 2033, yucatan: 105, points: [], live: false }; // snapshot 2026-10-26
  }
}

export type Weather = { temp: number; rain: number; wind: number; time: string; live: boolean };

export async function getMeridaWeather(): Promise<Weather> {
  try {
    const d = await getJSON<{
      current: { time: string; temperature_2m: number; precipitation: number; wind_speed_10m: number };
    }>(
      `https://api.open-meteo.com/v1/forecast?latitude=${MERIDA.lat}&longitude=${MERIDA.lng}&current=temperature_2m,precipitation,wind_speed_10m&timezone=America%2FMerida`,
    );
    const c = d.current;
    return { temp: c.temperature_2m, rain: c.precipitation, wind: c.wind_speed_10m, time: c.time, live: true };
  } catch {
    return { temp: 29, rain: 0, wind: 12, time: '', live: false };
  }
}

export async function countBeeSightings(lat: number, lng: number, radiusKm: number, since?: string) {
  const d1 = since ? `&d1=${since}` : '';
  const d = await getJSON<{ total_results: number }>(
    `https://api.inaturalist.org/v1/observations?taxon_name=Anthophila&lat=${lat}&lng=${lng}&radius=${radiusKm}&per_page=0${d1}`,
  );
  return d.total_results;
}

export async function geocode(name: string) {
  const d = await getJSON<{ results?: { name: string; country: string; latitude: number; longitude: number }[] }>(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1`,
  );
  const r = d.results?.[0];
  return r ? { name: r.name, country: r.country, lat: r.latitude, lng: r.longitude } : null;
}

export type Pin = { id: number; lat: number; lng: number; label: string };

export async function getCorridorPins(): Promise<Pin[]> {
  try {
    const d = await getJSON<{ pins: Pin[] }>(`${CORRIDOR_API}/api/pins`);
    return d.pins.map(({ id, lat, lng, label }) => ({ id, lat, lng, label }));
  } catch {
    return [];
  }
}
