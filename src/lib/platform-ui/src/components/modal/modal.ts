import { LitElement, css, html, customElement } from 'lit-element'
import { classMap } from 'lit-html/directives/class-map'
import type { JSXProps } from '../../types'
import '../../animation/fade-in-out'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-modal': JSXProps<
        Modal,
        {
          size: 'small' | 'medium' | 'large' | 'x-large'
          open: boolean
          'no-close'?: boolean
        }
      >
    }
  }

  interface HTMLElementTagNameMap {
    'sp-modal': Modal
  }
}

export class ModalCloseEvent extends CustomEvent<never> {
  constructor() {
    super('sp-modal-close', { bubbles: true })
  }
}

@customElement('sp-modal')
export class Modal extends LitElement {
  static styles = css`
    :host {
      position: relative;
      z-index: var(--sp-z-index-dialog);
    }

    .overlay {
      z-index: 1;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--sp-color-overlay);
      padding-top: 20vh;
      display: flex;
      flex-direction: column;
      justify-items: flex-start;
      align-items: center;
    }
    .modal {
      max-height: 60vh;
      border-radius: var(--sp-border-radius-medium);
      box-shadow: var(--sp-box-shadow-modal);
      background-color: var(--sp-color-white);
      display: flex;
      flex-direction: column;
      animation: slide-up 0.3s ease;
    }
    @keyframes slide-up {
      0% {
        opacity: 0;
        transform: translateY(10%);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .medium .modal {
      min-width: 30rem;
    }
    .large .modal {
      min-width: 40rem;
    }
    .x-large .modal {
      min-width: 50rem;
    }
    .large,
    .x-large {
      padding-top: 10vh;
    }
    .large .modal,
    .x-large .modal {
      max-height: 80vh;
    }
    ::slotted(sp-modal-body:first-child) {
      padding-top: var(--sp-spacing-10);
    }
  `

  static properties = {
    size: { type: String },
    open: { type: Boolean },
    shown: { attribute: false },
    noClose: { type: Boolean, attribute: 'no-close' }
  }
  size: 'small' | 'medium' | 'large' | 'x-large' = 'small'
  open = false
  noClose = false
  shown = this.open // TODO: Is this needed? this.shown is never read

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('keyup', this.handleKeyUp, true)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('keyup', this.handleKeyUp, true)
  }

  /**
   * Closes the modal with Escape key
   */
  private handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') return this.handleClose(event)
  }

  // NOTE: Ideally this would be @query('#overlay', true) overlay: HTMLDivElement | null but
  // that doesn't work - probably because of the way we're compiling the Typescript
  private get overlay() {
    return this.renderRoot.querySelector('#overlay')
  }

  /**
   * Listens to mouse or keyboard events and emits a modal close event.
   *
   * Mouse events come from clicking the overlay, which can be disabled with the
   * `noClose` prop.
   *
   * Keyboard events are passed through via a global listener for Escape key
   * only - `noClose` has no effect here as this would break an accessibility
   * expectation for modal content.
   */
  private handleClose = (event: MouseEvent | KeyboardEvent) => {
    if ((event instanceof MouseEvent && this.noClose) || (event instanceof MouseEvent && event.target !== this.overlay))
      return

    event.stopPropagation()
    this.dispatchEvent(new ModalCloseEvent())
  }

  private handleTransitionEnd(event: Event) {
    if (event.target === this.overlay) {
      this.shown = false
    }
  }

  render() {
    return html`
      <sp-fade-in-out ?shown=${this.open}>
        <div
          id="overlay"
          class="${classMap({
            overlay: true,
            medium: this.size === 'medium',
            large: this.size === 'large',
            'x-large': this.size === 'x-large'
          })}"
          @mousedown=${this.handleClose}
          @keyup=${() => undefined}
          @transitionend=${this.handleTransitionEnd}
        >
          <div class="modal">
            <slot></slot>
          </div>
        </div>
      </sp-fade-in-out>
    `
  }
}
