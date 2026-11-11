// وصفات xBloom Studio المصوّرة — كل وصفة محفوظة في حساب xBloom ولها رابط مشاركة يفتحها في التطبيق.
// الصور في public/images/xbloom: ‎.webp للعرض في الصفحة و‎.png بالدقة الكاملة للتحميل.

export interface XbloomRecipe {
  slug: string
  name: string
  tag: string
  roaster: string
  origin: string
  notes: string[]
  dose: number
  water: number
  ratio: string
  height: number // ارتفاع الصورة عند عرض 1080
  shareId: string
}

const SHARE = 'https://share-h5.xbloom.com/?id='

export const xbloomRecipes: XbloomRecipe[] = [
  { slug: '01-konjo', name: 'كونجو', tag: 'مقطّرة حارة', roaster: 'Curve R', origin: 'يرقاتشيف، إثيوبيا', notes: ['حمضيات', 'توت', 'فراولة', 'ماء ورد'], dose: 15, water: 250, ratio: '1:16.7', height: 1780, shareId: '2LB%2FsC2iZ%2BD3tO1leJSKFw%3D%3D' },
  { slug: '02-mogiana', name: 'موجيانا', tag: 'قوام وشوكولاتة', roaster: 'Wonder Tree', origin: 'ميناس، البرازيل', notes: ['شوكولاتة', 'كراميل', 'مكسرات'], dose: 15, water: 225, ratio: '1:15', height: 1780, shareId: 'LH0S0z%2FMLA4xtidojZR2KA%3D%3D' },
  { slug: '03-heirloom', name: 'هيرلوم مجففة', tag: 'متوازنة', roaster: '', origin: 'سلالة هيرلوم', notes: ['تفاح', 'توت', 'شوكولاتة', 'كراميل'], dose: 15, water: 240, ratio: '1:16', height: 1780, shareId: 'y9gkJmPYTifhj5OtmvlbzQ%3D%3D' },
  { slug: '04-guji-sweet-15', name: 'قوجي', tag: 'حلوة', roaster: '', origin: 'قوجي، إثيوبيا', notes: ['توت أحمر', 'عنب', 'عطرية'], dose: 15, water: 225, ratio: '1:15', height: 1898, shareId: 'fwvkaEypwKRiYUqARmlIxA%3D%3D' },
  { slug: '05-guji-sweet-20', name: 'قوجي', tag: 'حلوة', roaster: '', origin: 'قوجي، إثيوبيا', notes: ['توت أحمر', 'عنب', 'عطرية'], dose: 20, water: 300, ratio: '1:15', height: 1898, shareId: 'sFeMvYCLEvtBzd0PpQte1A%3D%3D' },
  { slug: '06-guji-bright-15', name: 'قوجي', tag: 'حمضية', roaster: '', origin: 'قوجي، إثيوبيا', notes: ['توت أحمر', 'عنب', 'عطرية'], dose: 15, water: 255, ratio: '1:17', height: 1780, shareId: '9klNkbTjq8H5OJeg%2Fb7YiA%3D%3D' },
  { slug: '07-guji-bright-20', name: 'قوجي', tag: 'حمضية', roaster: '', origin: 'قوجي، إثيوبيا', notes: ['توت أحمر', 'عنب', 'عطرية'], dose: 20, water: 330, ratio: '1:16.5', height: 1898, shareId: 'GP7%2FbOukaenw2J46ltPPvA%3D%3D' },
  { slug: '08-fruta-22', name: 'فروتا', tag: 'حارة', roaster: 'دبليو', origin: 'أنتيوكيا، كولومبيا', notes: ['كرز', 'رمان', 'خوخ'], dose: 22, water: 330, ratio: '1:15', height: 1898, shareId: '3RyQixfhfy03VmdnuBWVCg%3D%3D' },
  { slug: '09-fruta-20', name: 'فروتا', tag: 'متوازنة', roaster: 'دبليو', origin: 'أنتيوكيا، كولومبيا', notes: ['كرز', 'رمان', 'خوخ'], dose: 20, water: 310, ratio: '1:15.5', height: 1898, shareId: 'FGV52VdkjJ5AEyd3UIbb9Q%3D%3D' },
  { slug: '10-fruta-46', name: 'فروتا', tag: '4:6 الحراري', roaster: 'دبليو', origin: 'أنتيوكيا، كولومبيا', notes: ['كرز', 'رمان', 'خوخ'], dose: 15, water: 225, ratio: '1:15', height: 2016, shareId: 'yvsc977PTieoBuNbDD71LA%3D%3D' },
  { slug: '11-fruta-21', name: 'فروتا', tag: 'فاكهية', roaster: 'دبليو', origin: 'أنتيوكيا، كولومبيا', notes: ['كرز', 'رمان', 'خوخ'], dose: 21, water: 315, ratio: '1:15', height: 1898, shareId: 'JVsckPHrY9eQ%2FiBknxkwUQ%3D%3D' },
  { slug: '12-wodesa-20', name: 'وديسا', tag: 'حلوة', roaster: 'كِفّة', origin: 'يرقاتشيف، إثيوبيا', notes: ['توت', 'كرز', 'خوخ'], dose: 20, water: 310, ratio: '1:15.5', height: 1898, shareId: 'FwlcE2u5OzOw8iFSBwtLZw%3D%3D' },
  { slug: '13-wodesa-22', name: 'وديسا', tag: 'صباحية منعشة', roaster: 'كِفّة', origin: 'يرقاتشيف، إثيوبيا', notes: ['توت', 'كرز', 'خوخ'], dose: 22, water: 352, ratio: '1:16', height: 1898, shareId: 'rKjHPjNHQeIQP7ReZTU36A%3D%3D' },
]

export const xbloomShareUrl = (r: XbloomRecipe) => SHARE + r.shareId
