import { useEffect, useRef, useState } from 'react'
import { Plus, Store, Clock, MapPin, ShoppingBasket, Send, Package, Truck, Camera, PenLine, Eraser, ShieldAlert, ReceiptText, FileCheck2, Minus, Trash2 } from 'lucide-react'
import { Btn, Card, Field, Input, TextArea, Select, Choice, Page, Badge, Row, Notice, Table, Section, Thumb, Stat, Check2, fmt, type ScreenProps } from '../ui'

/* 13 */
const cats: Record<string, { n: string; d: string; p: number; u: string; tag: string }[]> = {
  'الأسمنت': [
    { n: 'أسمنت بورتلاندي', d: 'شكارة 50 كجم · مصنع عمران', p: 6800, u: 'شكارة', tag: 'متوفر' },
    { n: 'أسمنت مقاوم للأملاح', d: 'شكارة 50 كجم · مصنع باجل', p: 7600, u: 'شكارة', tag: 'متوفر' },
  ],
  'حديد التسليح': [
    { n: 'حديد تسليح 12 مم', d: 'بالطن · أطوال 12 م', p: 1650000, u: 'طن', tag: 'متوفر' },
    { n: 'حديد تسليح 16 مم', d: 'بالطن · أطوال 12 م', p: 1640000, u: 'طن', tag: 'كمية محدودة' },
  ],
  'البلوك': [
    { n: 'بلوك مجوف 20 سم', d: 'أوتوماتيكي · ألف حبة', p: 285000, u: 'ألف', tag: 'متوفر' },
    { n: 'بلوك مصمت 15 سم', d: 'يدوي · ألف حبة', p: 240000, u: 'ألف', tag: 'متوفر' },
  ],
  'الركام': [
    { n: 'نيس وادي مغربل', d: 'نقلة قلاب · 12 م³', p: 62000, u: 'نقلة', tag: 'متوفر' },
    { n: 'كري / بحص', d: 'نقلة قلاب · 12 م³', p: 78000, u: 'نقلة', tag: 'متوفر' },
  ],
}
const stores = [
  { n: 'مغلق الأمانة', d: '1.2 كم', h: '7ص - 6م', r: true },
  { n: 'مغلق النور للبناء', d: '2.8 كم', h: '8ص - 5م', r: true },
  { n: 'مغلق الصافي', d: '4.1 كم', h: '7ص - 4م', r: false },
]
export function Catalog(p: ScreenProps) {
  const [tab, setTab] = useState('الأسمنت')
  const [cart, setCart] = useState<string[]>([])
  return (
    <Page title="كتالوج المواد" subtitle="قارن الأسعار واطلب من المغالق" p={p} noBack right={<button onClick={() => p.go(14)} className="press clay-moon gloss flex h-10 items-center gap-2 rounded-full px-3 text-[12px] font-extrabold text-ink"><ShoppingBasket className="relative z-10 size-4" /><span className="relative z-10">الطلبية {cart.length}</span></button>}>
      <div className="no-scrollbar -mx-4 mb-4 flex gap-2.5 overflow-x-auto px-4 pb-2">
        {Object.keys(cats).map((c, i) => (
          <button key={c} onClick={() => setTab(c)} className={`press gloss shrink-0 rounded-[18px] px-4 py-3 text-[12.5px] font-display ${tab === c ? 'clay-graphite' : i % 2 ? 'clay-oak' : 'clay-moon text-ink'}`}><span className="relative z-10">{c}</span></button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {cats[tab].map((m) => (
          <Card key={m.n} className="!p-3">
            <div className="relative"><Thumb icon={Package} className="h-[110px]" /><span className="absolute left-2 top-2"><Badge tone={m.tag === 'متوفر' ? 'ok' : 'warn'}>{m.tag}</Badge></span></div>
            <p className="mt-2 font-display text-[14px] leading-tight">{m.n}</p>
            <p className="mt-0.5 min-h-8 text-[10.5px] font-medium text-mute">{m.d}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="font-display text-[14px]">{fmt(m.p)}<span className="text-[10px] text-mute"> ر.ي</span></p>
              <button onClick={() => { setCart((c) => [...c, m.n]); p.toast('أُضيف لطلبية التسعير') }} className="press clay-oak gloss grid size-9 place-items-center rounded-[13px]"><Plus className="relative z-10 size-5" strokeWidth={2.6} /></button>
            </div>
          </Card>
        ))}
      </div>
      <Section title="المغالق القريبة" action="حسب المسافة">
        {stores.map((s) => (
          <Card key={s.n} className="mb-2.5 !p-3"><div className="flex items-center gap-3">
            <span className="clay-graphite grid size-11 place-items-center rounded-2xl"><Store className="relative z-10 size-5" /></span>
            <div className="flex-1"><p className="font-display text-[14px]">{s.n}</p><p className="flex gap-3 text-[11px] font-bold text-mute"><span className="flex items-center gap-1"><MapPin className="size-3" />{s.d}</span><span className="flex items-center gap-1"><Clock className="size-3" />{s.h}</span></p></div>
            <Badge tone={s.r ? 'ok' : 'warn'}>{s.r ? 'مفتوح' : 'يغلق قريبًا'}</Badge>
          </div></Card>
        ))}
      </Section>
      <Btn className="mt-3 w-full" icon={Send} onClick={() => p.go(14)}>إضافة لطلبية التسعير</Btn>
    </Page>
  )
}

/* 14 */
export function QuoteRequest(p: ScreenProps) {
  const [rows, setRows] = useState([
    { n: 'أسمنت بورتلاندي', s: '50 كجم', q: 400, u: 'كيس' },
    { n: 'بلوك مجوف', s: '20 سم أوتوماتيكي', q: 3000, u: 'حبة' },
    { n: 'نيس وادي مغربل', s: 'مغربل', q: 4, u: 'نقلة' },
  ])
  const [site, setSite] = useState('')
  const [staged, setStaged] = useState('دفعات أسبوعية')
  const [weeks, setWeeks] = useState('4')
  const upd = (i: number, d: number) => setRows((r) => r.map((x, j) => (j === i ? { ...x, q: Math.max(1, x.q + d) } : x)))
  return (
    <Page title="طلب تسعيرة مواد" subtitle="أرسل طلبك إلى عدة مغالق" p={p}>
      <div className="clay-card overflow-hidden rounded-[22px]">
        <div className="clay-graphite grid grid-cols-[1.5fr_1.2fr_1.4fr_.4fr] gap-2 rounded-none px-3 py-2.5 text-[11px] font-extrabold"><span className="relative z-10">الصنف</span><span className="relative z-10">المواصفة</span><span className="relative z-10 text-center">الكمية</span><span /></div>
        {rows.map((r, i) => (
          <div key={r.n} className="grid grid-cols-[1.5fr_1.2fr_1.4fr_.4fr] items-center gap-2 border-b border-black/5 px-3 py-2.5 last:border-0">
            <span className="font-display text-[12.5px] leading-tight">{r.n}</span><span className="text-[11px] font-medium text-mute">{r.s}</span>
            <div className="flex items-center justify-between rounded-xl bg-black/5 px-1 py-1"><button onClick={() => upd(i, -(r.q > 100 ? 50 : 1))}><Minus className="size-3.5" /></button><span className="text-[11.5px] font-extrabold">{fmt(r.q)} <span className="text-[9.5px] text-mute">{r.u}</span></span><button onClick={() => upd(i, r.q > 100 ? 50 : 1)}><Plus className="size-3.5" /></button></div>
            <button onClick={() => setRows((x) => x.filter((_, j) => j !== i))} className="text-coral"><Trash2 className="size-4" /></button>
          </div>
        ))}
      </div>
      <div className="mt-4"><Field label="موقع التشوين داخل الموقع"><TextArea rows={2} value={site} onChange={setSite} placeholder="موضع التفريغ، عرض المدخل، إمكانية دخول الشاحنة..." /></Field></div>
      <Field label="خيار التوريد"><Choice cols={2} options={['دفعة واحدة', 'دفعات أسبوعية']} value={staged} onChange={setStaged} /></Field>
      {staged === 'دفعات أسبوعية' && <Field label="عدد الدفعات حسب مراحل البناء وسعة الموقع"><Choice cols={4} options={['2', '3', '4', '6']} value={weeks} onChange={setWeeks} /></Field>}
      <Btn className="w-full" icon={Send} disabled={!rows.length || site.trim().length < 3} onClick={() => { p.toast(`أُرسل الطلب إلى 3 مغالق`); p.go(15) }}>إرسال طلب التسعيرة للمغالق</Btn>
    </Page>
  )
}

/* 15 */
export function QuoteReview(p: ScreenProps) {
  const [role, setRole] = useState('المشتري')
  const [items, setItems] = useState([{ n: 'أسمنت بورتلاندي', q: 400, pr: 6800 }, { n: 'بلوك مجوف 20 سم', q: 3000, pr: 285 }, { n: 'نيس وادي مغربل', q: 4, pr: 62000 }])
  const [cur, setCur] = useState('ريال يمني جديد')
  const [rate, setRate] = useState('1')
  const [exp, setExp] = useState('2025-06-12T18:00')
  const [dest, setDest] = useState('واصل للموقع مع التنزيل')
  const [issued, setIssued] = useState(false)
  const sub = items.reduce((s, i) => s + i.q * i.pr, 0)
  const haul = dest.startsWith('واصل') ? 0 : 45000
  const total = sub + haul
  const sup = role === 'المورد'
  return (
    <Page title="عرض السعر" subtitle="مغلق الأمانة · QT-2025-0312" p={p}>
      <Choice cols={2} options={['المشتري', 'المورد']} value={role} onChange={(r) => { setRole(r); setIssued(false) }} />
      <div className="mt-4 clay-card overflow-hidden rounded-[22px]">
        <div className="clay-graphite grid grid-cols-[1.6fr_1fr_1.2fr_1.3fr] gap-1 rounded-none px-3 py-2.5 text-[10.5px] font-extrabold"><span className="relative z-10">الصنف</span><span className="relative z-10">الكمية</span><span className="relative z-10">سعر الوحدة</span><span className="relative z-10">الإجمالي</span></div>
        {items.map((i, k) => (
          <div key={i.n} className="grid grid-cols-[1.6fr_1fr_1.2fr_1.3fr] items-center gap-1 border-b border-black/5 px-3 py-2.5 text-[11.5px] font-bold last:border-0">
            <span className="font-display leading-tight">{i.n}</span><span>{fmt(i.q)}</span>
            {sup ? <input dir="ltr" value={i.pr} onChange={(e) => setItems((x) => x.map((y, j) => (j === k ? { ...y, pr: Number(e.target.value.replace(/\D/g, '')) } : y)))} className="clay-inset w-full rounded-lg px-1.5 py-1 text-[11.5px] outline-none" /> : <span>{fmt(i.pr)}</span>}
            <span className="font-display">{fmt(i.q * i.pr)}</span>
          </div>
        ))}
        <div className="bg-oak/10 px-3 py-2.5"><Row k="المجموع الفرعي" v={fmt(sub)} /><Row k="النقل والتنزيل" v={haul ? fmt(haul) : 'مشمول'} /><Row strong k="الإجمالي" v={`${fmt(total)} ر.ي`} /></div>
      </div>
      <div className="mt-4" />
      <Field label="العملة وسعر الصرف" hint="BR-07 · BR-11">
        <div className="grid grid-cols-5 gap-2.5"><div className="col-span-3"><Select value={cur} onChange={setCur} options={['ريال يمني جديد', 'ريال يمني قديم', 'ريال سعودي']} /></div><div className="col-span-2"><Input value={rate} onChange={setRate} suffix="سعر" dir="ltr" /></div></div>
      </Field>
      <Field label="انتهاء صلاحية العرض" hint="BR-07"><Input type="datetime-local" value={exp} onChange={setExp} dir="ltr" /></Field>
      <Field label="النقل والتنزيل"><Choice cols={2} options={['واصل للموقع مع التنزيل', 'استلام من باب المحل']} value={dest} onChange={setDest} /></Field>
      {sup ? <Btn className="w-full" icon={FileCheck2} onClick={() => { setIssued(true); p.toast('تم إصدار عرض السعر') }}>{issued ? 'تم الإصدار' : 'إصدار عرض السعر'}</Btn>
        : <Btn tone="oak" className="w-full" icon={ReceiptText} onClick={() => { p.toast('تحول العرض إلى طلبية SO-2025-0077'); p.go(16) }}>تأكيد وتحويل إلى طلبية شراء (SupplyOrder)</Btn>}
    </Page>
  )
}

/* 16 */
export function SupplyOrders(p: ScreenProps) {
  const [batches, setBatches] = useState([
    { n: 1, q: 100, d: '12/06', s: 'تم التسليم' },
    { n: 2, q: 100, d: '19/06', s: 'قيد النقل' },
    { n: 3, q: 100, d: '26/06', s: 'مجهزة' },
    { n: 4, q: 100, d: '03/07', s: 'مجهزة' },
  ])
  const total = batches.reduce((s, b) => s + b.q, 0)
  const got = batches.filter((b) => b.s === 'تم التسليم').reduce((s, b) => s + b.q, 0)
  const tone = (s: string) => (s === 'تم التسليم' ? 'ok' : s === 'قيد النقل' ? 'warn' : 'dark') as 'ok' | 'warn' | 'dark'
  return (
    <Page title="طلبيات التوريد" subtitle="SO-2025-0077 · أسمنت بورتلاندي" p={p}>
      <Card tone="graphite"><p className="font-display text-[17px]">مغلق الأمانة لمواد البناء</p><div className="mt-2"><Row k="رقم الطلب" v="SO-2025-0077" /><Row k="الإجمالي" v="2,720,000 ر.ي" /><Row k="الكمية الكلية" v={`${total} شكارة`} /></div></Card>
      <Section title="رصيد التشوين في الموقع">
        <Card>
          <div className="mb-2 flex justify-between text-[12px] font-bold"><span>وصل {got}</span><span className="text-mute">المتبقي {total - got}</span></div>
          <div className="clay-inset h-4 overflow-hidden rounded-full"><div className="clay-oak h-full rounded-full" style={{ width: `${(got / total) * 100}%` }} /></div>
          <p className="mt-2 text-[11px] font-medium text-mute">الدفعة القادمة بعد 9 أيام - الرصيد الحالي يكفي 6 أيام عمل.</p>
        </Card>
      </Section>
      <Section title="شحنات التوريد المجدولة">
        <Table head={['الدفعة', 'الكمية', 'التاريخ', 'الحالة']} rows={batches.map((b) => [`#${b.n}`, `${b.q}`, b.d, <Badge tone={tone(b.s)}>{b.s}</Badge>])} />
      </Section>
      <div className="mt-5 flex flex-col gap-2.5">
        <Btn icon={Truck} onClick={() => { setBatches((b) => [...b, { n: b.length + 1, q: 50, d: '10/07', s: 'مجهزة' }]); p.toast('أُرسلت دفعة توريد جديدة') }}>إرسال دفعة توريد جديدة</Btn>
        <Btn tone="moon" icon={ReceiptText} onClick={() => p.go(17)}>استلام الدفعة 2</Btn>
      </div>
    </Page>
  )
}

/* 17 */
function Signature({ onChange }: { onChange: (v: boolean) => void }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  useEffect(() => { const c = ref.current!; const x = c.getContext('2d')!; x.lineWidth = 2.4; x.lineCap = 'round'; x.strokeStyle = '#2b3035' }, [])
  const pos = (e: React.PointerEvent) => { const r = ref.current!.getBoundingClientRect(); return [(e.clientX - r.left) * (ref.current!.width / r.width), (e.clientY - r.top) * (ref.current!.height / r.height)] }
  return (
    <div className="clay-inset relative h-28 overflow-hidden rounded-[20px]">
      <canvas ref={ref} width={340} height={112} className="size-full touch-none"
        onPointerDown={(e) => { drawing.current = true; const [x, y] = pos(e); const c = ref.current!.getContext('2d')!; c.beginPath(); c.moveTo(x, y) }}
        onPointerMove={(e) => { if (!drawing.current) return; const [x, y] = pos(e); const c = ref.current!.getContext('2d')!; c.lineTo(x, y); c.stroke(); onChange(true) }}
        onPointerUp={() => { drawing.current = false }} onPointerLeave={() => { drawing.current = false }} />
      <span className="pointer-events-none absolute bottom-1.5 right-3 flex items-center gap-1 text-[10.5px] font-bold text-mute"><PenLine className="size-3" />وقّع هنا</span>
      <button onClick={() => { const c = ref.current!; c.getContext('2d')!.clearRect(0, 0, c.width, c.height); onChange(false) }} className="absolute left-2 top-2 grid size-7 place-items-center rounded-lg bg-black/5"><Eraser className="size-3.5" /></button>
    </div>
  )
}
export function DeliveryReceipt(p: ScreenProps) {
  const sent = 100
  const [ok, setOk] = useState('92')
  const [bad, setBad] = useState('6')
  const [stage, setStage] = useState('أثناء التنزيل')
  const [photos, setPhotos] = useState(0)
  const [signed, setSigned] = useState(false)
  const [conf, setConf] = useState(false)
  const short = Math.max(0, sent - Number(ok || 0) - Number(bad || 0))
  return (
    <Page title="سند الاستلام" subtitle="استلام جزئي وحصر التالف والناقص" p={p}>
      <Card><Row k="رقم الإرسالية" v="DL-2025-0451" /><Row k="السائق" v="محمد الشامي" /><Row k="الصنف" v="أسمنت بورتلاندي - 100 شكارة" /></Card>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <Field label="المستلم السليم" hint="BR-08"><Input value={ok} onChange={(v) => setOk(v.replace(/\D/g, ''))} dir="ltr" suffix="شكارة" /></Field>
        <Field label="التالف / الممزق"><Input value={bad} onChange={(v) => setBad(v.replace(/\D/g, ''))} dir="ltr" suffix="شكارة" /></Field>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-2"><Stat label="المرسل" value={String(sent)} /><Stat label="سليم" value={ok || '0'} tone="oak" /><Stat label="ناقص" value={String(short)} tone="graphite" /></div>
      <Field label="مرحلة حدوث التلف"><Choice cols={3} options={['قبل التحميل', 'أثناء النقل', 'أثناء التنزيل']} value={stage} onChange={setStage} /></Field>
      <Field label="صور الضرر والكسر">
        <div className="grid grid-cols-4 gap-2">{Array.from({ length: photos }).map((_, i) => <Thumb key={i} icon={ShieldAlert} className="aspect-square !rounded-xl" />)}<button onClick={() => setPhotos((n) => Math.min(n + 1, 3))} className="clay-inset grid aspect-square place-items-center rounded-xl text-mute"><Camera className="size-5" /></button></div>
      </Field>
      <Field label="توقيع المستلم"><Signature onChange={setSigned} /></Field>
      <Check2 label="أؤكد استلام الكميات المسجلة أعلاه" checked={conf} onChange={setConf} />
      <div className="my-3"><Notice tone="warn">الطلبية ليست دليلاً على الاستلام؛ ولا يقيد استحقاق مالي إلا بالكمية السليمة المسجلة بهذا السند (BR-08).</Notice></div>
      <Btn className="w-full" icon={FileCheck2} disabled={!signed || !conf} onClick={() => { p.toast(`قُيّد استحقاق ${fmt(Number(ok || 0) * 6800)} ر.ي`); p.go(19) }}>اعتماد سند الاستلام وتحديث الحساب</Btn>
    </Page>
  )
}
