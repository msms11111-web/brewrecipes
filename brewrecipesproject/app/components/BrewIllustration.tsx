"use client";

import { useState } from 'react';
import type { PointerEvent } from 'react';

/** Artwork created for Qatra. Tilt is disabled for touch and reduced-motion users. */
export default function BrewIllustration() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = event.currentTarget.getBoundingClientRect();
    setTilt({ x: -((event.clientY - r.top) / r.height - .5) * 9, y: ((event.clientX - r.left) / r.width - .5) * 9 });
  };
  return (
    <div className="q-brew-scene" onPointerMove={handleMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
      <div className="q-scene-orbit" aria-hidden="true" />
      <div className="q-brew-tilt" style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
        <svg viewBox="0 0 520 540" role="img" aria-label="رسم مجسّم لأداة تقطير القهوة مع إبريق زجاجي" className="q-brew-svg">
          <defs>
            <linearGradient id="q-ceramic" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#EEE0C6"/><stop offset=".45" stopColor="#FFF7E7"/><stop offset="1" stopColor="#B79A78"/></linearGradient>
            <linearGradient id="q-glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#E7FEF5" stopOpacity=".8"/><stop offset=".55" stopColor="#DBEDDD" stopOpacity=".2"/><stop offset="1" stopColor="#FFF8E9" stopOpacity=".75"/></linearGradient>
            <linearGradient id="q-coffee" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#BE8350"/><stop offset=".65" stopColor="#6C412C"/><stop offset="1" stopColor="#35231C"/></linearGradient>
            <filter id="q-blur"><feGaussianBlur stdDeviation="11"/></filter>
          </defs>
          <ellipse cx="260" cy="482" rx="153" ry="20" fill="#091510" opacity=".5" filter="url(#q-blur)"/>
          <ellipse cx="260" cy="479" rx="124" ry="13" fill="#B79A78" opacity=".35"/>
          <g fill="none" stroke="#D0B48F" strokeOpacity=".25"><circle cx="260" cy="262" r="212" strokeDasharray="4 12"/><circle cx="260" cy="262" r="167"/></g>
          {/* Glass carafe and coffee */}
          <path d="M209 289L183 376Q164 441 224 465H297Q355 442 337 376L310 289Z" fill="url(#q-glass)" stroke="#FFF7E9" strokeOpacity=".85" strokeWidth="5"/>
          <path d="M191 394Q260 371 330 394L321 432Q310 451 293 453H229Q209 450 200 431Z" fill="url(#q-coffee)"/>
          <ellipse cx="260" cy="394" rx="68" ry="10" fill="#D69A5E" opacity=".8"/>
          <path d="M337 326Q413 303 401 377Q395 416 342 413" fill="none" stroke="#EAF5E7" strokeOpacity=".8" strokeWidth="19" strokeLinecap="round"/>
          <path d="M338 329Q396 309 390 375Q384 403 343 401" fill="none" stroke="#245047" strokeWidth="9" strokeLinecap="round"/>
          <path d="M214 311H305" stroke="#FFF5E0" strokeOpacity=".7" strokeWidth="8" strokeLinecap="round"/>
          {/* The ceramic dripper */}
          <path d="M183 160H337L300 274Q260 303 220 274Z" fill="url(#q-ceramic)" stroke="#FBEBD5" strokeWidth="4"/>
          <ellipse cx="260" cy="160" rx="77" ry="21" fill="#F7E6CA"/>
          <ellipse cx="260" cy="160" rx="62" ry="13" fill="#69432F"/>
          <ellipse cx="260" cy="159" rx="49" ry="8" fill="#9E6E4C"/>
          <g stroke="#AF8965" strokeOpacity=".4" strokeWidth="3"><path d="M209 184L236 270"/><path d="M232 186L248 282"/><path d="M310 184L288 277"/><path d="M285 183L271 289"/></g>
          <path d="M181 287Q260 300 339 287" stroke="#C7A67F" strokeWidth="13" fill="none" strokeLinecap="round"/>
          <path d="M245 289H275L267 317H253Z" fill="#E5C396"/>
          <path d="M260 320V347" stroke="#DDA16F" strokeWidth="3" strokeDasharray="4 6" strokeLinecap="round"/>
          <g stroke="#FFF5DF" opacity=".55" strokeWidth="3" fill="none" strokeLinecap="round"><path d="M225 125Q215 106 229 89Q240 72 230 55"/><path d="M263 122Q251 101 267 85Q281 72 270 52"/><path d="M301 123Q291 105 303 92Q316 79 308 67"/></g>
          <g fill="#E1C095"><circle cx="111" cy="231" r="3"/><circle cx="415" cy="173" r="4"/><circle cx="402" cy="330" r="2"/></g>
        </svg>
      </div>
      <div className="q-scene-chip q-chip-first"><span>Bloom</span><strong>00:30</strong></div>
      <div className="q-scene-chip q-chip-second"><span>درجة الحرارة</span><strong>92°C</strong></div>
    </div>
  );
}
