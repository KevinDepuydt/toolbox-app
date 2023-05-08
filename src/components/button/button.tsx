import React from 'react'
import classNames from 'classnames'
import styles from './button.module.css'


interface ButtonProps {
  label?: string
  children?: React.ReactNode
  className?: string
  onClick(event: React.MouseEvent<HTMLElement>): void
}

export default function Button({ children, label, onClick, className = '' }: ButtonProps) {
  return (
    <button className={classNames(styles.green, className)} onClick={onClick}>
      {label}
      {children}
    </button>
  )
}
