import { useState, type ReactNode } from 'react'
import { ChevronLeft, Check, type LucideIcon } from 'lucide-react'

/* ---------- Buttons ---------- */
type Tone = 'graphite' | 'oak' | 'moon'
const toneCls: Record<Tone, string> = {
  graphite: 'clay-graphite',
  oak: 'clay-oak',
  moon: 'clay-moon text-ink',
}

export function Btn({
  children, tone = 'graphite', icon: Icon, onClick, className = '', small, disabled,
}: {
  children: ReactNode; tone?: Tone; icon?: LucideIcon; onClick?: () => void
  className?: string; small?: boolean; disabled?: boolean
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`press gloss ${toneCls[tone]} ${small ? 'h-10 rounded-[14px] px-4 text-[12.5px]' : 'h-[52px] rounded-[20px] px-5 text-[14.5px]'} inline-flex items-center justify-center gap-2 font-display disabled:opacity-45 ${className}`}
    >
      {Icon && <Icon className="relative z-10 size-[18px]" strokeWidth={2.2} />}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export function IconBtn({ icon: Icon, onClick, tone = 'moon', badge }: { icon: LucideIcon; onClick?: () => void; tone?: Tone; badge?: boolean }) {
  return (
    <button onClick={onClick} className={`press gloss ${toneCls[tone]} relative grid size-11 shrink-0 place-items-center rounded-[15px]`}>
      <Icon className="relative z-10 size-5" strokeWidth={2.1} />
      {badge && <span className="absolute right-2.5 top-2.5 z-10 size-2 rounded-full bg-gold ring-2 ring-graphite" />}
    </button>
  )
}

/* ---------- Layout ---------- */
export function Card({ children, className = '', tone = 'card' }: { children: ReactNode; className?: string; tone?: 'card' | 'graphite' | 'oak' }) {
  const t = tone === 'card' ? 'clay-card text-ink' : tone === 'graphite' ? 'clay-graphite' : 'clay-oak'
  return <div className={`${t} rounded-[24px] p-4 ${className}`}>{children}</div>
}

export function Section({ title, action, children }: { title: string; action?: string; children: ReactNode }) {
  return (
    <section className="mt-5">
      <div className="mb-2.5 flex items-center justify-between px-1">
        <h3 className="text-[17px]">{title}</h3>
        {action && <span className="text-[11.5px] font-bold text-mute">{action}</span>}
      </div>
      {children}
    </section>
  )
}

/** Dark curved header with logo-style swirl, as in the reference. */
export function Header({
  title, subtitle, onBack, right, tall,
}: { title: string; subtitle?: string; onBack?: () => void; right?: ReactNode; tall?: boolean }) {
  return (
    <header
      className={`clay-graphite relative shrink-0 overflow-hidden rounded-b-[38px] px-4 pb-6 pt-14 ${tall ? 'h-[168px]' : ''}`}
      style={{ borderTop: 0 }}
    >
      <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 370 170" preserveAspectRatio="none" fill="none">
        <path d="M-20 -10 C30 -10 45 75 130 120 C175 142 210 155 240 175 L-20 175 Z" fill="rgba(255,255,255,.04)" />
        <path d="M18 -15 C5 45 52 105 148 148 C175 160 195 168 215 175 L155 175 C82 142 22 88 -5 15 Z" fill="rgba(232,223,211,.12)" />
        <path d="M42 -15 C32 42 72 96 165 142" stroke="rgba(255,255,255,.4)" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[24px] leading-[1.15] text-white">{title}</h1>
          {subtitle && <p className="mt-1 text-[12px] font-medium text-white/70">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {right}
          {onBack && (
            <button onClick={onBack} aria-label="رجوع" className="press clay-moon gloss grid size-11 place-items-center rounded-[15px] text-ink">
              <ChevronLeft className="relative z-10 size-5 rotate-180" strokeWidth={2.4} />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

/* ---------- Form controls ---------- */
export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="mb-3.5 block">
      <span className="mb-1.5 flex items-center justify-between px-1 text-[12.5px] font-bold text-ink">
        {label}
        {hint && <span className="rounded-full bg-oak/10 px-2 py-0.5 text-[10px] font-bold text-oak">{hint}</span>}
      </span>
      {children}
    </label>
  )
}

const inputCls = 'clay-inset w-full rounded-[18px] px-4 text-[13.5px] font-medium text-ink outline-none placeholder:text-mute/70 focus:ring-2 focus:ring-oak/40'

export function Input({ value, onChange, placeholder, type = 'text', dir, suffix, className = '' }: {
  value?: string; onChange?: (v: string) => void; placeholder?: string; type?: string; dir?: 'ltr' | 'rtl'; suffix?: string; className?: string
}) {
  return (
    <div className="relative">
      <input
        type={type} dir={dir} value={value} placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${inputCls} h-12 ${suffix ? 'pl-14' : ''} ${className}`}
      />
      {suffix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[11.5px] font-bold text-mute">{suffix}</span>}
    </div>
  )
}

export function TextArea({ value, onChange, placeholder, rows = 3 }: { value?: string; onChange?: (v: string) => void; placeholder?: string; rows?: number }) {
  return <textarea rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange?.(e.target.value)} className={`${inputCls} resize-none py-3 leading-relaxed`} />
}

export function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`${inputCls} h-12 appearance-none pl-10`}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronLeft className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 -rotate-90 text-mute" />
    </div>
  )
}

/** Segmented / chip choice (single). */
export function Choice({ options, value, onChange, cols }: { options: string[]; value: string; onChange: (v: string) => void; cols?: 2 | 3 | 4 }) {
  const grid = cols ? { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }[cols] : ''
  return (
    <div className={cols ? `grid ${grid} gap-2` : 'flex flex-wrap gap-2'}>
      {options.map((o) => {
        const on = o === value
        return (
          <button
            key={o} onClick={() => onChange(o)}
            className={`press gloss min-h-10 rounded-[14px] px-3 py-1.5 text-[12px] font-bold ${on ? 'clay-graphite' : 'clay-moon text-ink'}`}
          >
            <span className="relative z-10">{o}</span>
          </button>
        )
      })}
    </div>
  )
}

export function Check2({ label, checked, onChange, strict }: { label: string; checked: boolean; onChange: (v: boolean) => void; strict?: boolean }) {
  return (
    <button onClick={() => onChange(!checked)} className={`flex w-full items-center gap-3 rounded-[18px] p-3 text-right ${strict ? 'clay-card' : ''}`}>
      <span className={`grid size-6 shrink-0 place-items-center rounded-lg ${checked ? 'clay-oak' : 'clay-inset'}`}>
        {checked && <Check className="relative z-10 size-3.5" strokeWidth={3} />}
      </span>
      <span className="text-[12.5px] font-bold leading-snug">{label}</span>
    </button>
  )
}

/* ---------- Display ---------- */
export function Badge({ children, tone = 'ok' }: { children: ReactNode; tone?: 'ok' | 'warn' | 'dark' | 'oak' | 'bad' }) {
  const m = {
    ok: 'bg-[#e8efea] text-ok', warn: 'bg-[#f6ead6] text-[#9a6a1c]', dark: 'bg-graphite text-white',
    oak: 'bg-oak text-white', bad: 'bg-[#f6e1db] text-coral',
  }[tone]
  return <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[10.5px] font-extrabold ${m}`}>{children}</span>
}

export function Notice({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warn' }) {
  return (
    <div className={`mb-4 flex gap-2.5 rounded-[18px] p-3 text-[12px] font-bold leading-relaxed ${tone === 'warn' ? 'bg-[#f6e7d3] text-[#7a4f12]' : 'bg-oak/10 text-oak'}`}>
      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-gold" />
      <p>{children}</p>
    </div>
  )
}

export function Stat({ label, value, tone = 'card' }: { label: string; value: string; tone?: 'card' | 'graphite' | 'oak' }) {
  return (
    <Card tone={tone} className="!p-3">
      <p className={`text-[11px] font-bold ${tone === 'card' ? 'text-mute' : 'text-white/70'}`}>{label}</p>
      <p className="mt-0.5 text-[17px] leading-tight">{value}</p>
    </Card>
  )
}

export function Row({ k, v, strong }: { k: string; v: ReactNode; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-black/5 py-2 last:border-0">
      <span className="text-[12px] font-medium text-mute">{k}</span>
      <span className={`text-[12.5px] ${strong ? 'font-display text-[15px]' : 'font-bold'}`}>{v}</span>
    </div>
  )
}

export function Avatar({ name, size = 48, tone = 'oak' }: { name: string; size?: number; tone?: 'oak' | 'graphite' }) {
  return (
    <span style={{ width: size, height: size }} className={`${tone === 'oak' ? 'clay-oak' : 'clay-graphite'} grid shrink-0 place-items-center rounded-[16px] font-display`}>
      <span className="relative z-10" style={{ fontSize: size * 0.4 }}>{name.trim().charAt(0)}</span>
    </span>
  )
}

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= Math.round(value) ? '#D8A868' : '#d8d0c4'}>
          <path d="M12 2l3.1 6.6 7.2.9-5.3 5 1.4 7.2L12 18.1 5.6 21.7 7 14.5 1.7 9.5l7.2-.9z" />
        </svg>
      ))}
    </span>
  )
}

