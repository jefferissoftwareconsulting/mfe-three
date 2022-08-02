import './alert'
import '../styles/global-styles'
import { html, expect, fixture, oneEvent } from '@open-wc/testing'

describe('alert', () => {
  it('should be registered', () => {
    expect(customElements.get('sp-alert')).to.not.be.undefined
  })

  it('renders', async () => {
    const el = await fixture(html`<sp-alert>Hello world!</sp-alert>`)

    expect(el).lightDom.to.contain.text('Hello world!')
  })

  it('renders a title', async () => {
    const el = await fixture(`<sp-alert title="i am a title">Hello world!</sp-alert>`)

    expect(el.shadowRoot?.querySelector('sp-heading')).to.contain.text('i am a title')
  })

  it('when "clearable" it can be cleared', async () => {
    const el = await fixture(`<sp-alert clearable>Hello world!</sp-alert>`)

    const closeBtn = el.shadowRoot?.querySelector<HTMLElement>('.clear-button')
    setTimeout(() => closeBtn?.click())
    await oneEvent(el, 'sp-alert-cleared')

    expect(el.shadowRoot?.querySelector('.alert-container')).to.not.exist
  })

  it('when not "clearable" there is no clear button', async () => {
    const el = await fixture(`<sp-alert>Hello world!</sp-alert>`)

    expect(el.shadowRoot?.querySelector<HTMLElement>('.clear-button')).to.not.exist
  })

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<sp-alert>My alert</sp-alert>`)

    await expect(el).shadowDom.to.be.accessible()
  })
})
