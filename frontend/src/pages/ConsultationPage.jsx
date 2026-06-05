import CTAButton from '../components/CTAButton'
import { imageSet } from '../data/catalog'

export default function ConsultationPage() {
  return (
    <div className="container-pad grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="lg:sticky lg:top-28">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-walnut">Book Measurement</p>
        <h1 className="serif mt-3 text-6xl font-semibold leading-none">A quieter way to finish your home.</h1>
        <p className="mt-6 max-w-lg leading-7 text-charcoal/68">Schedule a free consultation for curtains, blinds, wallpapers, sofas and complete room styling.</p>
        <img src={imageSet.atelier} alt="Interior design material selection" className="mt-8 aspect-[4/3] w-full object-cover" />
      </div>
      <form className="border hairline bg-[#fbf8f2] p-6 md:p-10">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Full Name" />
          <Field label="Phone Number" />
          <Field label="Email" type="email" />
          <Field label="City" />
          <Field label="Preferred Date" type="date" />
          <Field label="Project Type" as="select" options={['Curtains', 'Blinds', 'Wallpaper', 'Full Home Styling']} />
        </div>
        <label className="mt-5 grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-charcoal/55">
          Project Notes
          <textarea rows="6" className="border hairline bg-transparent px-4 py-3 text-sm font-normal normal-case tracking-normal text-charcoal outline-none" placeholder="Tell us about the rooms, windows, style and timeline." />
        </label>
        <CTAButton className="mt-6 w-full" type="submit">Request Consultation</CTAButton>
      </form>
    </div>
  )
}

function Field({ label, type = 'text', as, options = [] }) {
  return (
    <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-charcoal/55">
      {label}
      {as === 'select' ? (
        <select className="border hairline bg-transparent px-4 py-3 text-sm font-normal normal-case tracking-normal text-charcoal outline-none">
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      ) : (
        <input type={type} className="border hairline bg-transparent px-4 py-3 text-sm font-normal normal-case tracking-normal text-charcoal outline-none" />
      )}
    </label>
  )
}
