import type { Recipe } from '@/app/types';
import ImageField from './admin/ImageField';

const coffeeTypes = ['V60', 'Espresso', 'Chemex', 'Cold Brew', 'Origami', 'Kalita Wave', 'Aeropress', 'French Press'];
const roastLevels = ['Light', 'Medium', 'Medium-Dark', 'Dark'];

// نموذج مشترك بين صفحتي الإضافة والتعديل — يعمل مع Server Actions
export default function RecipeForm({
  action,
  recipe,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  recipe?: Recipe;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-6">
      {/* Image */}
      <section className="card p-8 rounded-3xl">
        <h2 className="font-semibold text-lg mb-1">صورة الوصفة</h2>
        <p className="text-sm opacity-60 mb-5">ارفع صورة من جهازك أو اخترها من مكتبة الصور. لا تُوضع صور افتراضية.</p>
        <ImageField name="image_url" defaultValue={recipe?.image_url} />
      </section>

      {/* Basics */}
      <section className="card p-8 rounded-3xl space-y-6">
        <h2 className="font-semibold text-lg">المعلومات الأساسية</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2">اسم الوصفة *</label>
            <input name="title" required className="input" placeholder="V60 - إثيوبيا يرغاتشيف" defaultValue={recipe?.title} />
          </div>
          <div>
            <label className="block text-sm mb-2">الرابط (Slug — يُولَّد تلقائياً إذا تُرك فارغاً)</label>
            <input name="slug" className="input" placeholder="v60-ethiopia-yirgacheffe" defaultValue={recipe?.slug} dir="ltr" />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">وصف مختصر</label>
          <textarea name="description" rows={3} className="input" placeholder="وصف مختصر وجذّاب عن الوصفة ونكهاتها..." defaultValue={recipe?.description}></textarea>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm mb-2">طريقة التحضير</label>
            <select name="coffee_type" className="input" defaultValue={recipe?.coffee_type ?? 'V60'}>
              {coffeeTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">المحمصة</label>
            <input name="roastery" className="input" placeholder="Blue Bottle" defaultValue={recipe?.roastery} />
          </div>
          <div>
            <label className="block text-sm mb-2">اسم المحصول / بلد المنشأ</label>
            <input name="origin_country" className="input" placeholder="إثيوبيا يرغاتشيف" defaultValue={recipe?.origin_country} />
          </div>
          <div>
            <label className="block text-sm mb-2">درجة التحميص</label>
            <select name="roast_level" className="input" defaultValue={recipe?.roast_level ?? 'Medium'}>
              {roastLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">السعر (ر.س)</label>
          <input name="price" type="number" step="0.5" min="0" className="input max-w-40" defaultValue={recipe?.price ?? 45} />
        </div>
      </section>

      {/* Brewing parameters */}
      <section className="card p-8 rounded-3xl space-y-6">
        <h2 className="font-semibold text-lg">مقادير التحضير</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div>
            <label className="block text-sm mb-2">البن (جرام)</label>
            <input name="coffee_grams" type="number" min="1" className="input" defaultValue={recipe?.coffee_grams ?? 15} />
          </div>
          <div>
            <label className="block text-sm mb-2">الماء (مل)</label>
            <input name="water_ml" type="number" min="1" className="input" defaultValue={recipe?.water_ml ?? 250} />
          </div>
          <div>
            <label className="block text-sm mb-2">الحرارة (°م)</label>
            <input name="temperature" type="number" min="0" max="100" className="input" defaultValue={recipe?.temperature ?? 92} />
          </div>
          <div>
            <label className="block text-sm mb-2">الوقت (ثانية)</label>
            <input name="brew_time" type="number" min="1" className="input" defaultValue={recipe?.brew_time ?? 180} />
          </div>
          <div>
            <label className="block text-sm mb-2">درجة الطحن</label>
            <input name="grind_size" className="input" placeholder="متوسط ناعم" defaultValue={recipe?.grind_size} />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">ملاحظات التذوق (افصل بينها بفاصلة)</label>
          <input
            name="tasting_notes"
            className="input"
            placeholder="فواكه استوائية، ياسمين، عسل"
            defaultValue={recipe?.tasting_notes.join('، ')}
          />
        </div>
      </section>

      {/* Method */}
      <section className="card p-8 rounded-3xl space-y-6">
        <h2 className="font-semibold text-lg">خطوات التحضير</h2>
        <div>
          <label className="block text-sm mb-2">اكتب خطوة في كل سطر</label>
          <textarea
            name="steps"
            rows={6}
            className="input"
            placeholder={"سخن الفلتر بماء ساخن.\nضع ١٥ جرام بن مطحون.\nصب الماء على مراحل."}
            defaultValue={recipe?.steps.join('\n')}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm mb-2">رابط فيديو التحضير (اختياري — رابط تضمين)</label>
          <input name="video_url" type="url" className="input" placeholder="https://www.youtube.com/embed/..." defaultValue={recipe?.video_url ?? ''} dir="ltr" />
        </div>
      </section>

      <button type="submit" className="btn btn-gold w-full py-4 text-lg">
        {submitLabel}
      </button>
    </form>
  );
}
