import { Building2, Mail, PackageCheck, Phone } from 'lucide-react'
import CTAButton from '../components/CTAButton'

const orderTypes = ['Furniture', 'Home Decor', 'Curtains & Blinds', 'Soft Furnishing', 'Full Project']
const quantityRanges = ['10-25 units', '26-50 units', '51-100 units', '100+ units']

export default function BulkQueriesPage() {
  return (
    <div className="container-pad py-12">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <section className="lg:sticky lg:top-28">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-walnut">Bulk Queries</p>
          <h1 className="serif mt-3 text-6xl font-semibold leading-none">Furnishing support for larger orders.</h1>
          <p className="mt-6 max-w-xl leading-7 text-charcoal/68">
            Share your project requirements for apartments, hotels, offices, restaurants, showrooms or procurement orders. Our team will review quantities, timelines and customization needs before sharing a quote.
          </p>

          <div className="mt-10 grid gap-px overflow-hidden border hairline bg-charcoal/10">
            <InfoLine icon={Building2} label="Ideal For" value="Interior projects, hospitality, offices and bulk procurement" />
            <InfoLine icon={PackageCheck} label="Support" value="Product selection, custom sizing and phased delivery" />
            <InfoLine icon={Phone} label="Response" value="Callback after requirement review" />
            <InfoLine icon={Mail} label="Documents" value="Attach BOQ or product list when available" />
          </div>
        </section>

        <form className="border hairline bg-[#fbf8f2] p-6 md:p-10">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full Name" />
            <Field label="Phone Number" />
            <Field label="Email" type="email" />
            <Field label="Company / Firm Name" />
            <Field label="City" />
            <Field label="Project Location" />
            <Field label="Order Type" as="select" options={orderTypes} />
            <Field label="Estimated Quantity" as="select" options={quantityRanges} />
            <Field label="Budget Range" />
            <Field label="Expected Timeline" />
          </div>

          <label className="mt-5 grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-charcoal/55">
            Products Required
            <textarea rows="4" className="border hairline bg-transparent px-4 py-3 text-sm font-normal normal-case tracking-normal text-charcoal outline-none" placeholder="Mention products, categories, sizes, fabrics, finishes or reference links." />
          </label>

          <label className="mt-5 grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-charcoal/55">
            Project Notes
            <textarea rows="5" className="border hairline bg-transparent px-4 py-3 text-sm font-normal normal-case tracking-normal text-charcoal outline-none" placeholder="Tell us about the property type, delivery phases, customization needs, installation requirements or BOQ details." />
          </label>

          <label className="mt-5 grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-charcoal/55">
            Upload BOQ / Reference File
            <input type="file" className="border hairline bg-transparent px-4 py-3 text-sm font-normal normal-case tracking-normal text-charcoal file:mr-4 file:border-0 file:bg-charcoal file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.14em] file:text-porcelain" />
          </label>

          <CTAButton className="mt-6 w-full" type="submit">Submit Bulk Query</CTAButton>
        </form>
      </div>
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

function InfoLine({ icon: Icon, label, value }) {
  return (
    <div className="grid grid-cols-[44px_1fr] gap-4 bg-porcelain p-5">
      <Icon strokeWidth={1.4} className="text-walnut" />
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-charcoal/50">{label}</p>
        <p className="mt-1 text-sm leading-6 text-charcoal/75">{value}</p>
      </div>
    </div>
  )
}
