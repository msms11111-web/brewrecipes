import { getFeaturedRecipes, getAllRecipes } from '@/lib/recipes';
import HomeClient from './components/HomeClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [featured, all] = await Promise.all([
    getFeaturedRecipes(3),
    getAllRecipes(),
  ]);

  return <HomeClient featuredRecipes={featured} allRecipes={all} />;
}
