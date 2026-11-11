import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, Star, Eye, CalendarClock, Phone, MessageCircle, Mic, MapPin, Send, Play, Image as Img, Users, UserRound, FileCheck2, Lock, Plus, Camera, HardHat, CheckCheck, ClipboardList, Wallet } from 'lucide-react'
import { Btn, Card, Field, Input, TextArea, Select, Choice, Check2, Page, Badge, Avatar, Stars, Row, Notice, Table, Stepper, Section, Thumb, Actions, fmt, type ScreenProps } from '../ui'

/* 4 */
const workers = [
  { n: 'صادق الحداد', t: 'مليس', g: 'صنعاء', r: 4.9, c: 86, on: true },
  { n: 'علي ناجي الشرعبي', t: 'معلم بناء', g: 'إب', r: 4.7, c: 120, on: true },
  { n: 'منصور القباطي', t: 'سباك', g: 'صنعاء', r: 4.5, c: 64, on: false },
  { n: 'يحيى المقرمي', t: 'كهربائي', g: 'إب', r: 4.2, c: 41, on: true },
  { n: 'عبدالله الصبري', t: 'شاقي', g: 'صنعاء', r: 3.8, c: 28, on: true },
]
export function Directory(p: ScreenProps) {
  const [q, setQ] = useState('')
  const [trade, setTrade] = useState('الكل')
  const [gov, setGov] = useState('الكل')
  const [min, setMin] = useState(1)
  const [avail, setAvail] = useState(false)
  const [open, setOpen] = useState(false)
  const list = useMemo(() => workers.filter((w) => (trade === 'الكل' || w.t === trade) && (gov === 'الكل' || w.g === gov) && w.r >= min && (!avail || w.on) && (w.n + w.t).includes(q)), [q, trade, gov, min, avail])
  return (
    <Page title="دليل الحرفيين" subtitle="ابحث عن المعلم المناسب لعملك" p={p} noBack>
      <div className="-mt-9 mb-3 flex gap-2.5">
        <div className="clay-moon gloss flex h-[52px] flex-1 items-center gap-3 rounded-full px-5">
          <Search className="relative z-10 size-5 text-mute" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="الاسم، التخصص، الحي أو الشارع" className="relative z-10 min-w-0 flex-1 bg-transparent text-[13px] font-medium outline-none placeholder:text-mute" />
        </div>
        <button onClick={() => setOpen(!open)} className={`press gloss grid size-[52px] place-items-center rounded-[18px] ${open ? 'clay-graphite' : 'clay-moon'}`}><SlidersHorizontal className="relative z-10 size-5" /></button>
      </div>
      <div className="no-scrollbar -mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-2">
        {['الكل', 'معلم بناء', 'مليس', 'سباك', 'كهربائي', 'شاقي'].map((t) => (
          <button key={t} onClick={() => setTrade(t)} className={`press gloss shrink-0 rounded-full px-4 py-2 text-[12px] font-extrabold ${trade === t ? 'clay-graphite' : 'clay-moon text-ink'}`}><span className="relative z-10">{t}</span></button>
        ))}
      </div>
      {open && (
        <Card className="mb-3.5">
          <Field label="النطاق الجغرافي"><Choice options={['الكل', 'صنعاء', 'إب']} value={gov} onChange={setGov} /></Field>
          <Field label="التقييم الأدنى"><div className="flex gap-1.5">{[1, 2, 3, 4, 5].map((s) => <button key={s} onClick={() => setMin(s)} className={`press flex-1 rounded-xl py-2 text-[12px] font-extrabold ${min === s ? 'clay-oak' : 'clay-inset'}`}><span className="relative z-10 inline-flex items-center gap-0.5">{s}<Star className="size-3" fill="currentColor" /></span></button>)}</div></Field>
          <Check2 label="متاح للعمل اليوم فقط" checked={avail} onChange={setAvail} />
        </Card>
      )}
      <p className="mb-2 px-1 text-[12px] font-bold text-mute">{list.length} حرفي</p>
      {list.map((w) => (
        <Card key={w.n} className="mb-3">
          <div className="flex items-center gap-3">
            <Avatar name={w.n} size={56} tone={w.on ? 'oak' : 'graphite'} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[15.5px]">{w.n}</p>
              <p className="text-[12px] font-medium text-mute">{w.t} · {w.g}</p>
              <div className="mt-1 flex items-center gap-2 text-[11.5px] font-bold"><Stars value={w.r} size={12} />{w.r}<span className="text-mute">· {w.c} عملًا</span></div>
            </div>
            <Badge tone={w.on ? 'ok' : 'warn'}>{w.on ? 'متاح الآن' : 'مرتبط بعمل'}</Badge>
          </div>
          <div className="mt-3 flex gap-2">
            <Btn small className="flex-1" icon={Eye} onClick={() => p.go(5)}>عرض الملف</Btn>
            <Btn small tone="oak" className="flex-1" icon={CalendarClock} onClick={() => p.go(6)}>طلب معاينة</Btn>
          </div>
        </Card>
      ))}
      {!list.length && <Card className="text-center text-[13px] font-bold text-mute">لا توجد نتائج مطابقة</Card>}
    </Page>
  )
}

