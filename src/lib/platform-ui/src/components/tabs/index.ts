import { LitElement, html, customElement, css, PropertyValues } from 'lit-element'
import { JSXProps } from '../../types'
import '../../layout/flex'
import { TabPanel } from './panel'
import { Tab } from './tab'
import { TabBar, TabSelectedEvent } from './tab-bar'

export { TabPanel, Tab, TabBar, TabSelectedEvent }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-tabs': JSXProps<Tabs, { selected?: string }>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-tabs': Tabs
  }
}

@customElement('sp-tabs')
export class Tabs extends LitElement {
  static styles = css`
    :host {
      background-color: var(--sp-color-white);
    }
  `

  static properties = {
    selected: { type: String, reflect: true }
  }
  selected = ''

  panels: TabPanel[] = []

  handleSlotChange() {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | undefined
    this.panels = []
    if (!slot) {
      return
    }
    for (const el of slot.assignedElements()) {
      if (el instanceof TabPanel) {
        this.panels.push(el)
      } else {
        this.panels.push(...Array.from(el.querySelectorAll('sp-tab-panel')))
      }
    }

    if (!this.selected) {
      this.selected = this.panels.find(panel => panel.shown)?.name ?? ''
    }
    if (!this.selected && this.panels.length) {
      this.selected = this.panels[0].name
    }

    this.updatePanelVisibility()
  }

  updatePanelVisibility() {
    this.panels.forEach(panel => {
      const shown = panel.name === this.selected
      if (shown !== panel.shown) {
        panel.shown = shown
      }
    })
  }

  handleTabSelected(event: TabSelectedEvent) {
    this.selected = event.detail.name
    this.updatePanelVisibility()
    event.stopPropagation()
    this.dispatchEvent(new TabSelectedEvent(this.selected))
  }

  render() {
    return html`
      <sp-tab-bar controlled selected=${this.selected} @sp-tab-selected=${this.handleTabSelected}>
        <slot name="tabs"></slot>
      </sp-tab-bar>
      <slot @slotchange=${this.handleSlotChange}></slot>
    `
  }
}
