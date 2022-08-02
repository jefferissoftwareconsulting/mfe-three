import { LitElement, css, html, customElement } from 'lit-element'
import { JSXProps } from '../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-fade-in-out': JSXProps<FadeInOut, { shown: boolean }>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-fade-in-out': FadeInOut
  }
}

@customElement('sp-fade-in-out')
export class FadeInOut extends LitElement {
  static styles = css`
    :host {
      opacity: 0;
      animation: fade-in 0.3s ease;
      transition: opacity 0.2s ease;
    }
    :host([shown]) {
      opacity: 1;
    }
    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `

  static properties = {
    shown: { type: Boolean },
    removed: { attribute: false }
  }
  shown = false
  removed = !this.shown

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('transitionend', this._handleTransitionEnd)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('transitionend', this._handleTransitionEnd)
  }

  private _handleTransitionEnd(event: Event) {
    if (event.target === this) {
      this.removed = !this.shown
    }
  }

  render() {
    if (this.removed && !this.shown) {
      return html``
    }
    return html`<slot></slot>`
  }
}
