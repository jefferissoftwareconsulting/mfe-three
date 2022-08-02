import { LitElement, html, customElement, css } from 'lit-element'
import { JSXProps } from '../types'

type HeadingSize = '3xl' | '2xl' | 'xl' | 'lg' | 'base' | 'sm'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-heading': JSXProps<Heading, { size: HeadingSize; level?: 1 | 2 | 3 | 4 | 5 | 6 | 'text' }>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-heading': Heading
  }
}

@customElement('sp-heading')
export class Heading extends LitElement {
  static styles = css`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    span {
      margin: 0;
      font-weight: var(--sp-font-weight-semibold);
    }

    .size-3xl {
      font-size: var(--sp-font-size-heading-3xl);
      line-height: var(--sp-line-height-heading-3xl);
    }

    .size-2xl {
      font-size: var(--sp-font-size-heading-2xl);
      line-height: var(--sp-line-height-heading-2xl);
    }

    .size-xl {
      font-size: var(--sp-font-size-heading-xl);
      line-height: var(--sp-line-height-heading-xl);
    }

    .size-lg {
      font-size: var(--sp-font-size-heading-lg);
      line-height: var(--sp-line-height-heading-lg);
    }

    .size-base {
      font-size: var(--sp-font-size-heading);
      line-height: var(--sp-line-height-heading);
    }

    .size-sm {
      font-size: var(--sp-font-size-heading-sm);
      line-height: var(--sp-line-height-heading-sm);
    }

    :host {
      display: block;
    }
  `

  static properties = {
    size: { type: String },
    level: { type: Number }
  }
  size: HeadingSize = 'base'
  level?: 1 | 2 | 3 | 4 | 5 | 6

  private getLevel() {
    if (this.level) {
      return this.level
    }
    switch (this.size) {
      case '3xl':
        return 1
      case '2xl':
      case 'xl':
      case 'lg':
        return 2
      case 'sm':
        return 4
      default:
        return 3
    }
  }

  render() {
    const className = `size-${this.size ?? 'base'}`

    switch (this.getLevel()) {
      case 1:
        return html`<h1 class=${className}><slot></slot></h1>`
      case 2:
        return html`<h2 class=${className}><slot></slot></h2>`
      case 3:
        return html`<h3 class=${className}><slot></slot></h3>`
      case 4:
        return html`<h4 class=${className}><slot></slot></h4>`
      case 5:
        return html`<h5 class=${className}><slot></slot></h5>`
      case 6:
        return html`<h6 class=${className}><slot></slot></h6>`
    }
  }
}
