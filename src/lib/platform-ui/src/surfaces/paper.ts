import { LitElement, css, html, customElement } from 'lit-element'
import { makeScopedTagName } from '../utils/lit-utils'
import type { JSXProps } from '../types'

export const PAPER = makeScopedTagName('paper')

export interface IPaperAttributes {
  'has-border'?: boolean
  level?: 1 | 2
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [PAPER]: JSXProps<Paper, IPaperAttributes>
    }
  }

  interface HTMLElementTagNameMap {
    [PAPER]: Paper
  }
}

@customElement(PAPER)
export class Paper extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    :host .container {
      height: 100%;
      overflow: hidden;
      background: var(--sp-color-neutral-0);
      border-radius: var(--sp-border-radius-medium);
    }

    :host([level='1']) .container {
      box-shadow: var(--sp-box-shadow-modal);
    }

    :host([level='2']) .container {
      box-shadow: var(--sp-box-shadow-menu);
    }

    :host([has-border]) .container {
      border: 1px solid var(--sp-color-neutral-300);
    }
  `

  static properties = {
    hasBorder: { type: Boolean, attribute: 'has-border', reflect: true },
    level: { type: Number, reflect: true }
  }

  hasBorder = false
  level = 1

  render() {
    return html` <div class="container"><slot></slot></div> `
  }
}
