import { useEffect, useRef, useState } from 'react'
import { House, HardHat, Boxes, WalletCards, UserRound, type LucideIcon } from 'lucide-react'

export type TabKey = 'home' | 'crafts' | 'materials' | 'ledger' | 'profile'
export const TABS: { key: TabKey; label: string; x: number; icon: LucideIcon; screen: number }[] = [
  { key: 'home', label: 'الرئيسية', x: 55, icon: House, screen: 0 },
  { key: 'crafts', label: 'الحرفيون', x: 120, icon: HardHat, screen: 4 },
  { key: 'materials', label: 'المواد', x: 185, icon: Boxes, screen: 13 },
  { key: 'ledger', label: 'الحسابات', x: 250, icon: WalletCards, screen: 19 },
  { key: 'profile', label: 'حسابي', x: 315, icon: UserRound, screen: 3 },
]

function paths(k: number) {
  const f = (n: number) => n.toFixed(1)
  const flatEnd = Math.max(36, k - 54)
  const sBottom = Math.max(40, k - 42)
  const moon = `M 40 96 C 20 96, 10 83, 10 64 C 10 44, 22 31, 40 31 L ${f(flatEnd)} 31
    C ${f(k - 36)} 31, ${f(k - 24)} 23, ${f(k - 15)} 13 C ${f(k - 9)} 5, ${f(k - 5)} 2, ${f(k)} 2
    C ${f(k + 9)} 2, ${f(k + 18)} 7, ${f(k + 24)} 17 C ${f(k + 30)} 27, ${f(k + 28)} 39, ${f(k + 22)} 48
    C ${f(k + 14)} 58, ${f(k + 8)} 67, ${f(k - 8)} 80 C ${f(k - 22)} 92, ${f(k - 32)} 96, ${f(sBottom)} 96 L 40 96 Z`
  const moonSpec = `M 16 58 C 18 42, 28 35, 40 35 L ${f(flatEnd)} 35 C ${f(k - 36)} 35, ${f(k - 24)} 26, ${f(k - 14)} 15
    C ${f(k - 8)} 7, ${f(k - 4)} 5, ${f(k)} 5 C ${f(k + 8)} 5, ${f(k + 16)} 9, ${f(k + 21)} 18`
  const bevel = `M 26 89 L ${f(Math.max(28, sBottom))} 89 C ${f(k - 24)} 89, ${f(k - 12)} 83, ${f(k + 2)} 68
    C ${f(k + 14)} 54, ${f(k + 20)} 46, ${f(k + 24)} 36`
  const gSpec = k < 295
    ? `M ${f(Math.min(335, k - 32))} 93 C ${f(Math.min(345, k - 8))} 89, ${f(Math.min(350, k + 16))} 72, ${f(k + 24)} 54
       C ${f(k + 34)} 38, ${f(k + 42)} 34, ${f(Math.min(352, k + 46))} 34 L 326 34 C 343 34, 354 44, 356 60`
    : 'M 310 34 L 328 34 C 344 34, 354 44, 356 60'
  return { moon, moonSpec, bevel, gSpec }
}

