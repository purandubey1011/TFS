export const products = [
  {
    id: 'gid://shopify/Product/1001',
    handle: 'aurelia-linen-curtain',
    title: 'Aurelia Linen Curtain',
    productType: 'Curtains',
    vendor: 'TFS',
    status: 'ACTIVE',
    availableForSale: true,
    tags: ['Customisable', 'Premium Fabric', 'Installation Available'],
    priceRange: {
      minVariantPrice: { amount: '6499', currencyCode: 'INR' },
    },
    options: [
      { name: 'Color', values: ['Oat', 'Ivory', 'Taupe'] },
      { name: 'Fabric', values: ['Washed linen', 'Cotton linen'] },
      { name: 'Size', values: ['Custom'] },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1100&q=85', altText: 'Linen curtains in a furnished room' },
    ],
    variants: [
      { id: 'gid://shopify/ProductVariant/2001', title: 'Oat / Linen / Custom', price: { amount: '6499', currencyCode: 'INR' }, availableForSale: true },
    ],
  },
  {
    id: 'gid://shopify/Product/1002',
    handle: 'noir-roman-blind',
    title: 'Noir Roman Blind',
    productType: 'Blinds',
    vendor: 'TFS',
    status: 'ACTIVE',
    availableForSale: true,
    tags: ['Customisable', 'Blackout Option'],
    priceRange: {
      minVariantPrice: { amount: '5299', currencyCode: 'INR' },
    },
    options: [
      { name: 'Color', values: ['Charcoal', 'Walnut', 'Oat'] },
      { name: 'Fabric', values: ['Cotton blend', 'Linen blend'] },
      { name: 'Size', values: ['Custom'] },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1100&q=85', altText: 'Roman blind in a premium interior' },
    ],
    variants: [
      { id: 'gid://shopify/ProductVariant/2002', title: 'Charcoal / Cotton Blend / Custom', price: { amount: '5299', currencyCode: 'INR' }, availableForSale: true },
    ],
  },
  {
    id: 'gid://shopify/Product/1003',
    handle: 'calma-texture-wallpaper',
    title: 'Calma Texture Wallpaper',
    productType: 'Wallpapers',
    vendor: 'TFS',
    status: 'ACTIVE',
    availableForSale: true,
    tags: ['Premium Fabric', 'Washable'],
    priceRange: {
      minVariantPrice: { amount: '3199', currencyCode: 'INR' },
    },
    options: [
      { name: 'Color', values: ['Taupe', 'Olive', 'Soft Gold'] },
      { name: 'Finish', values: ['Textured vinyl'] },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&q=85', altText: 'Textured wallpaper in a styled room' },
    ],
    variants: [
      { id: 'gid://shopify/ProductVariant/2003', title: 'Taupe / Textured / Roll', price: { amount: '3199', currencyCode: 'INR' }, availableForSale: true },
    ],
  },
]
