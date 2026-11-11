import { useState } from 'react'
import { BellRing, Download, Lock, Camera, Send, Handshake, CheckCheck, ShieldCheck, Star, Info, FileCheck2 } from 'lucide-react'
import { Btn, Card, Field, Input, TextArea, Select, Choice, Check2, Page, Badge, Row, Notice, Table, Section, Thumb, Stat, Stars, fmt, type ScreenProps } from '../ui'

// Shared closure flag: the review screen opens only after final settlement (BR-11).
const state = { closed: false }

/* 18 */
export function AdvancePayment(p: ScreenProps) {
  const [w, setW] = useState('عبدالله الصبري')
  const [amt, setAmt] = useState('')
  const [cur, setCur] = useState('ريال يمني')
  const [when, setWhen] = useState('2025-06-10T16:00')
  const [why, setWhy] = useState('مصاريف معيشية')
  const [mech, setMech] = useState('خصم من اليومية القادمة')
  return (
    <Page title="صرف سلفة نقدية" subtitle="تدوين السلف اليومية للعمال" p={p}>
      <Notice tone="warn">فصل السلفة عن العربون؛ مبالغ السلف تخصم تلقائيًا من كشف الحساب (BR-06).</Notice>
      <Field label="العامل المستفيد"><Select value={w} onChange={setW} options={['عبدالله الصبري', 'نبيل الوصابي', 'رضوان العزي', 'صادق الحداد']} /></Field>
      <div className="grid grid-cols-5 gap-2.5">
        <div className="col-span-3"><Field label="مبلغ السلفة"><Input value={amt} onChange={(v) => setAmt(v.replace(/\D/g, ''))} dir="ltr" placeholder="0" /></Field></div>
        <div className="col-span-2"><Field label="العملة"><Select value={cur} onChange={setCur} options={['ريال يمني', 'ريال سعودي', 'دولار']} /></Field></div>
      </div>
      <Field label="تاريخ ووقت الصرف"><Input type="datetime-local" value={when} onChange={setWhen} dir="ltr" /></Field>
      <Field label="سبب السلفة"><Choice cols={3} options={['مصاريف معيشية', 'علاج', 'مواصلات']} value={why} onChange={setWhy} /></Field>
      <Field label="آلية التسوية"><Choice cols={2} options={['خصم من اليومية القادمة', 'التصفية الأسبوعية']} value={mech} onChange={setMech} /></Field>
      <Btn className="w-full" icon={BellRing} disabled={!amt} onClick={() => { p.toast(`سُجلت السلفة وأُرسلت SMS إلى ${w}`); p.go(19) }}>تسجيل السلفة وإشعار المستفيد بـ SMS</Btn>
    </Page>
  )
}

/* 19 */
const entries = [
  { d: '05/06', t: 'عربون', db: 300000, cr: 0 },
  { d: '08/06', t: 'سند توريد DL-0451', db: 0, cr: 625600 },
  { d: '09/06', t: 'سلفة - عبدالله', db: 40000, cr: 0 },
  { d: '12/06', t: 'دفعة مرحلية 1', db: 500000, cr: 0 },
  { d: '14/06', t: 'سند توريد DL-0463', db: 0, cr: 340000 },
]
export function Ledger(p: ScreenProps) {
  let bal = 0
  const rows = entries.map((e) => { bal += e.cr - e.db; return [e.d, <span className="font-display">{e.t}</span>, e.db ? fmt(e.db) : '-', e.cr ? fmt(e.cr) : '-', <span className="font-display">{fmt(bal)}</span>] })
  return (
    <Page title="الحساب المشترك" subtitle="سجل القيود المزدوجة للمعاملة" p={p} noBack>
      <div className="grid grid-cols-2 gap-2.5"><Stat tone="graphite" label="الرصيد الحالي" value={`${fmt(bal)} ر.ي`} /><Stat tone="oak" label="إجمالي المدفوع" value="840,000 ر.ي" /></div>
      <Section title="دفتر القيود">
        <Table head={['التاريخ', 'البيان', 'مدين +', 'دائن -', 'الرصيد']} rows={rows} />
        <p className="mt-2 flex items-center gap-1.5 px-1 text-[11px] font-bold text-mute"><Lock className="size-3.5" />القيود المرحّلة مقفلة، لا تعديل ولا شطب (BR-10)</p>
      </Section>
      <Section title="الحساب الجاري والآجل (مغلق الأمانة)">
        <Card><Row k="مسحوبات آجلة" v="965,600 ر.ي" /><Row k="المسدد" v="300,000 ر.ي" /><Row k="المتبقي" v={<span className="text-coral">665,600 ر.ي</span>} />
          <div className="clay-inset mt-2 h-3 overflow-hidden rounded-full"><div className="clay-oak h-full rounded-full" style={{ width: '31%' }} /></div>
          <p className="mt-2 text-[11px] font-medium text-mute">القسط القادم: 200,000 ر.ي بتاريخ 20/06</p></Card>
      </Section>
      <div className="mt-5 flex flex-col gap-2.5"><Btn icon={Download} onClick={() => p.toast('جارٍ تصدير كشف الحساب PDF')}>تصدير كشف حساب PDF</Btn><Btn tone="moon" icon={Handshake} onClick={() => p.go(20)}>كشف التصفية الختامية</Btn></div>
    </Page>
  )
}

