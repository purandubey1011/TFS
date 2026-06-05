import { projects } from '../data/catalog'

export default function ProjectGallery() {
  return (
    <div className="masonry">
      {projects.map((project, index) => (
        <article key={project.title} className="masonry-item group relative overflow-hidden">
          <img src={project.image} alt={project.title} className={`w-full object-cover transition duration-700 group-hover:scale-105 ${index % 2 ? 'aspect-[4/5]' : 'aspect-[5/4]'}`} />
          <div className="absolute inset-0 flex items-end bg-charcoal/0 p-5 text-porcelain transition duration-300 group-hover:bg-charcoal/35">
            <div className="translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-xs uppercase tracking-[0.18em]">{project.type}</p>
              <h3 className="serif text-3xl">{project.title}</h3>
              <p className="mt-2 text-sm">View Project</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
