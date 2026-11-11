import { useState, useMemo, type ComponentType } from 'react'
import BottomNav, { type TabKey } from './BottomNav'
import { useToastState, type ScreenProps } from './ui'
import Home from './screens/Home'
import { Login, Register, Profile } from './screens/identity'
import { Directory, WorkerProfile, WorkRequest, AgreementDraft, AgreementDetails, ChangeOrder } from './screens/labor'
import { AttendanceLogger, Suspension, Inspection } from './screens/execution'
import { Catalog, QuoteRequest, QuoteReview, SupplyOrders, DeliveryReceipt } from './screens/supply'
import { AdvancePayment, Ledger, FinalSettlement, SubmitReview } from './screens/settlement'
import { Haulage, Demurrage, Disputes, ProxyGateway, RegionalUnits } from './screens/phase2'

type Def = { id: number; title: string; group: string; C: ComponentType<ScreenProps>; tab?: TabKey; bare?: boolean }
export const SCREENS: Def[] = [
  { id: 0, title: 'الرئيسية', group: 'لوحة التحكم', C: Home, tab: 'home' },
  { id: 1, title: 'تسجيل الدخول برمز الهاتف', group: 'الهوية والحسابات', C: Login, bare: true },
  { id: 2, title: 'إنشاء الحساب واختيار الدور', group: 'الهوية والحسابات', C: Register, bare: true },
  { id: 3, title: 'الملف الشخصي والإعدادات', group: 'الهوية والحسابات', C: Profile, tab: 'profile' },
  { id: 4, title: 'دليل الحرفيين والعمال', group: 'الحرفيون والاتفاقات', C: Directory, tab: 'crafts' },
  { id: 5, title: 'الملف المهني وشواهد الأعمال', group: 'الحرفيون والاتفاقات', C: WorkerProfile, tab: 'crafts' },
  { id: 6, title: 'طلب العمل والمعاينة', group: 'الحرفيون والاتفاقات', C: WorkRequest, tab: 'crafts' },
  { id: 7, title: 'صياغة الاتفاق المرن', group: 'الحرفيون والاتفاقات', C: AgreementDraft, tab: 'home' },
  { id: 8, title: 'تفاصيل الاتفاق المعتمد', group: 'الحرفيون والاتفاقات', C: AgreementDetails, tab: 'home' },
  { id: 9, title: 'ملحق عمل إضافي', group: 'الحرفيون والاتفاقات', C: ChangeOrder, tab: 'home' },
  { id: 10, title: 'جلسة العمل وحضور العمال', group: 'التنفيذ والرقابة', C: AttendanceLogger, tab: 'home' },
  { id: 11, title: 'بلاغ توقف العمل', group: 'التنفيذ والرقابة', C: Suspension, tab: 'home' },
  { id: 12, title: 'فحص المنجز واستلام المراحل', group: 'التنفيذ والرقابة', C: Inspection, tab: 'home' },
  { id: 13, title: 'كتالوج المواد والمغالق', group: 'المواد والتوريد', C: Catalog, tab: 'materials' },
  { id: 14, title: 'طلب تسعيرة مواد', group: 'المواد والتوريد', C: QuoteRequest, tab: 'materials' },
  { id: 15, title: 'عرض السعر والصلاحية', group: 'المواد والتوريد', C: QuoteReview, tab: 'materials' },
  { id: 16, title: 'طلبيات التوريد والدفعات', group: 'المواد والتوريد', C: SupplyOrders, tab: 'materials' },
  { id: 17, title: 'سند الاستلام والتالف', group: 'المواد والتوريد', C: DeliveryReceipt, tab: 'materials' },
  { id: 18, title: 'صرف السلف النقدية', group: 'الحسابات والتقييم', C: AdvancePayment, tab: 'ledger' },
  { id: 19, title: 'سجل الحساب المشترك', group: 'الحسابات والتقييم', C: Ledger, tab: 'ledger' },
  { id: 20, title: 'كشف التصفية الختامية', group: 'الحسابات والتقييم', C: FinalSettlement, tab: 'ledger' },
  { id: 21, title: 'تقييم موثوق وشواهد الإنجاز', group: 'الحسابات والتقييم', C: SubmitReview, tab: 'ledger' },
  { id: 22, title: 'جدولة القلابات والمعدات', group: 'المرحلة الثانية', C: Haulage, tab: 'materials' },
  { id: 23, title: 'مؤقت غرامات الانتظار', group: 'المرحلة الثانية', C: Demurrage, tab: 'materials' },
  { id: 24, title: 'محفظة النزاعات والتحكيم', group: 'المرحلة الثانية', C: Disputes, tab: 'ledger' },
  { id: 25, title: 'بوابة الوكلاء الميدانيين', group: 'المرحلة الثانية', C: ProxyGateway, tab: 'home' },
  { id: 26, title: 'إدارة المعايير والوحدات', group: 'المرحلة الثانية', C: RegionalUnits, tab: 'profile' },
]

