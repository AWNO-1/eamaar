import { useState } from 'react'
import { CloudSun, UserPlus, WifiOff, Save, OctagonAlert, BellRing, Camera, BadgeCheck, FileCheck2 } from 'lucide-react'
import { Btn, Card, Field, Input, TextArea, Choice, Check2, Page, Avatar, Notice, Thumb, Stepper, type ScreenProps } from '../ui'
import { HardHat } from 'lucide-react'

type St = 'حاضر' | 'غائب' | 'نصف يومية'
/* 10 */
export function AttendanceLogger(p: ScreenProps) {
  const [crew, setCrew] = useState<{ n: string; t: string; s: St; a: string; d: string }[]>([
    { n: 'صادق الحداد', t: 'مليس', s: 'حاضر', a: '07:00', d: '15:00' },
    { n: 'عبدالله الصبري', t: 'شاقي', s: 'حاضر', a: '07:15', d: '15:00' },
    { n: 'نبيل الوصابي', t: 'شاقي', s: 'نصف يومية', a: '07:00', d: '11:00' },
    { n: 'رضوان العزي', t: 'شاقي', s: 'غائب', a: '--', d: '--' },
  ])
  const [tasks, setTasks] = useState('')
  const [online, setOnline] = useState(true)
  const [saved, setSaved] = useState(false)
  const set = (i: number, s: St) => setCrew((c) => c.map((w, j) => (j === i ? { ...w, s, a: s === 'غائب' ? '--' : w.a === '--' ? '07:00' : w.a, d: s === 'غائب' ? '--' : w.d === '--' ? '15:00' : w.d } : w)))
  const present = crew.filter((w) => w.s !== 'غائب').length
  return (
    <Page title="جلسة العمل اليومية" subtitle="تسجيل الحضور وإنجاز اليوم" p={p}>
      <Card tone="graphite" className="flex items-center justify-between">
        <div><p className="font-display text-[17px]">الثلاثاء 10 يونيو 2025</p><p className="text-[11.5px] text-white/70">فيلا الحصبة · WA-2025-0148</p></div>
        <div className="text-center"><CloudSun className="mx-auto size-7 text-gold" /><p className="text-[11px] font-bold">صحو 27°</p></div>
      </Card>
      <div className="mb-2 mt-4 flex items-center justify-between px-1"><h3 className="text-[16px]">طاقم العمل ({present}/{crew.length})</h3><button onClick={() => { setCrew((c) => [...c, { n: `عامل مؤقت ${c.length - 3}`, t: 'شاقي', s: 'حاضر', a: '08:00', d: '15:00' }]); p.toast('أُضيف عامل مؤقت (BR-05)') }} className="flex items-center gap-1 text-[12px] font-extrabold text-oak"><UserPlus className="size-4" />عامل مؤقت</button></div>
      {crew.map((w, i) => (
        <Card key={w.n + i} className="mb-2.5 !p-3">
          <div className="flex items-center gap-3"><Avatar name={w.n} size={40} /><div className="flex-1"><p className="font-display text-[14px]">{w.n}</p><p className="text-[11px] font-medium text-mute">{w.t}</p></div><span className="text-[11px] font-bold text-mute" dir="ltr">{w.a} → {w.d}</span></div>
          <div className="mt-2.5"><Choice cols={3} options={['حاضر', 'نصف يومية', 'غائب']} value={w.s} onChange={(v) => set(i, v as St)} /></div>
        </Card>
      ))}
      <Field label="مهام اليوم المنجزة"><TextArea rows={3} value={tasks} onChange={setTasks} placeholder="مثال: رص 500 بلكة، تلييس واجهة شرقية" /></Field>
      <button onClick={() => setOnline(!online)} className={`mb-3 flex w-full items-center gap-2 rounded-[16px] px-3 py-2.5 text-[12px] font-bold ${online ? 'bg-[#e8efea] text-ok' : 'bg-[#f6e7d3] text-[#7a4f12]'}`}><WifiOff className="size-4" />{online ? 'متصل بالشبكة - اضغط لمحاكاة الانقطاع' : 'دون اتصال - سيُحفظ محليًا ويُزامن لاحقًا'}</button>
      <Btn className="w-full" icon={Save} disabled={!tasks.trim()} onClick={() => { setSaved(true); p.toast(online ? 'تم تثبيت الجلسة' : 'حُفظت محليًا (Offline-First)') }}>{saved ? 'تم التثبيت' : 'حفظ وتثبيت جلسة العمل'}</Btn>
    </Page>
  )
}

