import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  full = false,
  type = 'button',
  ...rest
}) {
  const className = [
    styles.btn,
    styles[variant],
    styles[size],
    full ? styles.full : '',
  ].join(' ')

  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  )
}
