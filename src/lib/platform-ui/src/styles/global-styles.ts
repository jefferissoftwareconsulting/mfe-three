import { LitElement, css, html, customElement } from 'lit-element'
import { borders } from './borders'
import { colors } from './colors'
import { shadows } from './shadows'
import { spacing } from './spacing'
import { typography } from './typography'
import { zIndex } from './z-index'
import type { JSXProps } from '../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-global-styles': JSXProps<GlobalStyles>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-global-styles': GlobalStyles
  }
}

@customElement('sp-global-styles')
export class GlobalStyles extends LitElement {
  static styles = [
    colors,
    spacing,
    typography,
    borders,
    shadows,
    zIndex,
    css`
      :host {
        /* --- Global styles --- */
        font-family: var(--sp-font-family);
        font-size: var(--sp-font-size);
        line-height: var(--sp-line-height);
        font-weight: var(--sp-font-weight-normal);
        color: var(--sp-color-text);
      }
    `
  ]

  render() {
    return html`<slot></slot>`
  }
}
