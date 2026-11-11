import { useEffect, useState } from 'react'
import { Truck, Construction, Shovel, MapPin, CircleCheck, Play, Square, Timer, Snowflake, FileDown, Gavel, Image as Img, ClipboardList, ReceiptText, MessageSquare, RefreshCw, QrCode, UserRoundPlus, Cloud, Save, History, ScanLine } from 'lucide-react'
import { Btn, Card, Field, Input, Select, Choice, Check2, Page, Badge, Row, Notice, Table, Section, Thumb, Stat, fmt, type ScreenProps } from '../ui'

/* 22 */
export function Haulage(p: ScreenProps) {
  const [kind, setKind] = useState('قلاب')
  const [mat, setMat] = useState('نيس وادي مغربل')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [cap, setCap] = useState('12')
  const [road, setRoad] = useState(true)
  const [pay, setPay] = useState('العميل')
  const eq = [['قلاب', Truck], ['بوكلين', Construction], ['شيول', Shovel], ['دكاك', Construction]] as const
  return (
    <Page title="القلابات والمعدات" subtitle="جدولة حجز النقلة أو المعدة" p={p}>
      <div className="mb-4 grid grid-cols-4 gap-2.5">
        {eq.map(([n, I]) => <button key={n} onClick={() => setKind(n)} className={`press gloss ${kind === n ? 'clay-graphite' : 'clay-moon text-ink'} flex h-[84px] flex-col items-center justify-center gap-1.5 rounded-[20px]`}><I className="relative z-10 size-6" strokeWidth={1.8} /><span className="relative z-10 font-display text-[12px]">{n}</span></button>)}
      </div>
      <Field label="نوع المادة"><Select value={mat} onChange={setMat} options={['نيس وادي مغربل', 'كري', 'بحص', 'ردم', 'أنقاض']} /></Field>
      <Field label="موقع التحميل (المحجر / الوادي)"><Input value={from} onChange={setFrom} placeholder="مثال: وادي ظهر" /></Field>
      <Field label="موقع التنزيل"><Input value={to} onChange={setTo} placeholder="مثال: الحصبة - شارع الخمسين" /></Field>
      <Field label="سعة الصندوق الفعلية"><Input value={cap} onChange={setCap} suffix="م³" dir="ltr" /></Field>
      <Card className="mb-3.5 !p-1.5"><Check2 label="تأكدت من صلاحية الطريق لمرور الشاحنة" checked={road} onChange={setRoad} /></Card>
      <Field label="أجور عمال التنزيل على"><Choice cols={3} options={['العميل', 'المقاول', 'السائق']} value={pay} onChange={setPay} /></Field>
      <Btn className="w-full" icon={CircleCheck} disabled={!from.trim() || !to.trim() || !road} onClick={() => { p.toast(`تم تأكيد حجز ${kind}`); p.go(23) }}>تأكيد حجز النقلة والمعدة</Btn>
    </Page>
  )
}

/* 23 */
export function Demurrage(p: ScreenProps) {
  const [run, setRun] = useState(false)
  const [done, setDone] = useState(false)
  const [secs, setSecs] = useState(0)
  const [fast, setFast] = useState(true)
  const rate = 15000
  const grace = 30 * 60
  useEffect(() => {
    if (!run) return
    const t = window.setInterval(() => setSecs((s) => s + (fast ? 60 : 1)), 1000)
    return () => window.clearInterval(t)
  }, [run, fast])
  const over = Math.max(0, secs - grace)
  const fine = Math.ceil((over / 3600) * rate / 500) * 500
  const hh = String(Math.floor(secs / 3600)).padStart(2, '0'), mm = String(Math.floor((secs % 3600) / 60)).padStart(2, '0'), ss = String(secs % 60).padStart(2, '0')
  const pct = Math.min(100, (secs / grace) * 100)
  return (
    <Page title="مؤقت الانتظار" subtitle="غرامة الانتظار بالساعة (BR-12)" p={p}>
      <Card tone="graphite" className="text-center !py-7">
        <p className="text-[12px] text-white/70">مدة الانتظار في بوابة الموقع</p>
        <p className="my-2 font-display text-[54px] leading-none tracking-wider" dir="ltr">{hh}:{mm}<span className="text-[26px] text-white/50">:{ss}</span></p>
        <div className="mx-auto mt-3 h-3 w-[80%] overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full ${over ? 'bg-coral' : 'bg-gold'}`} style={{ width: `${pct}%` }} /></div>
        <p className="mt-2 text-[11.5px] font-bold text-gold">{over ? 'انتهت فترة السماح - تُحتسب غرامة' : `فترة السماح المجانية 30 دقيقة (متبقي ${Math.max(0, Math.ceil((grace - secs) / 60))} د)`}</p>
      </Card>
      <div className="mt-3.5 grid grid-cols-2 gap-2.5"><Stat label="تسعيرة الانتظار" value={`${fmt(rate)} ر.ي / ساعة`} /><Stat tone="oak" label="الغرامة المحتسبة" value={`${fmt(fine)} ر.ي`} /></div>
      <Card className="mt-3.5"><Row k="زمن الانتظار بعد السماح" v={`${Math.floor(over / 60)} دقيقة`} /><Row k="الترحيل" v={done ? 'رُحّلت إلى الفاتورة' : 'عند اكتمال التنزيل'} /></Card>
      <div className="mt-3"><Check2 label="تسريع العرض التجريبي (كل ثانية = دقيقة)" checked={fast} onChange={setFast} /></div>
      <div className="mt-4 flex flex-col gap-2.5">
        {!run && !done && <Btn icon={Play} onClick={() => { setRun(true); p.toast('بدأ المؤقت') }}>تأكيد الوصول إلى بوابة الموقع</Btn>}
        {(run || done) && <Btn tone="oak" icon={Square} disabled={done} onClick={() => { setRun(false); setDone(true); p.toast(`رُحّلت غرامة ${fmt(fine)} ر.ي إلى الفاتورة`) }}>{done ? 'تم إيقاف المؤقت' : 'تأكيد اكتمال التنزيل وإيقاف المؤقت'}</Btn>}
      </div>
    </Page>
  )
}

