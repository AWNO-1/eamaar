import { useEffect, useRef, useState } from 'react'
import { Smartphone, MessageCircle, Home, HardHat, Hammer, Store, ShieldCheck, History, LogOut, Save, Camera, MapPin, BadgeCheck, Phone } from 'lucide-react'
import { Btn, Card, Field, Input, Select, Choice, Page, Badge, Avatar, Row, type ScreenProps } from '../ui'

const network = (n: string) => {
  if (/^(77|78)/.test(n)) return 'يمن موبايل'
  if (/^(71)/.test(n)) return 'سبأفون'
  if (/^(73|70)/.test(n)) return 'يو'
  return ''
}

/* 1 */
export function Login(p: ScreenProps) {
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)
  const [via, setVia] = useState('SMS')
  const [secs, setSecs] = useState(0)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const net = network(phone)
  const valid = phone.length === 9 && !!net

  useEffect(() => {
    if (secs <= 0) return
    const t = window.setTimeout(() => setSecs((s) => s - 1), 1000)
    return () => window.clearTimeout(t)
  }, [secs])

  const send = (channel: string) => { setVia(channel); setSent(true); setSecs(60); setOtp(['', '', '', '', '', '']); p.toast(`تم إرسال الرمز عبر ${channel}`) }
  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, '').slice(-1)
    setOtp((o) => o.map((x, j) => (j === i ? d : x)))
    if (d && i < 5) refs.current[i + 1]?.focus()
  }
  const full = otp.every(Boolean)

  return (
    <div className="no-scrollbar flex h-full flex-col overflow-y-auto">
      <div className="clay-graphite relative shrink-0 overflow-hidden rounded-b-[44px] px-6 pb-9 pt-16 text-center">
        <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 370 300" preserveAspectRatio="none" fill="none">
          <path d="M-20 -10 C30 -10 45 130 150 190 C195 215 230 240 260 300 L-20 300 Z" fill="rgba(255,255,255,.04)" />
          <path d="M42 -15 C32 62 80 140 190 200" stroke="rgba(255,255,255,.35)" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <img src="/logo.png" alt="إعمار تك" className="relative z-10 mx-auto size-[92px] rounded-[24px] object-contain shadow-2xl" />
        <h1 className="relative z-10 mt-3 text-[32px] leading-none text-white">إعمار تك</h1>
        <p className="relative z-10 mt-1.5 text-[12.5px] text-white/70">نبني معك، من الأساس</p>
      </div>

      <div className="flex-1 px-5 pb-8 pt-6">
        <h2 className="text-[21px]">{sent ? 'أدخل رمز التحقق' : 'تسجيل الدخول'}</h2>
        <p className="mb-5 mt-1 text-[12.5px] font-medium text-mute">
          {sent ? `أرسلنا رمزًا من 6 خانات إلى 967${phone} عبر ${via}` : 'أدخل رقم هاتفك اليمني وسنرسل لك رمزًا مؤقتًا، دون كلمات مرور.'}
        </p>

        <Field label="رقم الهاتف">
          <div className="relative" dir="ltr">
            <span className="clay-graphite absolute left-1.5 top-1.5 z-10 grid h-9 place-items-center rounded-[13px] px-3 text-[12.5px] font-bold">+967</span>
            <input
              inputMode="numeric" value={phone} placeholder="7X XXX XXXX" disabled={sent}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
              className="clay-inset h-12 w-full rounded-[18px] pl-[84px] pr-24 text-[15px] font-bold tracking-wider outline-none focus:ring-2 focus:ring-oak/40"
            />
            {net && <span className="absolute right-3 top-1/2 -translate-y-1/2"><Badge tone="oak">{net}</Badge></span>}
          </div>
          <p className="mt-1.5 px-1 text-[11px] font-medium text-mute">يدعم: يمن موبايل (77, 78) · سبأفون (71) · يو (70, 73)</p>
        </Field>

        {sent && (
          <div className="mb-4">
            <div className="flex justify-between gap-2" dir="ltr">
              {otp.map((d, i) => (
                <input
                  key={i} ref={(el) => { refs.current[i] = el }} value={d} inputMode="numeric"
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Backspace' && !d && i > 0) refs.current[i - 1]?.focus() }}
                  className={`h-[54px] w-full min-w-0 rounded-[16px] text-center font-display text-[22px] outline-none ${d ? 'clay-card' : 'clay-inset'}`}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-[12px] font-bold">
              <span className="text-mute">{secs > 0 ? `إعادة الإرسال خلال 00:${String(secs).padStart(2, '0')}` : 'لم يصلك الرمز؟'}</span>
              <button disabled={secs > 0} onClick={() => send(via)} className="text-oak disabled:opacity-40">إعادة إرسال الرمز</button>
            </div>
          </div>
        )}

        {!sent ? (
          <Btn className="w-full" icon={Smartphone} disabled={!valid} onClick={() => send('SMS')}>إرسال الرمز</Btn>
        ) : (
          <Btn className="w-full" icon={ShieldCheck} disabled={!full} onClick={() => p.go(2)}>تأكيد الدخول</Btn>
        )}

        <div className="my-4 flex items-center gap-3 text-[11px] font-bold text-mute">
          <span className="h-px flex-1 bg-black/10" />ضعف تغطية الرسائل؟<span className="h-px flex-1 bg-black/10" />
        </div>
        <Btn tone="moon" className="w-full" icon={MessageCircle} disabled={!valid} onClick={() => send('WhatsApp')}>الدخول عبر رسالة WhatsApp</Btn>
        <button onClick={() => p.go(0)} className="mt-4 w-full text-center text-[12px] font-bold text-mute">لدي حساب بالفعل - تخطي للتجربة</button>
      </div>
    </div>
  )
}

/* 2 */
const roles = [
  { k: 'عميل', t: 'صاحب منزل / عميل', s: 'Homeowner', i: Home },
  { k: 'مقاول', t: 'مقاول بناء', s: 'Contractor', i: HardHat },
  { k: 'حرفي', t: 'معلم حرفي / عامل', s: 'Craftsman', i: Hammer },
  { k: 'مورد', t: 'صاحب مغلق / مورد', s: 'Supplier', i: Store },
]
const dirs: Record<string, string[]> = {
  'صنعاء': ['السبعين', 'معين', 'الصافية', 'الثورة', 'بني الحارث', 'آزال'],
  'إب': ['إب المدينة', 'الظهار', 'جبلة', 'العدين', 'يريم', 'السياني'],
}
export function Register(p: ScreenProps) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('عميل')
  const [gov, setGov] = useState('صنعاء')
  const [dist, setDist] = useState(dirs['صنعاء'][0])
  const [trade, setTrade] = useState('لياسة')
  return (
    <Page title="إنشاء حساب" subtitle="خطوة أخيرة لتخصيص تجربتك" p={p} noBack>
      <Field label={role === 'مورد' ? 'اسم المحل / المغلق' : role === 'مقاول' ? 'الاسم التجاري' : 'الاسم الثلاثي'}>
        <Input value={name} onChange={setName} placeholder={role === 'مورد' ? 'مثال: مغلق الأمانة لمواد البناء' : 'مثال: أحمد محمد العمري'} />
      </Field>
      <p className="mb-2 px-1 text-[12.5px] font-bold">اختر دورك</p>
      <div className="mb-4 grid grid-cols-2 gap-2.5">
        {roles.map((r) => {
          const on = role === r.k
          return (
            <button key={r.k} onClick={() => setRole(r.k)} className={`press gloss ${on ? 'clay-graphite' : 'clay-moon text-ink'} flex h-[112px] flex-col items-center justify-center gap-2 rounded-[24px] px-2`}>
              <span className={`relative z-10 grid size-11 place-items-center rounded-2xl ${on ? 'bg-white/10' : 'clay-oak'}`}><r.i className="size-6" strokeWidth={1.8} /></span>
              <span className="relative z-10 font-display text-[13px] leading-tight">{r.t}</span>
              <span className={`relative z-10 text-[10px] font-bold ${on ? 'text-gold' : 'text-mute'}`}>{r.s}</span>
            </button>
          )
        })}
      </div>
      <Field label="المحافظة"><Choice cols={2} options={['صنعاء', 'إب']} value={gov} onChange={(g) => { setGov(g); setDist(dirs[g][0]) }} /></Field>
      <Field label="المديرية" hint={gov === 'صنعاء' ? 'اللبنة 44.44 م²' : 'قصبة إب'}><Select value={dist} onChange={setDist} options={dirs[gov]} /></Field>
      <p className="-mt-1 mb-4 px-1 text-[11px] font-medium text-mute">تُضبط معاملات المساحة والعملة تلقائيًا حسب منطقتك.</p>
      {role === 'حرفي' && (
        <Field label="المهنة">
          <Choice options={['بناء عظم', 'لياسة', 'سباكة', 'كهرباء', 'بلاط', 'نِجارة مسلحة']} value={trade} onChange={setTrade} />
        </Field>
      )}
      <Btn className="mt-2 w-full" icon={BadgeCheck} disabled={name.trim().length < 3} onClick={() => { p.toast('تم إنشاء الحساب بنجاح'); p.go(0) }}>إنشاء الحساب ومتابعة</Btn>
    </Page>
  )
}

/* 3 */
export function Profile(p: ScreenProps) {
  const [cur, setCur] = useState('ريال يمني - صنعاء')
  return (
    <Page title="حسابي" subtitle="الملف الشخصي والإعدادات" p={p} noBack>
      <Card>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar name="أ" size={72} tone="graphite" />
            <button className="clay-oak absolute -bottom-1 -left-1 grid size-7 place-items-center rounded-full"><Camera className="relative z-10 size-3.5" /></button>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[19px]">أحمد محمد العمري</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[12px] font-bold text-mute" dir="ltr"><Phone className="size-3.5" />+967 77X XXX XXX</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[12px] font-bold text-mute"><MapPin className="size-3.5" />صنعاء - السبعين</p>
          </div>
        </div>
      </Card>
      <Card tone="graphite" className="mt-3.5 flex items-center gap-3">
        <span className="clay-oak grid size-11 place-items-center rounded-2xl"><ShieldCheck className="relative z-10 size-6" /></span>
        <div className="flex-1"><p className="font-display text-[15px]">حساب موثّق</p><p className="text-[11.5px] text-white/70">البطاقة الشخصية · السجل التجاري قيد المراجعة</p></div>
        <Badge tone="ok">موثق</Badge>
      </Card>
      <Field label="العملة الافتراضية للمعاملات" hint="BR-11"><div className="mt-1" /><Choice cols={2} options={['ريال يمني - صنعاء', 'ريال يمني - عدن', 'ريال سعودي', 'دولار أمريكي']} value={cur} onChange={setCur} /></Field>
      <button onClick={() => p.go(19)} className="clay-card flex w-full items-center gap-3 rounded-[22px] p-4 text-right">
        <span className="clay-oak grid size-10 place-items-center rounded-[14px]"><History className="relative z-10 size-5" /></span>
        <span className="flex-1"><span className="block font-display text-[14.5px]">سجل المعاملات السابقة</span><span className="text-[11.5px] font-medium text-mute">12 عقدًا مغلقًا · 4 مشاريع منتهية</span></span>
      </button>
      <Card className="mt-3.5"><Row k="المنطقة النشطة" v="صنعاء - السبعين" /><Row k="وحدة المساحة" v="اللبنة الصنعانية" /><Row k="الدور" v="صاحب منزل / عميل" /></Card>
      <div className="mt-5 flex gap-2.5">
        <Btn className="flex-1" icon={Save} onClick={() => p.toast('تم حفظ التعديلات')}>حفظ التعديلات</Btn>
        <Btn tone="moon" className="flex-1" icon={LogOut} onClick={() => p.go(1)}>تسجيل الخروج</Btn>
      </div>
    </Page>
  )
}
