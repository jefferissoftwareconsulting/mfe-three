import { LitElement, css, html, customElement } from 'lit-element'
import { JSXProps } from '../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-loading-spinner': JSXProps<LoadingSpinner, { size?: number }>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-loading-spinner': LoadingSpinner
  }
}

@customElement('sp-loading-spinner')
export class LoadingSpinner extends LitElement {
  static styles = css`
    .loading-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .loading-spinner--circular {
      animation: rotate 1s linear infinite;
      transform-origin: center center;
    }
    .loading-spinner--path {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      animation: dash 1.5s ease-in-out infinite;
      stroke-linecap: round;
    }
    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
      }
    }
  `

  static properties = {
    size: { type: Number }
  }
  size = 24

  render() {
    return html`
      <div class="loading-spinner">
        <svg class="loading-spinner--circular" viewBox="25 25 50 50" width=${this.size} height=${this.size}>
          <circle
            class="loading-spinner--path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="currentColor"
            stroke-width="5"
            stroke-miterlimit="10"
          />
        </svg>
      </div>
    `
  }
}
