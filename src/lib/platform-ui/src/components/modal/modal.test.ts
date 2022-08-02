import { html, expect, fixture, oneEvent, aTimeout } from '@open-wc/testing'
import { spy } from 'sinon'
import './modal'

describe('sp-modal', () => {
  it('should be registered', () => {
    expect(customElements.get('sp-modal')).not.to.be.undefined
  })

  it('should render', async () => {
    const modal = await fixture(html` <sp-modal></sp-modal> `)

    expect(modal.shadowRoot).not.to.be.null
  })

  it('should pass the a11y audit', async () => {
    const modal = await fixture(html` <sp-modal open></sp-modal> `)

    await expect(modal).shadowDom.to.be.accessible()
  })

  it('should close on mousedown in the overlay', async () => {
    const modalClose = spy()
    const modal = await fixture(html` <sp-modal @sp-modal-close=${modalClose} open></sp-modal> `)

    const overlay = modal.shadowRoot?.querySelector<HTMLElement>('#overlay')
    setTimeout(() => overlay?.dispatchEvent(new MouseEvent('mousedown')))
    await oneEvent(modal, 'sp-modal-close')

    expect(modalClose.called).to.be.true
  })

  it('should close on Escape keyup', async () => {
    const modalClose = spy()
    const modal = await fixture(html` <sp-modal @sp-modal-close=${modalClose} open></sp-modal> `)

    setTimeout(() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' })))
    await oneEvent(modal, 'sp-modal-close')

    expect(modalClose.called).to.be.true
  })

  describe('given noClose is enabled', () => {
    it('should not close on mousedown in the overlay', async () => {
      const modalClose = spy()
      const modal = await fixture(html` <sp-modal @sp-modal-close=${modalClose} open no-close></sp-modal> `)

      const overlay = modal.shadowRoot?.querySelector<HTMLElement>('#overlay')
      setTimeout(() => overlay?.dispatchEvent(new MouseEvent('mousedown')))
      await aTimeout(1000)

      expect(modalClose.called).to.be.false
    })

    it('should close on Escape keyup', async () => {
      const modalClose = spy()
      const modal = await fixture(html` <sp-modal @sp-modal-close=${modalClose} open no-close></sp-modal> `)

      setTimeout(() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' })))
      await oneEvent(modal, 'sp-modal-close')

      expect(modalClose.called).to.be.true
    })
  })
})
