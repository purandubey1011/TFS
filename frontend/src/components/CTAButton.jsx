import { Link } from 'react-router-dom'

export default function CTAButton({ children, to, variant = 'dark', className = '', onClick, type = 'button' }) {
  const classes = `button-magnetic inline-flex items-center justify-center border px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] ${
    variant === 'dark'
      ? 'border-charcoal bg-charcoal text-porcelain hover:bg-walnut'
      : 'border-charcoal/30 bg-transparent text-charcoal hover:border-charcoal'
  } ${className}`

  if (to) {
    return <Link to={to} className={classes}>{children}</Link>
  }

  return <button type={type} onClick={onClick} className={classes}>{children}</button>
}
