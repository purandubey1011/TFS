const filters = {
  Category: ['Curtains', 'Blinds', 'Wallpapers', 'Sofas', 'Rugs', 'Bedding', 'Cushions', 'Throws'],
  Fabric: ['Linen', 'Cotton Blend', 'Boucle', 'Wool', 'Sateen', 'Vinyl'],
  Color: ['Oat', 'Charcoal', 'Taupe', 'Ivory', 'Olive', 'Soft Gold'],
  Room: ['Living Room', 'Bedroom', 'Dining', 'Office'],
  Style: ['Minimal', 'Contemporary', 'Modern', 'Textured', 'Organic', 'Classic'],
  Availability: ['In stock'],
}

export default function FilterSidebar({ activeCategory, activeFilters, onCategoryChange, onToggleFilter, onClear }) {
  const isChecked = (label, option) => {
    if (label === 'Category') return activeCategory === option
    if (label === 'Availability') return activeFilters.availability.includes(option)
    return activeFilters[label.toLowerCase()].includes(option)
  }

  const handleChange = (label, option) => {
    if (label === 'Category') {
      onCategoryChange(activeCategory === option ? '' : option)
      return
    }
    const key = label === 'Availability' ? 'availability' : label.toLowerCase()
    onToggleFilter(key, option)
  }

  return (
    <aside className="border hairline bg-[#fbf8f2] p-5 lg:sticky lg:top-28 lg:h-fit">
      <div className="mb-5 flex items-center justify-between border-b hairline pb-4">
        <h2 className="serif text-3xl">Filters</h2>
        <button type="button" className="text-xs font-semibold uppercase tracking-[0.16em] text-walnut" onClick={onClear}>Clear</button>
      </div>
      <div className="grid gap-6">
        {Object.entries(filters).map(([label, options]) => (
          <div key={label} className="border-b hairline pb-5 last:border-b-0 last:pb-0">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-charcoal/56">{label}</h3>
            <div className="grid gap-2">
              {options.map((option) => (
                <label key={option} className="flex items-center gap-3 text-sm text-charcoal/78 transition-colors hover:text-charcoal">
                  <input
                    type="checkbox"
                    checked={isChecked(label, option)}
                    onChange={() => handleChange(label, option)}
                    className="accent-charcoal"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