export function Table({ head, rows, foot }: { head: string[]; rows: ReactNode[][]; foot?: ReactNode[] }) {
  const cols = { gridTemplateColumns: `repeat(${head.length}, minmax(0,1fr))` }
  return (
    <div className="clay-card overflow-hidden rounded-[22px]">
      <div className="clay-graphite grid gap-2 rounded-none px-3 py-2.5 text-[11px] font-extrabold" style={cols}>
        {head.map((h) => <span key={h} className="relative z-10">{h}</span>)}
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid items-center gap-2 border-b border-black/5 px-3 py-2.5 text-[11.5px] font-bold last:border-0" style={cols}>
          {r.map((c, j) => <span key={j} className="min-w-0">{c}</span>)}
        </div>
      ))}
      {foot && (
        <div className="grid gap-2 bg-oak/10 px-3 py-2.5 text-[12px] font-extrabold" style={cols}>
          {foot.map((c, j) => <span key={j}>{c}</span>)}
        </div>
      )}
    </div>
  )
}

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-start justify-between" dir="rtl">
      {steps.map((s, i) => (
        <div key={s} className="relative flex flex-1 flex-col items-center gap-1.5">
          {i > 0 && <span className={`absolute right-1/2 top-[15px] h-1 w-full translate-x-0 rounded ${i <= current ? 'bg-oak' : 'bg-black/10'}`} />}
          <span className={`relative z-10 grid size-8 place-items-center rounded-full text-[12px] font-display ${i < current ? 'clay-oak' : i === current ? 'clay-graphite ring-4 ring-gold/40' : 'clay-inset text-mute'}`}>
            <span className="relative z-10">{i < current ? <Check className="size-4" strokeWidth={3} /> : i + 1}</span>
          </span>
          <span className={`text-[10.5px] font-extrabold ${i <= current ? 'text-ink' : 'text-mute'}`}>{s}</span>
        </div>
      ))}
    </div>
  )
}

