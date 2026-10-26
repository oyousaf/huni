// FAOSTAT "Crops and livestock products" (QCL), bulk release dated 2025-12-31.
// Mexico, area code 138. The FAOSTAT API needs a token, so these are a checked snapshot.
export const faoMexico = {
  source: 'FAOSTAT',
  url: 'https://www.fao.org/faostat/en/#data/QCL',
  honeyTonnes: { year: 2024, value: 57430 }, // item 1182 "Natural honey", official figure
  worldRank: { year: 2024, value: 10 }, // among countries, by honey production
  beehives: { year: 2023, value: 2201329 }, // item 1181 "Bees" stocks, latest official figure
  honeyTonnes1961: 24000,
};