/* 5 */
export function WorkerProfile(p: ScreenProps) {
  const reviews = [
    { n: 'م. خالد الأهدل', s: 5, t: 'التزام بالموعد ودقة في القياس، لياسة ممتازة.', c: 'WA-0121' },
    { n: 'سالم العنسي', s: 4, t: 'عمل نظيف وأمين في حساب الأيام.', c: 'WA-0098' },
  ]
  return (
    <Page title="الملف المهني" subtitle="شواهد الأعمال والتقييمات الموثقة" p={p}>
      <Card tone="graphite">
        <div className="flex items-center gap-3.5">
          <Avatar name="صادق" size={68} />
          <div className="flex-1"><p className="font-display text-[19px]">صادق الحداد</p><p className="text-[12.5px] text-white/70">مليس · 14 سنة خبرة</p><p className="mt-1 flex items-center gap-1 text-[11.5px] text-gold"><MapPin className="size-3.5" />صنعاء - السبعين، معين</p></div>
          <Badge tone="ok">متاح</Badge>
        </div>
        <div className="mt-3.5 grid grid-cols-3 gap-2 text-center">
          {[['4.9', 'التقييم'], ['86', 'عملًا'], ['14', 'سنة']].map(([a, b]) => <div key={b} className="rounded-2xl bg-white/10 py-2"><p className="font-display text-[18px]">{a}</p><p className="text-[10.5px] text-white/70">{b}</p></div>)}
        </div>
      </Card>
      <Section title="شواهد الأعمال">
        <div className="grid grid-cols-3 gap-2.5">
          {['جدار عظم', 'لياسة واجهة', 'تشطيب', 'سباكة', 'فيديو', 'سقف'].map((l, i) => (
            <div key={l} className="relative"><Thumb label={l} icon={i === 4 ? Play : i % 2 ? Img : HardHat} className="aspect-square" />{i === 4 && <span className="absolute left-1.5 top-1.5 rounded-full bg-graphite px-1.5 text-[9px] font-bold text-white">فيديو</span>}</div>
          ))}
        </div>
      </Section>
      <Section title="التقييمات الموثقة" action="BR-11">
        {reviews.map((r) => (
          <Card key={r.c} className="mb-2.5 !p-3.5">
            <div className="flex items-center justify-between"><p className="font-display text-[14px]">{r.n}</p><Stars value={r.s} size={12} /></div>
            <p className="mt-1.5 text-[12.5px] font-medium leading-relaxed text-mute">{r.t}</p>
            <p className="mt-2 flex items-center gap-1 text-[10.5px] font-extrabold text-ok"><FileCheck2 className="size-3.5" />مرتبط بمعاملة مغلقة {r.c}</p>
          </Card>
        ))}
      </Section>
      <Section title="شروط العمل العامة">
        <Card><Row k="نمط العمل" v={<span className="inline-flex items-center gap-1"><Users className="size-4" />مع طاقم 3 شقاة</span>} /><Row k="طريقة الحساب" v="بالمتر المربع، أو يومية 18,000" /><Row k="المواد" v="أجرة يد فقط" /></Card>
      </Section>
      <Actions>
        <div className="flex gap-2.5"><Btn tone="moon" className="flex-1" icon={Phone} onClick={() => p.toast('جارٍ الاتصال...')}>اتصال</Btn><Btn tone="moon" className="flex-1" icon={MessageCircle} onClick={() => p.toast('فتح واتساب')}>واتساب</Btn></div>
        <Btn tone="oak" icon={ClipboardList} onClick={() => p.go(6)}>إنشاء طلب عمل ومعاينة</Btn>
      </Actions>
    </Page>
  )
}

