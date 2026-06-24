import React, { forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className={`${styles.wrapper} ${error ? styles.error : ''} ${className || ''}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputWrapper}>
          <input
            id={inputId}
            ref={ref}
            className={styles.input}
            {...props}
          />
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
        {hint && !error && <span className={styles.hintText}>{hint}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
