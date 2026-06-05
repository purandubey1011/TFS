import ProjectGallery from '../components/ProjectGallery'

export default function ProjectsPage() {
  return (
    <div className="container-pad py-12">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-walnut">Styled homes</p>
      <h1 className="serif mt-3 max-w-3xl text-6xl font-semibold leading-none">Real rooms finished with custom furnishing details.</h1>
      <p className="mt-6 max-w-2xl leading-7 text-charcoal/68">A catalogue of completed living rooms, bedrooms, dining areas and boutique spaces.</p>
      <div className="mt-12"><ProjectGallery /></div>
    </div>
  )
}