/* 24 */
export function Disputes(p: ScreenProps) {
  const [frozen, setFrozen] = useState(false)
  const [dec, setDec] = useState('')
  return (
    <Page title="محفظة النزاعات" subtitle="قضية رقم DS-2025-0009" p={p}>
      <Card tone="graphite">
        <div className="flex items-center justify-between"><p className="font-display text-[16px]">عيوب في لياسة الواجهة الشرقية</p><Badge tone="warn">قيد التحكيم</Badge></div>
        <div className="mt-2"><Row k="الطرف الشاكي" v="أحمد العمري (عميل)" /><Row k="المدعى عليه" v="صادق الحداد (معلم)" /><Row k="المبلغ محل الخلاف" v="500,000 ر.ي" /></div>
      </Card>
      <Btn tone={frozen ? 'oak' : 'moon'} className="mt-3.5 w-full" icon={Snowflake} onClick={() => { setFrozen(!frozen); p.toast(frozen ? 'أُلغي التجميد' : 'جُمّدت المستحقات المعلقة') }}>{frozen ? 'المستحقات مجمّدة - إلغاء التجميد' : 'تجميد المستحقات المعلقة'}</Btn>
      <Section title="البراهين المحمية">
        <div className="grid grid-cols-3 gap-2.5"><Thumb icon={Img} label="صورة عيب 1" className="aspect-square" /><Thumb icon={Img} label="صورة عيب 2" className="aspect-square" /><Thumb icon={ClipboardList} label="حضور 10/06" className="aspect-square" /><Thumb icon={ReceiptText} label="سند DL-0451" className="aspect-square" /></div>
      </Section>
      <Field label="قرار الوسيط / المحكم العرفي"><div className="mt-1" /><Choice cols={3} options={['إلزام بالإصلاح', 'خصم تعويضي', 'تبرئة']} value={dec} onChange={setDec} /></Field>
      <div className="flex flex-col gap-2.5">
        <Btn icon={Gavel} disabled={!dec} onClick={() => p.toast(`سُجل القرار: ${dec}`)}>إصدار القرار</Btn>
        <Btn tone="moon" icon={FileDown} onClick={() => p.toast('جارٍ تصدير ملف النزاع والبراهين')}>تصدير ملف النزاع الرسمي والبراهين</Btn>
      </div>
    </Page>
  )
}