/* 6 */
export function WorkRequest(p: ScreenProps) {
  const [type, setType] = useState('تشطيب')
  const [desc, setDesc] = useState('')
  const [rec, setRec] = useState(false)
  const [addr, setAddr] = useState('')
  const [date, setDate] = useState('2025-06-14')
  const [time, setTime] = useState('09:00')
  const [ch, setCh] = useState('اتصال هاتفي')
  return (
    <Page title="طلب عمل ومعاينة" subtitle="إلى: صادق الحداد - مليس" p={p}>
      <Field label="نوع العمل المطلوب"><Select value={type} onChange={setType} options={['تأسيس', 'تشطيب', 'ترميم', 'مقاولة متكاملة']} /></Field>
      <Field label="وصف المهمة الميدانية">
        <TextArea rows={4} value={desc} onChange={setDesc} placeholder="اكتب تفاصيل العمل المطلوب والمساحة التقريبية..." />
        <button onClick={() => { setRec(!rec); p.toast(rec ? 'تم إيقاف التسجيل' : 'جارٍ التسجيل الصوتي...') }} className={`press gloss mt-2 inline-flex h-10 items-center gap-2 rounded-[14px] px-4 text-[12px] font-extrabold ${rec ? 'clay-oak' : 'clay-moon text-ink'}`}>
          <Mic className="relative z-10 size-4" /><span className="relative z-10">{rec ? 'إيقاف التسجيل (00:07)' : 'تسجيل صوتي'}</span>
        </button>
      </Field>
      <Field label="موقع الورشة"><Input value={addr} onChange={setAddr} placeholder="المدينة، الحي، أقرب معلم" /></Field>
      <div className="grid grid-cols-2 gap-2.5">
        <Field label="تاريخ المعاينة"><Input type="date" value={date} onChange={setDate} dir="ltr" /></Field>
        <Field label="الوقت"><Input type="time" value={time} onChange={setTime} dir="ltr" /></Field>
      </div>
      <Field label="قناة التواصل المفضلة" hint="BR-03"><Choice cols={3} options={['اتصال هاتفي', 'محادثة النظام', 'نزول ميداني']} value={ch} onChange={setCh} /></Field>
      <Btn className="w-full" icon={Send} disabled={desc.trim().length < 3 || addr.trim().length < 3} onClick={() => { p.toast('تم إرسال طلب المعاينة'); p.go(7) }}>إرسال طلب المعاينة</Btn>
    </Page>
  )
}

