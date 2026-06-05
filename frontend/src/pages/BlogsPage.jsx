import { useParams } from 'react-router-dom'
import CTAButton from '../components/CTAButton'
import { blogPosts } from '../data/catalog'

export default function BlogsPage() {
  const { slug } = useParams()
  const selectedPost = blogPosts.find((post) => post.slug === slug)

  if (selectedPost) {
    return (
      <article className="container-pad py-12">
        <CTAButton to="/blogs" variant="light" className="mb-8 px-4 py-2">All Blogs</CTAButton>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-walnut">{selectedPost.category} | {selectedPost.readTime}</p>
        <h1 className="serif mt-3 max-w-4xl text-6xl font-semibold leading-none">{selectedPost.title}</h1>
        <img src={selectedPost.image} alt={selectedPost.title} className="mt-10 aspect-[16/8] w-full object-cover" />
        <div className="mx-auto mt-10 max-w-3xl text-lg leading-8 text-charcoal/70">
          <p>{selectedPost.excerpt}</p>
          <p className="mt-6">
            A finished room depends on proportion, light, texture and practical details. Use this story as a starting point for planning your material palette, then refine the final choice with measurement and fabric samples.
          </p>
        </div>
      </article>
    )
  }

  return (
    <div className="container-pad py-12">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-walnut">Design Journal</p>
      <h1 className="serif mt-3 text-6xl font-semibold leading-none">Blogs</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.slug} className="group flex h-full flex-col border hairline bg-[#fbf8f2]">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex min-h-[230px] flex-1 flex-col p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-charcoal/55">{post.category} | {post.readTime}</p>
              <h2 className="serif mt-5 min-h-[70px] text-3xl font-semibold leading-none">{post.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-charcoal/64">{post.excerpt}</p>
              <CTAButton to={`/blogs/${post.slug}`} variant="light" className="mt-auto w-fit px-4 py-2">Read Story</CTAButton>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