/* 20 */
export function FinalSettlement(p: ScreenProps) {
  const [a, setA] = useState(false)
  const [b, setB] = useState(false)
  const [done, setDone] = useState(state.closed)
  const plus: [string, number][] = [['قيمة العمل المنفذ والمراحل المستلمة', 1850000], ['الأعمال الإضافية المعتمدة', 120000], ['دفعات مواد مستلمة بسندات مقبولة', 965600]]
  const minus: [string, number][] = [['العربون المدفوع', 300000], ['السلف النقدية', 40000], ['الدفعات المرحلية السابقة', 500000]]
  const net = plus.reduce((s, x) => s + x[1], 0) - minus.reduce((s, x) => s + x[1], 0)
  return (
    <Page title="التصفية الختامية" subtitle="كشف الحساب النهائي الشفاف" p={p}>
      <Card>
        {plus.map(([k, v]) => <Row key={k} k={`(+) ${k}`} v={<span className="text-ok">{fmt(v)}</span>} />)}
        {minus.map(([k, v]) => <Row key={k} k={`(-) ${k}`} v={<span className="text-coral">{fmt(v)}</span>} />)}
      </Card>
      <Card tone="graphite" className="mt-3.5 text-center"><p className="text-[12px] text-white/70">صافي الرصيد المستحق للمعلم والمغلق</p><p className="mt-1 font-display text-[30px] text-gold">{fmt(net)} <span className="text-[14px] text-white/70">ر.ي</span></p><p className="mt-0.5 text-[10.5px] text-white/50">BR-10</p></Card>
      <p className="mb-2 mt-5 px-1 font-display text-[16px]">إقرار المخالصة وفض النزاع</p>
      <Card className="!p-1.5"><Check2 label="العميل: أقرّ بدقة الحساب وأبرئ ذمة الطرف الآخر" checked={a} onChange={setA} /><Check2 label="المعلم / المورد: أقرّ باستلام المستحقات كاملة" checked={b} onChange={setB} /></Card>
      <div className="mt-5">
        {done ? <><Notice>أُغلقت المعاملة. يمكنك الآن نشر تقييم موثق.</Notice><Btn tone="oak" className="w-full" icon={Star} onClick={() => p.go(21)}>إضافة تقييم موثق</Btn></> :
          <Btn className="w-full" icon={CheckCheck} disabled={!(a && b)} onClick={() => { state.closed = true; setDone(true); p.toast('تم اعتماد التصفية وإغلاق المعاملة') }}>اعتماد التصفية النهائية وإغلاق المعاملة</Btn>}
      </div>
    </Page>
  )
}

/* 21 */
export function SubmitReview(p: ScreenProps) {
  const crit = ['جودة التنفيذ', 'الالتزام بالوقت', 'الأمانة', 'دقة القياس']
  const [r, setR] = useState<number[]>([0, 0, 0, 0])
  const [txt, setTxt] = useState('')
  const [ph, setPh] = useState(0)
  const [pub, setPub] = useState(false)
  if (!state.closed) {
    return (
      <Page title="تقييم موثوق" subtitle="غير متاح حاليًا" p={p}>
        <Card className="text-center"><Lock className="mx-auto size-10 text-oak" /><p className="mt-2 font-display text-[17px]">التقييم مقفل</p><p className="mt-1 text-[12.5px] font-medium leading-relaxed text-mute">لا تُفتح هذه الشاشة إلا بعد اعتماد التصفية النهائية وإغلاق المعاملة بالكامل، لمنع التقييمات الوهمية (BR-11).</p><Btn className="mt-4" icon={Handshake} onClick={() => p.go(20)}>الانتقال إلى التصفية</Btn></Card>
      </Page>
    )
  }
  const avg = r.reduce((s, x) => s + x, 0) / 4
  return (
    <Page title="تقييم موثوق" subtitle="صادق الحداد · WA-2025-0148" p={p}>
      <Notice>معاملة مغلقة ومصفّاة: التقييم موثق ومرتبط بالعقد (BR-11).</Notice>
      <Card>
        {crit.map((c, i) => (
          <div key={c} className="flex items-center justify-between border-b border-black/5 py-2.5 last:border-0">
            <span className="text-[13px] font-bold">{c}</span>
            <div className="flex gap-1" dir="ltr">{[1, 2, 3, 4, 5].map((s) => <button key={s} onClick={() => setR((x) => x.map((y, j) => (j === i ? s : y)))}><Star className="size-6" fill={s <= r[i] ? '#D8A868' : '#d8d0c4'} stroke="none" /></button>)}</div>
          </div>
        ))}
        <p className="pt-2 text-center text-[12px] font-bold text-mute">المعدل العام <span className="font-display text-[16px] text-ink">{avg.toFixed(1)}</span></p>
      </Card>
      <div className="mt-4"><Field label="رأيك وملاحظاتك"><TextArea rows={4} value={txt} onChange={setTxt} placeholder="شاركنا تجربتك مع المعلم..." /></Field></div>
      <Field label="صور الإنجاز النهائي"><div className="grid grid-cols-4 gap-2">{Array.from({ length: ph }).map((_, i) => <Thumb key={i} icon={FileCheck2} className="aspect-square !rounded-xl" />)}<button onClick={() => setPh((n) => Math.min(n + 1, 3))} className="clay-inset grid aspect-square place-items-center rounded-xl text-mute"><Camera className="size-5" /></button></div></Field>
      <Btn tone="oak" className="w-full" icon={pub ? ShieldCheck : Send} disabled={r.some((x) => !x) || txt.trim().length < 3 || pub} onClick={() => { setPub(true); p.toast('نُشر التقييم في الملف التعريفي'); p.go(5) }}>{pub ? 'تم النشر' : 'نشر التقييم الموثق في الملف التعريفي'}</Btn>
    </Page>
  )
}