/* 7 */
export function AgreementDraft(p: ScreenProps) {
  const [scope, setScope] = useState('')
  const [method, setMethod] = useState('باليومية')
  const [hours, setHours] = useState('8')
  const [unit, setUnit] = useState('متر مربع')
  const [sep, setSep] = useState(true)
  const [tools, setTools] = useState('المعلم')
  const [amount, setAmount] = useState('')
  const [cur, setCur] = useState('ريال يمني - صنعاء')
  const [dep, setDep] = useState('')
  const [refund, setRefund] = useState('')
  const [ref, setRef] = useState<string | null>(null)
  return (
    <Page title="صياغة الاتفاق" subtitle="مسودة مشتركة بين الطرفين" p={p}>
      <Field label="نطاق العمل المحدد" hint="BR-01"><TextArea rows={4} value={scope} onChange={setScope} placeholder="فصّل الأعمال والكميات: مثال لياسة 320 م² واجهات شرقية وغربية..." /></Field>
      <Field label="طريقة احتساب الأجر" hint="BR-02">
        <Choice cols={3} options={['باليومية', 'بالمقطوعية', 'بوحدة القياس']} value={method} onChange={setMethod} />
        {method === 'باليومية' && <div className="mt-2.5"><Input value={hours} onChange={setHours} suffix="ساعات / يوم" dir="ltr" /><p className="mt-1 px-1 text-[11px] font-medium text-mute">اليومية الكاملة = {hours || 8} ساعات (BR-03)</p></div>}
        {method === 'بوحدة القياس' && <div className="mt-2.5"><Choice options={['متر مربع', 'متر طولي', 'لبنة محلية']} value={unit} onChange={setUnit} /></div>}
      </Field>
      <Card className="mb-3.5 !p-1.5"><Check2 strict label="فصل المواد عن أجرة اليد: السعر أجرة يد فقط ولا يشمل المواد" checked={sep} onChange={setSep} /></Card>
      <Field label="المسؤول عن توفير العدد والأدوات والسقالات"><Choice cols={3} options={['المعلم', 'العميل', 'مشترك']} value={tools} onChange={setTools} /></Field>
      <div className="grid grid-cols-5 gap-2.5">
        <div className="col-span-3"><Field label="المبلغ المتفق عليه"><Input value={amount} onChange={(v) => setAmount(v.replace(/\D/g, ''))} dir="ltr" placeholder="0" /></Field></div>
        <div className="col-span-2"><Field label="العملة"><Select value={cur} onChange={setCur} options={['ريال يمني - صنعاء', 'ريال يمني - عدن', 'ريال سعودي', 'دولار أمريكي']} /></Field></div>
      </div>
      <Field label="العربون التأكيدي وشروط استرداده" hint="BR-06">
        <Input value={dep} onChange={(v) => setDep(v.replace(/\D/g, ''))} dir="ltr" placeholder="مبلغ العربون" />
        <div className="mt-2"><TextArea rows={2} value={refund} onChange={setRefund} placeholder="يُسترد كاملًا إذا تأخر البدء أكثر من 3 أيام..." /></div>
      </Field>
      {ref ? <Card tone="graphite" className="text-center"><FileCheck2 className="mx-auto size-8 text-gold" /><p className="mt-1 font-display text-[16px]">تم اعتماد الاتفاق</p><p className="mt-0.5 text-[12px] text-white/70">الرقم المرجعي {ref}</p><Btn tone="oak" small className="mt-3" onClick={() => p.go(8)}>عرض الاتفاق</Btn></Card> : (
        <Btn className="w-full" icon={CheckCheck} disabled={scope.trim().length < 5 || !amount} onClick={() => { setRef('WA-2025-0149'); p.toast('تم إنشاء وثيقة الاتفاق') }}>موافقة واعتماد الاتفاق</Btn>
      )}
    </Page>
  )
}

