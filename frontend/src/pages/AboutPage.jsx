import { imageSet } from '../data/catalog'

export default function AboutPage() {
  return (
    <div className="container-pad py-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-walnut">About TFS</p>
          <h1 className="serif mt-3 text-6xl font-semibold leading-none">A furnishing studio for homes with texture, ease and detail.</h1>
          <p className="mt-6 leading-8 text-charcoal/68">We bring together material selection, custom measurement, careful production and installation for refined everyday interiors. The experience is built to feel personal, edited and practical.</p>
        </div>
        <img src={imageSet.consultation} alt="Premium furnished home" className="aspect-[4/5] w-full object-cover" />
      </div>
      <div className="mt-16 grid gap-px overflow-hidden border hairline bg-charcoal/10 md:grid-cols-3">
        {['10k+ windows measured', '750+ styled homes', '300+ fabric options'].map((metric) => (
          <div key={metric} className="bg-porcelain p-8">
            <p className="serif text-4xl">{metric}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
