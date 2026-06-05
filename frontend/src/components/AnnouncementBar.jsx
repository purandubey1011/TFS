export default function AnnouncementBar() {
  return (
    <div className="border-b hairline bg-charcoal px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-porcelain md:flex md:items-center md:justify-center md:gap-8">
      <span>Mid Season Sale - Flat 30% Off on Selected Furnishings</span>
      <span className="hidden h-3 w-px bg-porcelain/30 md:block" />
      <span className="hidden md:inline">Free Consultation | Custom Measurement | Premium Installation</span>
    </div>
  )
}