/* 11 */
export function Suspension(p: ScreenProps) {
  const [reason, setReason] = useState('نقص مواد البناء')
  const [resp, setResp] = useState('المورد')
  const [from, setFrom] = useState('2025-06-10T09:30')
  const [to, setTo] = useState('2025-06-11T07:00')
  const [done, setDone] = useState(false)
  const reasons = [['نقص مواد البناء', 'تأخر أسمنت / ماء / بلوك'], ['سوء الأحوال الجوية', 'أمطار غزيرة / سيول'], ['تعطل المعدات', 'خلاطة / رافعة'], ['خلاف تعاقدي', 'توجيه من المالك']]
  return (
    <Page title="بلاغ توقف العمل" subtitle="توثيق الحدث وإشعار الأطراف" p={p}>
      <Field label="بداية التوقف"><Input type="datetime-local" value={from} onChange={setFrom} dir="ltr" /></Field>
      <p className="mb-2 px-1 text-[12.5px] font-bold">سبب التوقف <span className="mr-1 rounded-full bg-oak/10 px-2 py-0.5 text-[10px] text-oak">BR-05</span></p>
      <div className="mb-4 grid grid-cols-2 gap-2.5">
        {reasons.map(([a, b]) => <button key={a} onClick={() => setReason(a)} className={`press gloss ${reason === a ? 'clay-graphite' : 'clay-moon text-ink'} rounded-[20px] p-3 text-right`}><OctagonAlert className="relative z-10 mb-1.5 size-5 text-gold" /><p className="relative z-10 font-display text-[13px]">{a}</p><p className={`relative z-10 text-[10.5px] ${reason === a ? 'text-white/65' : 'text-mute'}`}>{b}</p></button>)}
      </div>
      <Field label="الطرف المسؤول عن التوقف"><Choice cols={4} options={['العميل', 'المعلم', 'المورد', 'قوة قاهرة']} value={resp} onChange={setResp} /></Field>
      <p className="-mt-2 mb-4 px-1 text-[11px] font-medium text-mute">يحدد الطرف المسؤول استحقاق يوميات العمال وأجور الانتظار.</p>
      <Field label="وقت الاستئناف المتوقع"><Input type="datetime-local" value={to} onChange={setTo} dir="ltr" /></Field>
      {done && <Notice>سُجّل الحدث وأُرسل إشعار إلى جميع أطراف الاتفاق.</Notice>}
      <Btn className="w-full" icon={BellRing} onClick={() => { setDone(true); p.toast('تم تسجيل التوقف وإشعار الأطراف') }}>تسجيل حدث التوقف وإشعار الأطراف</Btn>
    </Page>
  )
}

/* 12 */
export function Inspection(p: ScreenProps) {
  const items = ['الاستواء والميلان مطابقان', 'مطابقة المقاسات للمخططات', 'لا توجد عيوب ظاهرة أو تشققات', 'نظافة الموقع بعد الإنجاز']
  const [ck, setCk] = useState<boolean[]>([true, true, false, false])
  const [photos, setPhotos] = useState(1)
  const [note, setNote] = useState('')
  const all = ck.every(Boolean)
  return (
    <Page title="فحص واستلام المرحلة" subtitle="اعتماد المنجز قبل ترحيل المستحقات" p={p}>
      <Card tone="graphite">
        <div className="flex items-center gap-3"><span className="clay-oak grid size-12 place-items-center rounded-2xl"><HardHat className="relative z-10 size-6" /></span><div className="flex-1"><p className="font-display text-[16px]">الانتهاء من مباني الدور الأول</p><p className="text-[11.5px] text-white/70">المرحلة 2 من 5 · مستحقها 500,000 ر.ي</p></div></div>
        <div className="mt-4"><Stepper steps={['أساسات', 'مباني', 'سقف', 'لياسة', 'تشطيب']} current={1} /></div>
      </Card>
      <p className="mb-2 mt-5 px-1 font-display text-[16px]">قائمة تدقيق الجودة</p>
      <Card className="!p-1.5">{items.map((t, i) => <Check2 key={t} label={t} checked={ck[i]} onChange={(v) => setCk((c) => c.map((x, j) => (j === i ? v : x)))} />)}</Card>
      <p className="mb-2 mt-5 px-1 font-display text-[16px]">صور المنجز النهائي</p>
      <div className="grid grid-cols-3 gap-2.5">
        {Array.from({ length: photos }).map((_, i) => <Thumb key={i} icon={FileCheck2} label={`صورة ${i + 1}`} className="aspect-square" />)}
        <button onClick={() => setPhotos((n) => Math.min(n + 1, 5))} className="clay-inset grid aspect-square place-items-center rounded-[18px] text-mute"><Camera className="size-6" /></button>
      </div>
      <div className="mt-4"><Field label="ملاحظات أو تعديلات مطلوبة قبل الاستلام"><TextArea value={note} onChange={setNote} placeholder="اكتب أي ملاحظات..." /></Field></div>
      {!all && <Notice tone="warn">أكمل جميع بنود التدقيق أو دوّن التعديلات المطلوبة قبل الاعتماد.</Notice>}
      <Btn className="w-full" icon={BadgeCheck} disabled={!all} onClick={() => { p.toast('تم اعتماد المرحلة وترحيل 500,000 ر.ي'); p.go(19) }}>اعتماد استلام المرحلة وترحيل المستحقات</Btn>
    </Page>
  )
}
