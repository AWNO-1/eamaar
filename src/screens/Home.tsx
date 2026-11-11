import { Bell, Search, SlidersHorizontal, HardHat, Boxes, FileSignature, ClipboardCheck, Truck, ReceiptText, Scale, ArrowLeft, FilePlus2, Timer } from 'lucide-react'
import { Card, Section, Stepper, Badge, Thumb, type ScreenProps } from '../ui'

const quick = [
  { t: 'دليل الحرفيين', i: HardHat, s: 4, tone: 'clay-moon text-ink' },
  { t: 'كتالوج المواد', i: Boxes, s: 13, tone: 'clay-graphite' },
  { t: 'اتفاق جديد', i: FileSignature, s: 7, tone: 'clay-oak' },
  { t: 'جلسة اليوم', i: ClipboardCheck, s: 10, tone: 'clay-graphite' },
  { t: 'طلب تسعيرة', i: FilePlus2, s: 14, tone: 'clay-oak' },
  { t: 'التصفية', i: Scale, s: 20, tone: 'clay-moon text-ink' },
  { t: 'القلابات', i: Truck, s: 22, tone: 'clay-moon text-ink' },
  { t: 'سند استلام', i: ReceiptText, s: 17, tone: 'clay-graphite' },
]

export default function Home(p: ScreenProps) {
  return (
    <div className="no-scrollbar h-full overflow-y-auto pb-[128px]">
      <header className="clay-graphite relative h-[168px] overflow-hidden rounded-b-[38px] px-4 pt-14">
        <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 370 170" preserveAspectRatio="none" fill="none">
          <path d="M-20 -10 C30 -10 45 75 130 120 C175 142 210 155 240 175 L-20 175 Z" fill="rgba(255,255,255,.04)" />
          <path d="M18 -15 C5 45 52 105 148 148 C175 160 195 168 215 175 L155 175 C82 142 22 88 -5 15 Z" fill="rgba(232,223,211,.12)" />
          <path d="M42 -15 C32 42 72 96 165 142" stroke="rgba(255,255,255,.4)" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="size-12 rounded-xl object-contain" />
            <div>
              <h1 className="text-[27px] leading-[1.1] text-white">إعمار تك</h1>
              <p className="mt-0.5 text-[12px] text-white/70">نبني معك، من الأساس</p>
            </div>
          </div>
          <button onClick={() => p.toast('3 إشعارات جديدة: عرض سعر، سند استلام، تصفية')} className="press clay-moon gloss relative grid size-11 place-items-center rounded-[15px] text-ink">
            <Bell className="relative z-10 size-5" />
            <span className="absolute right-2.5 top-2.5 z-10 size-2 rounded-full bg-coral" />
          </button>
        </div>
      </header>

      <div className="-mt-7 flex gap-2.5 px-4">
        <button onClick={() => p.go(4)} className="clay-moon gloss flex h-[52px] flex-1 items-center gap-3 rounded-full px-5 text-right">
          <Search className="relative z-10 size-5 text-mute" />
          <span className="relative z-10 text-[13.5px] font-medium text-mute">ابحث عن حرفي أو مواد أو موردين...</span>
        </button>
        <button onClick={() => p.go(4)} className="press clay-moon gloss grid size-[52px] place-items-center rounded-[18px]">
          <SlidersHorizontal className="relative z-10 size-5" />
        </button>
      </div>

      <div className="px-4">
        <div className="clay-graphite relative mt-5 h-[168px] overflow-hidden rounded-[26px] p-5">
          <svg className="absolute inset-0 size-full" viewBox="0 0 360 168" preserveAspectRatio="none" fill="none">
            <path d="M-15 35 C20 -15 95 -10 145 25 C110 45 55 30 -10 85 Z" fill="#6e5646" opacity=".8" />
            <path d="M-10 90 C35 40 90 60 140 100 C100 120 40 100 -10 160 Z" fill="#e8dfd3" opacity=".16" />
            <path d="M0 48 C42 8 98 8 142 36" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".5" />
          </svg>
          <div className="relative z-10 mr-auto w-[62%]">
            <p className="text-[11px] font-bold text-gold">شريكك في كل مرحلة</p>
            <h2 className="mt-1 text-[21px] leading-[1.32] text-white">كل أساس عظيم يبدأ من هنا.</h2>
            <button onClick={() => p.go(13)} className="press clay-oak gloss mt-3 h-9 rounded-full px-4 font-display text-[12px]">
              <span className="relative z-10">تسوّق مواد البناء</span>
            </button>
          </div>
        </div>

        <Section title="الوصول السريع" action="الكل">
          <div className="grid grid-cols-4 gap-2.5">
            {quick.map((q) => (
              <button key={q.t} onClick={() => p.go(q.s)} className={`press gloss ${q.tone} flex h-[86px] flex-col items-center justify-center gap-1.5 rounded-[22px] px-1`}>
                <q.i className="relative z-10 size-6" strokeWidth={1.9} />
                <span className="relative z-10 text-[11px] font-extrabold leading-tight">{q.t}</span>
              </button>
            ))}
          </div>
        </Section>

        <Section title="اتفاقي الجاري" action="عرض الكل">
          <button onClick={() => p.go(8)} className="block w-full text-right">
            <Card>
              <div className="flex items-center gap-3">
                <Thumb icon={HardHat} className="size-14 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[15px]">لياسة واجهات - فيلا الحصبة</p>
                  <p className="mt-0.5 text-[11.5px] font-medium text-mute">WA-2025-0148 · المعلم صادق الحداد</p>
                </div>
                <Badge tone="dark">قيد التنفيذ</Badge>
              </div>
              <div className="mt-4"><Stepper steps={['مسودة', 'معتمد', 'تنفيذ', 'مكتمل', 'تصفية']} current={2} /></div>
            </Card>
          </button>
        </Section>

        <Section title="تنبيهات اليوم">
          {[
            { t: 'عرض سعر أسمنت ينتهي خلال ساعتين', s: 15, i: Timer },
            { t: 'دفعة بلوك قيد النقل - الدفعة 2 من 4', s: 16, i: Truck },
          ].map((n) => (
            <button key={n.t} onClick={() => p.go(n.s)} className="clay-card mb-2.5 flex w-full items-center gap-3 rounded-[20px] p-3 text-right">
              <span className="clay-oak grid size-10 place-items-center rounded-[14px]"><n.i className="relative z-10 size-5" /></span>
              <span className="flex-1 text-[12.5px] font-bold">{n.t}</span>
              <ArrowLeft className="size-4 text-mute" />
            </button>
          ))}
        </Section>
      </div>
    </div>
  )
}