export function Thumb({ label, icon: Icon, className = '' }: { label?: string; icon: LucideIcon; className?: string }) {
  return (
    <div className={`relative grid place-items-center overflow-hidden rounded-[18px] bg-[#ddd7ce] ${className}`}>
      <svg className="absolute inset-0 size-full opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        <path d="M-5 40 C20 0 70 0 105 25 C75 45 30 35 -5 70 Z" fill="#c2a58c" opacity=".5" />
        <path d="M-5 80 C30 55 60 85 105 60 L105 105 L-5 105Z" fill="#fff" opacity=".45" />
      </svg>
      <Icon className="relative size-8 text-oak" strokeWidth={1.7} />
      {label && <span className="absolute bottom-1.5 text-[10px] font-extrabold text-graphite/70">{label}</span>}
    </div>
  )
}

/** Primary sticky action area at the end of a form. */
export function Actions({ children }: { children: ReactNode }) {
  return <div className="mt-5 flex flex-col gap-2.5">{children}</div>
}

export function useToastState() {
  const [msg, setMsg] = useState<string | null>(null)
  const show = (m: string) => { setMsg(m); window.setTimeout(() => setMsg(null), 2200) }
  return { msg, show }
}

export function fmt(n: number) { return n.toLocaleString('en-US') }

export type ScreenProps = { go: (id: number) => void; back: () => void; toast: (m: string) => void }

/** Standard screen scaffold: curved dark header + scrolling body that clears the bottom bar. */
export function Page({ title, subtitle, p, children, noBack, right }: { title: string; subtitle?: string; p: ScreenProps; children: ReactNode; noBack?: boolean; right?: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <Header title={title} subtitle={subtitle} onBack={noBack ? undefined : p.back} right={right} />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-[128px] pt-4">{children}</div>
    </div>
  )
}
