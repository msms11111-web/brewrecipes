export const illustratedRecipes = [
  {
    slug: 'costa-rica-fatima',
    title: 'كوستاريكا فاطمة',
    country: 'كوستاريكا',
    roastery: 'CROPS',
    brewMethod: 'V60',
    image: '/images/recipe-archive/crops-costa-rica-fatima.webp',
    coffeeGrams: 20,
    waterMl: 300,
    temperature: 94,
    duration: '2:40–2:45',
    tasting: 'كرز، رمان، برتقال، شوكولاتة',
  },
  {
    slug: 'peru-lonya-grande',
    title: 'البيرو لونيا غراندي',
    country: 'البيرو',
    roastery: 'CROPS',
    brewMethod: 'V60',
    image: '/images/recipe-archive/crops-peru-lonya-grande.webp',
    coffeeGrams: 20,
    waterMl: 300,
    temperature: 93,
    duration: '2:30–2:40',
    tasting: 'موز، توت ذهبي، ماء جوز الهند',
  },
  {
    slug: 'colombia-payanes',
    title: 'كولومبيا بيانيس',
    country: 'كولومبيا',
    roastery: 'CROPS',
    brewMethod: 'V60',
    image: '/images/recipe-archive/crops-colombia-payanes.webp',
    coffeeGrams: 20,
    waterMl: 300,
    temperature: 94,
    duration: '2:45–3:05',
    tasting: 'توت أحمر، تفاح، خوخ، برتقال وزهور',
  },
] as const;

export type IllustratedRecipe = (typeof illustratedRecipes)[number];
export function getIllustratedRecipe(slug: string) {
  return illustratedRecipes.find(recipe => recipe.slug === slug);
}