export default function App() {
  const [stack, setStack] = useState<number[]>([1])
  const { msg, show } = useToastState()
  const id = stack[stack.length - 1]
  const def = SCREENS.find((s) => s.id === id)!

  const p: ScreenProps = useMemo(() => ({
    go: (n) => setStack((s) => (s[s.length - 1] === n ? s : [...s, n])),
    back: () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : [0])),
    toast: show,
  }), [show])
  // Bottom-bar jumps reset the stack so the tab acts as a root.
  const jump = (n: number) => setStack([n])
  const groups = [...new Set(SCREENS.map((s) => s.group))]

  return (
    <div className="flex min-h-full items-center justify-center gap-10 p-0 sm:p-6" dir="rtl">
      {/* Screen index (desktop only) */}
      <aside className="clay-card no-scrollbar hidden max-h-[852px] w-[320px] shrink-0 overflow-y-auto rounded-[28px] p-5 lg:block">
        <div className="mb-4 flex items-center gap-3">
          <img src="/logo.png" alt="إعمار تك" className="size-12 object-contain" />
          <div>
            <h2 className="text-[22px] leading-tight">إعمار تك</h2>
            <p className="text-[11.5px] font-medium text-mute">26 شاشة - اضغط للانتقال</p>
          </div>
        </div>
        {groups.map((g) => (
          <div key={g} className="mb-3">
            <p className="mb-1 px-1 text-[11px] font-extrabold text-oak">{g}</p>
            {SCREENS.filter((s) => s.group === g).map((s) => (
              <button
                key={s.id} onClick={() => setStack([s.id])}
                className={`flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-right text-[12.5px] font-bold ${s.id === id ? 'clay-graphite' : 'hover:bg-black/5'}`}
              >
                <span className={`grid size-6 place-items-center rounded-lg text-[11px] ${s.id === id ? 'bg-white/15' : 'bg-oak/10 text-oak'}`}>{s.id}</span>
                <span className="relative z-10 truncate">{s.title}</span>
              </button>
            ))}
          </div>
        ))}
      </aside>

      {/* Phone */}
      <div className="h-dvh w-full max-w-[392px] bg-gradient-to-br from-[#4a4845] via-[#0f0f0e] to-[#3a3835] p-0 shadow-[0_35px_70px_-15px_rgba(25,20,15,.55)] sm:h-[852px] sm:rounded-[54px] sm:p-[11px]">
        <div className="relative size-full overflow-hidden bg-gradient-to-b from-[#eae0d2] via-[#e8dec9] to-[#e4d9c8] sm:rounded-[44px]">
          <div className="pointer-events-none absolute left-1/2 top-2.5 z-50 hidden h-[31px] w-[116px] -translate-x-1/2 rounded-full bg-[#08090a] sm:block" />
          <div key={id} className="h-full animate-[fade_.3s_ease]">
            <def.C {...p} />
          </div>
          {!def.bare && <BottomNav active={def.tab ?? 'home'} onSelect={jump} />}
          <div className={`pointer-events-none absolute inset-x-0 top-14 z-[60] mx-auto w-fit max-w-[85%] rounded-full bg-graphite px-4 py-2 text-[12.5px] font-bold text-white shadow-xl transition-all duration-300 ${msg ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
            {msg}
          </div>
        </div>
      </div>
    </div>
  )
}
