import React from 'react'
import classNames from 'classnames'
import styles from './button.module.css'

type ButtonStyle = 'default' | 'primary' | 'success' | 'danger'

interface ButtonProps {
  style?: ButtonStyle
  label?: string
  children?: React.ReactNode
  className?: string
  fluid?: boolean
  disabled?: boolean
  onClick(event: React.MouseEvent<HTMLElement>): void
}

export default function Button({ style = 'default', children, label, onClick, disabled = false, fluid = false, className = '' }: ButtonProps) {
  return (
    <button className={classNames(styles[style], { [styles.fluid]: fluid }, className)} onClick={onClick} disabled={disabled}>
      {label}
      {children}
    </button>
  )
}
