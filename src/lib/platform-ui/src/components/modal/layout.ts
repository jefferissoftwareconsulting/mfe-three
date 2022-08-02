import { LitElement, css, html, customElement } from 'lit-element'
import { Modal, ModalCloseEvent } from './modal'
import { findParentWithType } from '../../utils/findParentWithType'
import { JSXProps } from '../../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-modal-header': JSXProps<ModalHeader>
      'sp-modal-body': JSXProps<ModalBody, IModalBodyAttributes>
      'sp-modal-footer': JSXProps<ModalFooter>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-modal-header': ModalHeader
    'sp-modal-body': ModalBody
    'sp-modal-footer': ModalFooter
  }
}

@customElement('sp-modal-header')
export class ModalHeader extends LitElement {
  static styles = css`
    :host {
      padding: var(--sp-spacing-4) var(--sp-spacing-6);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      box-shadow: inset 0 -1px 0 0 var(--sp-color-neutral-300);
    }
    sp-icon {
      cursor: pointer;
      color: var(--sp-color-neutral-750);
    }
  `

  private get _noClose() {
    return findParentWithType(this.parentElement, Modal)?.noClose
  }

  private _handleClickClose() {
    this.dispatchEvent(new ModalCloseEvent())
  }

  render() {
    return html`
      <sp-heading size="xl"><slot></slot></sp-heading>
      ${this._noClose
        ? undefined
        : html`<sp-icon id="close-button" icon="close" @click=${this._handleClickClose}></sp-icon>`}
    `
  }
}

interface IModalBodyAttributes {
  scrollable?: boolean
}

// Body component adds border-bottom if the content becomes scrollable
@customElement('sp-modal-body')
export class ModalBody extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: var(--sp-spacing-2) var(--sp-spacing-6) var(--sp-spacing-5) var(--sp-spacing-6);
      flex: 1;
      overflow-y: auto;
    }
    :host([scrollable]) {
      border-bottom: 1px solid var(--sp-color-neutral-300);
    }
  `

  static properties = {
    scrollable: { type: Boolean, reflect: true }
  }
  scrollable = false

  private _resizeObserver = new ResizeObserver(entries => {
    this.scrollable = this.scrollHeight > this.clientHeight
  })

  connectedCallback() {
    super.connectedCallback()
    this._resizeObserver.observe(this)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this._resizeObserver.unobserve(this)
  }

  render() {
    return html`<slot></slot>`
  }
}

@customElement('sp-modal-footer')
export class ModalFooter extends LitElement {
  static styles = css`
    :host {
      padding: var(--sp-spacing-5) var(--sp-spacing-6);
    }
  `

  render() {
    return html`
      <sp-split-row vertical-align="middle">
        <slot slot="left" name="left"></slot>
        <slot slot="right" name="right"></slot>
      </sp-split-row>
    `
  }
}
