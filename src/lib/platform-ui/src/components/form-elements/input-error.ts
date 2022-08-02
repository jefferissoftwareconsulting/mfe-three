import { LitElement, html, customElement, css } from 'lit-element'
import type { JSXProps } from '../../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-input-error': JSXProps<InputError>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-input-error': InputError
  }
}

@customElement('sp-input-error')
export class InputError extends LitElement {
  static styles = css`
    :host {
      font-size: var(--sp-font-size-sm);
      color: var(--sp-color-error);
    }
  `

  render() {
    return html` <slot></slot> `
  }
}
