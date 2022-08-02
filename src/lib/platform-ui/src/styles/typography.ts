import { css } from 'lit-element'

export const typography = css`
  :host {
    --sp-font-family: 'sofiapro', 'system-ui', 'BlinkMacSystemFont', '-apple-system', 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif';

    --sp-font-weight-bold: 700;
    --sp-font-weight-semibold: 600;
    --sp-font-weight-medium: 500;
    --sp-font-weight-normal: 400;

    --sp-font-size: 0.875rem;
    --sp-line-height: 1.25rem;
    --sp-font-size-heading: 1rem;
    --sp-line-height-heading: 1.25rem;

    --sp-font-size-heading-3xl: 1.875rem;
    --sp-line-height-heading-3xl: 2rem;
    --sp-font-size-heading-2xl: 1.5rem;
    --sp-line-height-heading-2xl: 2rem;
    --sp-font-size-heading-xl: 1.25rem;
    --sp-line-height-heading-xl: 1.5rem;
    --sp-font-size-heading-lg: 1.125rem;
    --sp-line-height-heading-lg: 1.5rem;
    --sp-font-size-heading-sm: 0.875rem;
    --sp-line-height-heading-sm: 1.25rem;

    --sp-font-size-lg: 1rem;
    --sp-line-height-lg: 1.25rem;
    --sp-font-size-sm: 0.8125rem;
    --sp-line-height-sm: 1rem;
    --sp-font-size-xs: 0.75rem;
    --sp-line-height-xs: 0.9375rem;
    --sp-font-size-2xs: 0.5625rem;
    --sp-line-height-2xs: 0.75rem;

    --sp-color-text: var(--sp-color-neutral-850);
    --sp-color-text-light: var(--sp-color-neutral-700);
    --sp-color-text-placeholder: var(--sp-color-neutral-600);
  }
`