/* 8 */
export function AgreementDetails(p: ScreenProps) {
  return (
    <Page title="تفاصيل الاتفاق" subtitle="WA-2025-0148 · قيد التنفيذ" p={p}>
      <Card><Stepper steps={['مسودة', 'معتمد', 'تنفيذ', 'مكتمل', 'تصفية']} current={2} /></Card>
      <Card tone="graphite" className="mt-3.5">
        <p className="font-display text-[17px]">لياسة واجهات - فيلا الحصبة</p>
        <div className="mt-2"><Row k="الأطراف" v="أحمد العمري · صادق الحداد" /><Row k="الأجر المتفق عليه" v="1,850,000 ر.ي" /><Row k="الموقع" v="صنعاء - الحصبة" /></div>
      </Card>
      <Section title="بنود الاتفاق المعتمدة" action="قراءة فقط">
        <Card>
          {['لياسة 320 م² للواجهات الشرقية والغربية', 'الحساب بالمتر المربع بسعر 5,800 ر.ي', 'أجرة يد فقط، المواد على العميل', 'السقالات والأدوات على المعلم'].map((c, i) => (
            <div key={c} className="flex items-start gap-2.5 border-b border-black/5 py-2.5 text-[12.5px] font-bold last:border-0"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-oak/10 text-[10px] text-oak">{i + 1}</span>{c}</div>
          ))}
          <p className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-mute"><Lock className="size-3.5" />البنود مقفلة، لا تعديل صامتًا بعد الاعتماد</p>
        </Card>
      </Section>
      <Section title="المستندات والدفعات">
        <Table head={['البيان', 'التاريخ', 'المبلغ']} rows={[['عربون', '05/06', '300,000'], ['سلفة', '09/06', '40,000'], ['دفعة مرحلية 1', '12/06', '500,000']]} foot={['المجموع', '', '840,000']} />
      </Section>
      <Actions>
        <Btn tone="oak" icon={Plus} onClick={() => p.go(9)}>طلب إضافة عمل إضافي</Btn>
        <Btn icon={Play} onClick={() => p.go(10)}>بدء جلسة عمل يومية</Btn>
      </Actions>
    </Page>
  )
}

/* 9 */
export function ChangeOrder(p: ScreenProps) {
  const [desc, setDesc] = useState('')
  const [m, setM] = useState('مقطوعية')
  const [amt, setAmt] = useState('')
  const [pic, setPic] = useState(false)
  const [sent, setSent] = useState(false)
  return (
    <Page title="ملحق عمل إضافي" subtitle="أمر تغيير على الاتفاق WA-2025-0148" p={p}>
      <Notice tone="warn">الأعمال الإضافية تضاف كملحق مستقل ولا تلغي الاتفاق الأصلي (BR-04).</Notice>
      <Field label="وصف العمل الإضافي"><TextArea rows={4} value={desc} onChange={setDesc} placeholder="مثال: تكسير جدار إضافي، تعديل مسار مواسير..." /></Field>
      <Field label="طريقة الاحتساب"><Choice cols={3} options={['يومية', 'مقطوعية', 'بالمتر']} value={m} onChange={setM} /></Field>
      <Field label="المقدار المالي"><Input value={amt} onChange={(v) => setAmt(v.replace(/\D/g, ''))} suffix="ر.ي" dir="ltr" placeholder="0" /></Field>
      <Field label="صورة الموضع قبل التعديل">
        <button onClick={() => setPic(!pic)} className="clay-inset grid h-28 w-full place-items-center rounded-[20px] text-[12px] font-bold text-mute">
          {pic ? <span className="flex items-center gap-2 text-ok"><FileCheck2 className="size-5" />تم إرفاق صورة (1)</span> : <span className="flex flex-col items-center gap-1"><Camera className="size-6" />اضغط لالتقاط أو رفع صورة</span>}
        </button>
      </Field>
      <Actions>
        <Btn tone="moon" icon={Send} disabled={!desc.trim() || !amt} onClick={() => { setSent(true); p.toast('أُرسل الملحق للاعتماد') }}>إرسال الملحق للاعتماد</Btn>
        <Btn icon={Wallet} disabled={!sent} onClick={() => { p.toast('تم تثبيت الملحق في العقد'); p.go(8) }}>موافقة وتثبيت في العقد</Btn>
      </Actions>
    </Page>
  )
}
