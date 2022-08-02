import './input-checkbox'
import { html, expect, fixture, oneEvent, aTimeout } from '@open-wc/testing'

const spaceBarKeyPress = new KeyboardEvent('keypress', {
  key: ' ',
  keyCode: 32,
  code: 'Space',
  which: 32,
  shiftKey: false,
  ctrlKey: false,
  metaKey: false
})

describe('input-checkbox', () => {
  it('should be registered', () => {
    expect(customElements.get('sp-input-checkbox')).to.not.be.undefined
  })

  it('renders', async () => {
    const el = await fixture(html`<sp-input-checkbox>I accept</sp-input-checkbox>`)

    expect(el.shadowRoot).not.to.be.null
  })

  it('can flow through default states: un-checked and checked', async () => {
    const el = await fixture(
      html`<sp-input-checkbox name="acceptLicense" value="license-accept">I accept</sp-input-checkbox>`
    )

    const input = el.shadowRoot?.querySelector<HTMLInputElement>('input')
    const checkbox = el.shadowRoot?.querySelector<HTMLElement>('.checkbox')

    expect(input?.checked).to.be.false

    setTimeout(() => checkbox?.dispatchEvent(spaceBarKeyPress))
    await oneEvent(el, 'sp-input-change')

    expect(input?.checked).to.be.true

    setTimeout(() => checkbox?.dispatchEvent(spaceBarKeyPress))
    await oneEvent(el, 'sp-input-change')

    expect(input?.checked).to.be.false
  })

  it('can be in an indeterminate state', async () => {
    const el = await fixture(
      html`<sp-input-checkbox name="acceptLicense" value="license-accept" indeterminate>I accept</sp-input-checkbox>`
    )

    const input = el.shadowRoot?.querySelector<HTMLInputElement>('input')
    expect(input?.checked).to.be.false
    expect(input?.indeterminate).to.be.true
  })

  it('can flow through the correct states when starting from indeterminate state', async () => {
    const el = await fixture(
      html`<sp-input-checkbox name="acceptLicense" indeterminate value="license-accept">I accept</sp-input-checkbox>`
    )

    const checkbox = el.shadowRoot?.querySelector<HTMLElement>('.checkbox')
    expect(checkbox).to.not.be.undefined

    const input = el.shadowRoot?.querySelector<HTMLInputElement>('input')
    expect(input?.indeterminate).to.be.true
    expect(input?.checked).to.be.false

    setTimeout(() => checkbox?.dispatchEvent(spaceBarKeyPress))
    await oneEvent(el, 'sp-input-change')

    expect(input?.indeterminate).to.be.false
    expect(input?.checked).to.be.true

    setTimeout(() => checkbox?.dispatchEvent(spaceBarKeyPress))
    await oneEvent(el, 'sp-input-change')

    expect(input?.indeterminate).to.be.false
    expect(input?.checked).to.be.false

    setTimeout(() => checkbox?.dispatchEvent(spaceBarKeyPress))
    await oneEvent(el, 'sp-input-change')

    expect(input?.indeterminate).to.be.false
    expect(input?.checked).to.be.true
  })

  it('can be un-checked from checked state', async () => {
    const el = await fixture(
      html`<sp-input-checkbox name="acceptLicense" value="license-accept" checked>I accept</sp-input-checkbox>`
    )

    const checkbox = el.shadowRoot?.querySelector<HTMLElement>('.checkbox')
    expect(checkbox).to.not.be.undefined

    setTimeout(() => checkbox?.dispatchEvent(spaceBarKeyPress))
    await oneEvent(el, 'sp-input-change')

    const input = el.shadowRoot?.querySelector<HTMLInputElement>('input')
    expect(input?.checked).to.be.false
  })

  it("when disabled and in indeterminate state it can't be checked", async () => {
    const el = await fixture(
      html`<sp-input-checkbox name="acceptLicense" value="license-accept" indeterminate disabled
        >I accept</sp-input-checkbox
      >`
    )

    const input = el.shadowRoot?.querySelector<HTMLInputElement>('input')
    expect(input?.checked).to.be.false

    const checkbox = el.shadowRoot?.querySelector<HTMLElement>('.checkbox')
    expect(checkbox).to.not.be.undefined

    setTimeout(() => checkbox?.dispatchEvent(spaceBarKeyPress))
    await aTimeout(1000)

    expect(input?.checked).to.be.false
  })

  it("when disabled and checked, can't be un-checked", async () => {
    const el = await fixture(
      html`<sp-input-checkbox name="acceptLicense" value="license-accept" checked disabled>I accept</sp-input-checkbox>`
    )

    const input = el.shadowRoot?.querySelector<HTMLInputElement>('input')
    expect(input?.checked).to.be.true

    const checkbox = el.shadowRoot?.querySelector<HTMLElement>('.checkbox')
    expect(checkbox).to.not.be.undefined

    setTimeout(() => checkbox?.dispatchEvent(spaceBarKeyPress))
    await aTimeout(1000)

    expect(input?.checked).to.be.true
  })

  it('passes the a11y audit', async () => {
    const el = await fixture(
      html`<sp-input-checkbox name="acceptLicense" value="license-accept" checked>I accept</sp-input-checkbox>`
    )

    await expect(el).shadowDom.to.be.accessible()
  })
})
