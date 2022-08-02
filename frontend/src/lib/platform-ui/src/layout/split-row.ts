import { LitElement, html, css, customElement } from 'lit-element'
import { JSXProps } from '../types'
import './flex'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-split-row': JSXProps<
        SplitRow,
        {
          'vertical-align'?: 'top' | 'middle' | 'bottom'
          'left-expand'?: boolean
          'right-expand'?: boolean
          'expand-y'?: boolean
          'no-gap'?: boolean
        }
      >
      'sp-action-bar': JSXProps<
        ActionBar,
        {
          'left-expand'?: boolean
          'right-expand'?: boolean
          'no-border'?: boolean
        }
      >
    }
  }

  interface HTMLElementTagNameMap {
    'sp-split-row': SplitRow
    'sp-action-bar': ActionBar
  }
}

@customElement('sp-split-row')
export class SplitRow extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    sp-row {
      justify-content: space-between;
    }

    :host([expand-y]) {
      height: 100%;
    }

    :host([expand-y]) sp-row {
      height: 100%;
      align-items: stretch;
    }

    :host([no-gap]) .left {
      margin-right: 0;
    }

    :host([left-expand]) .left {
      flex: 1;
    }

    :host([right-expand]) .right {
      flex: 1;
    }
  `

  static properties = {
    verticalAlign: { type: String, attribute: 'vertical-align', reflect: true },
    leftExpand: { type: Boolean, attribute: 'left-expand', reflect: true },
    rightExpand: { type: Boolean, attribute: 'right-expand', reflect: true },
    noGap: { type: Boolean, attribute: 'no-gap', reflect: true },
    expandY: { type: Boolean, attribute: 'expand-y' }
  }
  verticalAlign: 'top' | 'middle' | 'bottom' = 'top'
  leftExpand = false
  rightExpand = false
  noGap = false
  expandY = false

  render() {
    return html`
      <sp-row vertical-align=${this.verticalAlign}>
        <div class="left">
          <slot name="left"></slot>
        </div>
        <div class="right">
          <slot name="right"></slot>
        </div>
      </sp-row>
    `
  }
}

@customElement('sp-action-bar')
export class ActionBar extends LitElement {
  static styles = css`
    sp-split-row {
      padding: var(--sp-spacing-2) var(--sp-spacing-5);
      box-shadow: inset 0 -1px 0 var(--sp-color-neutral-300);
    }

    :host([no-border]) sp-split-row {
      box-shadow: none;
    }
  `

  static properties = {
    noBorder: { type: Boolean, attribute: 'no-border', reflect: true },
    leftExpand: { type: Boolean, attribute: 'left-expand', reflect: true },
    rightExpand: { type: Boolean, attribute: 'right-expand', reflect: true }
  }
  noBorder = false
  leftExpand = false
  rightExpand = false

  render() {
    return html`
      <sp-split-row vertical-align="middle" ?left-expand=${this.leftExpand} ?right-expand=${this.rightExpand}>
        <slot slot="left" name="left"></slot>
        <slot slot="right" name="right"></slot>
      </sp-split-row>
    `
  }
}