export default function BottomNav({ active, onSelect }: { active: TabKey; onSelect: (screen: number) => void }) {
  const targetX = TABS.find((t) => t.key === active)!.x
  const [cx, setCx] = useState(targetX)
  const cur = useRef(targetX)
  const raf = useRef(0)

  useEffect(() => {
    const start = cur.current
    const t0 = performance.now()
    const ease = (t: number) => { const c1 = 1.35, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2) }
    const step = (now: number) => {
      const e = Math.min((now - t0) / 520, 1)
      cur.current = start + (targetX - start) * ease(e)
      setCx(cur.current)
      if (e < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [targetX])

  const k = Math.max(52, Math.min(318, cx))
  const p = paths(k)

  return (
    <nav className="absolute inset-x-0 bottom-0 z-40 h-[108px] select-none" aria-label="التنقل الرئيسي">
      <svg className="size-full drop-shadow-[0_-8px_20px_rgba(30,24,18,0.24)]" viewBox="0 0 370 108" fill="none">
        <defs>
          <linearGradient id="nvMoon" x1="20" y1="12" x2="260" y2="104" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" /><stop offset=".48" stopColor="#EDE8E1" /><stop offset=".85" stopColor="#D7CFC4" /><stop offset="1" stopColor="#BDB3A6" />
          </linearGradient>
          <linearGradient id="nvRim" x1="15" y1="18" x2="320" y2="96" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF" stopOpacity=".98" /><stop offset=".65" stopColor="#FFF" stopOpacity=".7" /><stop offset="1" stopColor="#9E9487" stopOpacity=".4" />
          </linearGradient>
          <linearGradient id="nvGraph" x1="180" y1="24" x2="350" y2="104" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4A5258" /><stop offset=".38" stopColor="#292E33" /><stop offset=".85" stopColor="#15181B" /><stop offset="1" stopColor="#0E1012" />
          </linearGradient>
          <linearGradient id="nvGSpec" x1="40" y1="90" x2="355" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF" stopOpacity=".2" /><stop offset=".38" stopColor="#FFF" stopOpacity=".78" /><stop offset=".75" stopColor="#FFF" stopOpacity=".45" /><stop offset="1" stopColor="#FFF" stopOpacity=".18" />
          </linearGradient>
          <linearGradient id="nvSock" x1="0" y1="-20" x2="0" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4C545B" /><stop offset=".5" stopColor="#262B30" /><stop offset="1" stopColor="#121518" />
          </linearGradient>
          <filter id="nvShadow" x="-15%" y="-20%" width="130%" height="145%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#14110E" floodOpacity=".4" />
          </filter>
        </defs>
        <path d="M 42 96 L 328 96 C 348 96, 360 83, 360 64 C 360 44, 346 31, 325 31 L 44 31 C 23 31, 10 44, 10 64 C 10 83, 21 96, 42 96 Z" fill="url(#nvGraph)" />
        <path d={p.gSpec} stroke="url(#nvGSpec)" strokeWidth="2.6" strokeLinecap="round" />
        <path d={p.moon} filter="url(#nvShadow)" fill="url(#nvMoon)" stroke="url(#nvRim)" strokeWidth="1.5" />
        <path d={p.moonSpec} stroke="#FFF" strokeWidth="3.2" strokeLinecap="round" />
        <path d={p.bevel} stroke="#B8AEA0" strokeWidth="3" strokeLinecap="round" opacity=".55" />
        <g transform={`translate(${k.toFixed(1)}, 25)`}>
          <circle r="20.5" fill="#E6E0D6" stroke="#FFF" strokeWidth="1.6" />
          <circle r="18" fill="url(#nvSock)" stroke="#5A626A" />
          <path d="M -12 -8 A 14 14 0 0 1 12 -8" stroke="#FFF" strokeOpacity=".52" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </svg>
      <div className="absolute inset-0" dir="ltr">
        {TABS.map((t) => {
          const isActive = t.key === active
          const onMoon = t.x <= k - 5
          const color = isActive ? '#F6EFE6' : onMoon ? '#2B3034' : '#E8DFD3'
          const label = isActive ? (t.x <= k + 8 ? '#1C2228' : '#EFE7DC') : color
          return (
            <button
              key={t.key} onClick={() => onSelect(t.screen)}
              style={{ left: `${(t.x / 370) * 100}%` }}
              className="absolute bottom-2 flex h-[86px] w-[68px] -translate-x-1/2 flex-col items-center justify-end pb-1.5"
            >
              <span
                className="grid size-9 place-items-center rounded-full transition-[transform,color] duration-500 ease-[cubic-bezier(.34,1.52,.64,1)]"
                style={{ color, transform: isActive ? 'translateY(-29px) scale(1.06)' : 'none' }}
              >
                <t.icon className="size-5" strokeWidth={2.2} />
              </span>
              <span className={`mt-0.5 text-[11px] leading-[1.15] ${isActive ? 'font-black' : 'font-bold'}`} style={{ color: label }}>{t.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
