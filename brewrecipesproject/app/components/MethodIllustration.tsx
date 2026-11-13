import type { ReactNode } from 'react';

/** رسومات SVG أصلية لكل أداة: خفيفة وتعمل بدون تحميل صور خارجية. */
export default function MethodIllustration({ method }: { method: string }) {
  const common = { stroke: '#294A3E', strokeWidth: 3.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  let art: ReactNode;
  switch (method) {
    case 'V60':
      art = <><path d="M40 34h80l-21 67-17 15-20-15Z" fill="#F9F0DB" {...common}/><path d="M45 39q35 12 70 0M58 58l24 38 23-38" fill="none" {...common}/><path d="M61 115h42m-21 0v12" {...common}/><path d="M50 130h64l-8 21H59Z" fill="#D7AD79" {...common}/></>;
      break;
    case 'Espresso':
      art = <><rect x="34" y="32" width="92" height="72" rx="12" fill="#F9F0DB" {...common}/><path d="M53 56h54M53 70h54M62 89h36" {...common}/><path d="M112 105v16h27" fill="none" {...common}/><path d="M49 117h63l-9 28H58Z" fill="#C58A58" {...common}/><path d="M62 147h39" {...common}/></>;
      break;
    case 'Chemex':
      art = <><path d="M50 22h60M56 22q0 30 24 54-32 25-32 55a23 23 0 0 0 23 23h18a23 23 0 0 0 23-23q0-30-32-55 24-24 24-54" fill="#F9F0DB" {...common}/><path d="M57 115q23-6 46 0v19q-6 15-22 15-17 0-24-15Z" fill="#B98053"/><path d="M48 65h64v19H48Z" fill="#B78E60" {...common}/><path d="M112 113q26-4 23 14-2 16-24 10" fill="none" {...common}/></>;
      break;
    case 'Kalita Wave':
      art = <><path d="M34 45h92l-18 62H51Z" fill="#EEEADB" {...common}/><path d="M48 58l13 43m7-43 6 43m17-43-6 43m19-43-13 43" stroke="#6B8B78" fill="none" strokeWidth="3"/><ellipse cx="80" cy="45" rx="45" ry="12" fill="#FAF5EB" {...common}/><path d="M57 114v24m47-24v24m-54 1h60" {...common}/></>;
      break;
    case 'Origami':
      art = <><path d="M28 43h105l-26 67H53Z" fill="#F7E3CF" {...common}/><path d="M35 44l21 65 9-64 13 65 13-65 14 64 19-65" stroke="#B17462" strokeWidth="3" fill="none"/><ellipse cx="80" cy="44" rx="52" ry="14" fill="#FFF9EC" {...common}/><path d="M46 117h67l-11 16H58Z" fill="#C6A079" {...common}/></>;
      break;
    default:
      art = <><rect x="48" y="27" width="65" height="107" rx="13" fill="#DFEDE6" {...common}/><path d="M60 27V16h40v11M62 48h38" {...common}/><path d="M55 81h51v41H55Z" fill="#AB764E"/><path d="M61 64h39" stroke="#639080" strokeWidth="4"/><path d="M110 62q21 2 21 19v17q0 19-21 21" fill="none" {...common}/></>;
  }
  return <svg viewBox="0 0 160 170" role="img" aria-label={'رسمة أداة ' + method} className="q-method-svg">
    <ellipse cx="82" cy="156" rx="55" ry="7" fill="#795A42" opacity=".12"/>
    {art}
  </svg>;
}
