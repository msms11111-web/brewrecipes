'use client';

import { useState } from 'react';
import { Check, RotateCcw, Droplets, Coffee, Sparkles } from 'lucide-react';

const stages = [
  { name: 'التجهيز', help: 'اطحن البن وجهّز أدوات التقطير.' },
  { name: 'التشبيع', help: 'بلّل البن بالماء لبدء مرحلة التفتح.' },
  { name: 'الصب', help: 'وزّع الماء بهدوء حتى الوصول للكمية المطلوبة.' },
  { name: 'الانتظار', help: 'اترك التقطير يكتمل ثم تذوّق.' },
];

export default function SignatureExperience() {
  const [grams, setGrams] = useState(20);
  const [ratio, setRatio] = useState(15);
  const [completed, setCompleted] = useState<number[]>([]);
  const water = grams * ratio;
  const progress = Math.round((completed.length / stages.length) * 100);

  function toggle(index: number) {
    setCompleted((previous) => previous.includes(index) ? previous.filter(i => i !== index) : [...previous, index]);
  }

  return (
    <div className="sg-interactive" aria-label="معاينة حاسبة وخطوات التحضير">
      <div className="sg-interactive-top"><span><Sparkles size={16}/> QATRA BREW LAB</span><span>01 / LIVE</span></div>
      <div className="sg-interactive-main">
        <div className="sg-interactive-header"><span>نسبة التحضير</span><span>PRECISE BREWING</span></div>
        <div className="sg-ratio-switch" role="group" aria-label="نسبة الماء إلى البن">
          {[14, 15, 16, 17, 18].map(value => (
            <button key={value} type="button" onClick={() => setRatio(value)} className={ratio===value?'sg-ratio-active':''} aria-pressed={ratio===value}>1:{value}</button>
          ))}
        </div>
        <div className="sg-coffee-input">
          <div className="sg-coffee-label"><span><Coffee size={17}/> كمية البن</span><strong>{grams} <small>جم</small></strong></div>
          <input type="range" min="10" max="40" step="1" value={grams} onChange={e=>setGrams(Number(e.target.value))} aria-label="كمية البن بالجرام" />
          <div className="sg-slider-limits"><span>10 جم</span><span>40 جم</span></div>
        </div>
        <div className="sg-result"><span><Droplets size={20}/> الماء المقترح</span><strong>{water} <small>مل</small></strong><span className="sg-result-label">بنسبة 1:{ratio}</span></div>
        <div className="sg-steps-head"><span>رحلتك إلى الكوب</span><strong>{progress}%</strong></div>
        <div className="sg-progress" aria-label={'إنجاز التحضير ' + progress + '%'}><div style={{width:progress+'%'}} /></div>
        <div className="sg-steps">
          {stages.map((stage,index)=>{
            const done=completed.includes(index);
            return <button key={stage.name} type="button" className={'sg-step '+(done?'sg-step-complete':'')} onClick={()=>toggle(index)} aria-pressed={done}>
              <span className="sg-step-number">{done?<Check size={16}/>:String(index+1).padStart(2,'0')}</span>
              <span><strong>{stage.name}</strong><small>{stage.help}</small></span>
              <span className="sg-step-check">{done?'مكتمل':'تحديد'}</span>
            </button>;
          })}
        </div>
        <div className="sg-reset-line">{progress===100?<span className="sg-complete-message"><Sparkles size={16}/> انتهت المراحل، صحتين!</span>:<span>المراحل نموذج تعليمي ولا تستبدل تعليمات الوصفة الفعلية.</span>}<button type="button" onClick={()=>{setCompleted([]);setGrams(20);setRatio(15);}}><RotateCcw size={15}/> إعادة</button></div>
      </div>
    </div>
  );
}
