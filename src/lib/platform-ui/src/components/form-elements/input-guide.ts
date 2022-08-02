import { LitElement, html, customElement, css } from 'lit-element'
import type { JSXProps } from '../../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-input-guide': JSXProps<InputGuide>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-input-guide': InputGuide
  }
}

/**
 * Guides are used for rendering supporting text under an input field
 * i.e. char count for textarea
 */
@customElement('sp-input-guide')
export class InputGuide extends LitElement {
  static styles = css`
    :host {
      font-size: var(--sp-font-size-xs);
    }
  `

  render() {
    return html` <slot></slot> `
  }
}