/* 25 */
export function ProxyGateway(p: ScreenProps) {
  const [w, setW] = useState('رضوان العزي (بلا هاتف)')
  const [kind, setKind] = useState('حضور')
  const [amt, setAmt] = useState('')
  const [queue, setQueue] = useState([{ t: 'حضور - نبيل', s: 'بانتظار' }, { t: 'سلفة 10,000 - رضوان', s: 'بانتظار' }, { t: 'سند DL-0463', s: 'بانتظار' }])
  const [scan, setScan] = useState(false)
  const pend = queue.filter((q) => q.s === 'بانتظار').length
  return (
    <Page title="بوابة الوكلاء" subtitle="إدخال بالنيابة والمزامنة" p={p}>
      <Card tone="graphite" className="flex items-center gap-3"><Cloud className="size-8 text-gold" /><div className="flex-1"><p className="font-display text-[15px]">طابور المزامنة دون اتصال</p><p className="text-[11.5px] text-white/70">{pend ? `${pend} عمليات بانتظار الإرسال` : 'جميع العمليات متزامنة'}</p></div>
        <button onClick={() => { setQueue((q) => q.map((x) => ({ ...x, s: 'تمت' }))); p.toast('تمت المزامنة') }} className="press clay-oak gloss grid size-11 place-items-center rounded-[15px]"><RefreshCw className="relative z-10 size-5" /></button></Card>
      <p className="mb-2 mt-5 px-1 font-display text-[16px]">إدخال بالنيابة عن عامل</p>
      <Card>
        <Field label="العامل"><Select value={w} onChange={setW} options={['رضوان العزي (بلا هاتف)', 'سلطان المخلافي (بلا هاتف)', 'حسن الجرادي (بلا هاتف)']} /></Field>
        <Field label="نوع العملية"><Choice cols={3} options={['حضور', 'انصراف', 'سلفة']} value={kind} onChange={setKind} /></Field>
        {kind === 'سلفة' && <Field label="المبلغ"><Input value={amt} onChange={(v) => setAmt(v.replace(/\D/g, ''))} dir="ltr" suffix="ر.ي" /></Field>}
        <Btn small className="w-full" icon={UserRoundPlus} onClick={() => { setQueue((q) => [{ t: `${kind} - ${w.split(' ')[0]}`, s: 'بانتظار' }, ...q]); p.toast('أُضيفت العملية للطابور') }}>تسجيل بالنيابة</Btn>
      </Card>
      <Section title="مسح كود السندات">
        <button onClick={() => { setScan(true); window.setTimeout(() => { setScan(false); p.toast('تم قراءة السند DL-0468') }, 1400) }} className="clay-inset relative grid h-32 w-full place-items-center overflow-hidden rounded-[22px]">
          {scan && <span className="absolute inset-x-6 h-0.5 animate-[scan_1s_ease-in-out_infinite_alternate] bg-coral shadow-[0_0_10px_#c84b31]" />}
          <span className="flex flex-col items-center gap-1 text-[12px] font-bold text-mute"><QrCode className="size-9 text-oak" />{scan ? 'جارٍ المسح...' : 'اضغط لمسح QR للسند أو بطاقة الأجر'}</span>
        </button>
      </Section>
      <Section title="سجل الرسائل (SMS / WhatsApp)">
        <Table head={['القناة', 'الرسالة', 'الحالة']} rows={[['SMS', 'تأكيد حضور - نبيل', <Badge>وصلت</Badge>], ['WhatsApp', 'سلفة 10,000', <Badge>وصلت</Badge>], ['SMS', 'سند DL-0463', <Badge tone="warn">قيد الإرسال</Badge>]]} />
      </Section>
      <Section title="عمليات الطابور">{queue.map((q, i) => <Card key={i} className="mb-2 flex items-center justify-between !p-3"><span className="text-[12.5px] font-bold">{q.t}</span><Badge tone={q.s === 'تمت' ? 'ok' : 'warn'}>{q.s}</Badge></Card>)}</Section>
    </Page>
  )
}

/* 26 */
export function RegionalUnits(p: ScreenProps) {
  const [units, setUnits] = useState([{ n: 'اللبنة الصنعانية', v: '44.44', r: 'صنعاء' }, { n: 'القصبة - إب', v: '30.25', r: 'إب' }, { n: 'اللبنة - إب', v: '37.80', r: 'إب' }])
  const [door, setDoor] = useState('خصم الأبواب والشبابيك فوق 1.5 م²')
  return (
    <Page title="المعايير والوحدات" subtitle="إدارة النظام (BR-09)" p={p} noBack>
      <p className="mb-2 px-1 font-display text-[16px]">معاملات تحويل المساحة (م²)</p>
      <Card>
        {units.map((u, i) => (
          <div key={u.n} className="flex items-center gap-3 border-b border-black/5 py-2.5 last:border-0">
            <div className="flex-1"><p className="font-display text-[14px]">{u.n}</p><p className="text-[10.5px] font-bold text-mute">{u.r}</p></div>
            <div className="w-28"><Input dir="ltr" value={u.v} suffix="م²" onChange={(v) => setUnits((x) => x.map((y, j) => (j === i ? { ...y, v: v.replace(/[^\d.]/g, '') } : y)))} className="!h-10" /></div>
          </div>
        ))}
      </Card>
      <Field label="قالب احتساب اللياسة والبناء"><div className="mt-1" /><Select value={door} onChange={setDoor} options={['خصم الأبواب والشبابيك فوق 1.5 م²', 'خصم كامل الفتحات', 'بدون خصم']} /></Field>
      <Section title="سجل التدقيق للأسعار والعملات">
        <Table head={['التاريخ', 'البند', 'القيمة']} rows={[['01/06', 'سعر صرف SAR', '140'], ['01/06', 'أسمنت 50 كجم', '6,800'], ['15/05', 'سعر صرف SAR', '138']]} />
      </Section>
      <Btn className="mt-5 w-full" icon={Save} onClick={() => p.toast('حُفظت المعايير وسُجلت في التدقيق')}>حفظ المعايير</Btn>
    </Page>
  )
}
