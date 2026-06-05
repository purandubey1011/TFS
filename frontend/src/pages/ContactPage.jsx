import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import CTAButton from '../components/CTAButton'

export default function ContactPage() {
  return (
    <div className="container-pad grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
      <section>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-walnut">Contact</p>
        <h1 className="serif mt-3 text-6xl font-semibold leading-none">Speak with our furnishing studio.</h1>
        <p className="mt-6 max-w-lg leading-7 text-charcoal/68">
          For custom curtains, furniture, styling projects and measurement visits, share your details and our team will get back to you.
        </p>
        <div className="mt-10 grid gap-px overflow-hidden border hairline bg-charcoal/10">
          <ContactLine icon={Phone} label="Phone" value="+91 98765 43210" />
          <ContactLine icon={MessageCircle} label="WhatsApp" value="Start a design conversation" />
          <ContactLine icon={Mail} label="Email" value="studio@tfs-home.com" />
          <ContactLine icon={MapPin} label="Studio" value="21 Design Avenue, Mumbai" />
        </div>
      </section>

      <form className="border hairline bg-[#fbf8f2] p-6 md:p-10">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Full Name" />
          <Field label="Phone Number" />
          <Field label="Email" type="email" />
          <Field label="Interested In" />
        </div>
        <label className="mt-5 grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-charcoal/55">
          Message
          <textarea rows="6" className="border hairline bg-transparent px-4 py-3 text-sm font-normal normal-case tracking-normal text-charcoal outline-none" />
        </label>
        <CTAButton className="mt-6 w-full" type="submit">Send Message</CTAButton>
      </form>
    </div>
  )
}

function ContactLine({ icon: Icon, label, value }) {
  return (
    <div className="grid grid-cols-[44px_1fr] gap-4 bg-porcelain p-5">
      <Icon strokeWidth={1.4} className="text-walnut" />
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-charcoal/50">{label}</p>
        <p className="mt-1 text-sm text-charcoal/75">{value}</p>
      </div>
    </div>
  )
}

function Field({ label, type = 'text' }) {
  return (
    <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-charcoal/55">
      {label}
      <input type={type} className="border hairline bg-transparent px-4 py-3 text-sm font-normal normal-case tracking-normal text-charcoal outline-none" />
    </label>
  )
}
