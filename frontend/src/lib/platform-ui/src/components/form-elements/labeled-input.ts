import { css, customElement, LitElement } from 'lit-element';
import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { makeScopedTagName } from '../../utils/lit-utils';
import { InputBase, IInputBaseAttributes } from './input-base';
import type { JSXProps } from '../../types';
import './input-guide';
import './input-error';

export const labeledInput = makeScopedTagName('labeled-input');
export const inputLabel = makeScopedTagName('input-label');

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [inputLabel]: JSXProps<InputLabel>;
      [labeledInput]: JSXProps<
        LabeledInput<unknown>,
        ILabeledInputAttributes<unknown>
      >;
    }
  }

  interface HTMLElementTagNameMap {
    [inputLabel]: InputLabel;
    [labeledInput]: LabeledInput<unknown>;
  }
}

export type InputSizes =
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'auto'
  | 'full';

const inputSizes = css`
  .size-x-small {
    width: 80px;
  }

  .size-small {
    width: 160px;
  }

  .size-medium {
    width: 256px;
  }

  .size-large {
    width: 320px;
  }

  .size-x-large {
    width: 480px;
  }

  .size-full {
    width: 100%;
  }
`;

const labelPositions = css`
  .container {
    display: flex;
  }

  :host([label-position='top']) .container {
    flex-direction: column;
  }

  :host([label-position='top']) .has-label sp-input-label {
    margin-bottom: var(--sp-spacing-1);
  }

  :host([label-position='side']) {
    align-items: flex-start;
  }

  :host([label-position='side']) .has-label sp-input-label {
    margin-top: var(--sp-spacing-2);
    margin-right: var(--sp-spacing-5);
    width: 160px;
  }

  label.field-label {
    /* Hide label element if the slot is empty */
    display: none;
  }

  .has-label label.field-label {
    display: inline-block;
  }

  .has-error sp-input-error {
    margin-top: var(--sp-spacing-1);
  }

  .prompt {
    margin-left: auto;
    white-space: nowrap;
  }
`;

const guideStyles = css`
  .guide {
    display: flex;
  }

  .guide-right {
    margin-left: auto;
    white-space: nowrap;
  }
`;

export type LabelPosition = 'side' | 'top';

export interface ILabeledInputAttributes<T> extends IInputBaseAttributes<T> {
  'label-position'?: LabelPosition;
  required?: boolean;
  size?: InputSizes;
}

/**
 * Base class for inputs that require a label and or error message.
 * When implementing this class, the render method becomes `renderInput`.
 * If you need to render a guide.. i.e. character count, use `renderGuide`.
 * Can also be used directly to wrap custom inputs for consistent layout.
 */
@customElement(labeledInput)
export class LabeledInput<T> extends InputBase<T> {
  static styles = [inputSizes, labelPositions, guideStyles];

  static properties = {
    ...InputBase.properties,
    labelPosition: { type: String, attribute: 'label-position', reflect: true },
    required: { type: Boolean, attribute: 'required', reflect: true },
    size: { type: String, reflect: true },
    hasLabel: { state: true },
    hasPrompt: { state: true },
    hasError: { state: true },
  };

  required = false;
  labelPosition: LabelPosition = 'top';
  size: InputSizes = 'medium';
  protected hasLabel = false;
  protected hasPrompt = false;
  protected hasError = false;

  handleLabelChange() {
    const slotElement = this.shadowRoot?.querySelector(
      'slot[name="label"]'
    ) as HTMLSlotElement;
    this.hasLabel = slotElement.assignedNodes().length > 0;
  }

  handlePromptChange() {
    const slotElement = this.shadowRoot?.querySelector(
      'slot[name="prompt"]'
    ) as HTMLSlotElement;
    this.hasPrompt = slotElement.assignedNodes().length > 0;
  }

  handleErrorChange() {
    const slotElement = this.shadowRoot?.querySelector(
      'slot[name="error"]'
    ) as HTMLSlotElement;
    this.hasError = slotElement.assignedNodes().length > 0;
  }

  renderInput(): TemplateResult | null {
    return html`<slot></slot>`;
  }

  /**
   * Some fields need an extra containing element around the input itself and
   * other elements to handle special layouts, such as icons. Use this method
   * to create that structural layer if needed.
   */
  renderInputContainer() {
    return this.renderInput();
  }

  renderGuide(): TemplateResult | null {
    return null;
  }

  render() {
    const sizeClass = `size-${this.size}`;

    return html`
      ${this.labelPosition === 'side'
        ? html`<sp-split-row
            ><span slot="right"><slot name="prompt"></slot></span
          ></sp-split-row>`
        : ''}

      <div class="container">
        <sp-split-row
          no-gap
          class=${classMap({
            'has-label': this.hasLabel,
            [sizeClass]: this.hasPrompt,
          })}
        >
          <label slot="left" for=${this.id} class="field-label">
            <sp-input-label>
              <slot @slotchange=${this.handleLabelChange} name="label"></slot>
              ${this.required ? '*' : ''}
            </sp-input-label>
          </label>
          ${this.labelPosition === 'top'
            ? html`<span slot="right"><slot name="prompt"></slot></span>`
            : ''}
        </sp-split-row>

        <div class=${sizeClass}>
          ${this.renderInputContainer()}

          <div
            class=${classMap({
              guide: true,
              'has-error': this.hasError,
            })}
          >
            <sp-input-error>
              <slot @slotchange=${this.handleErrorChange} name="error"></slot>
            </sp-input-error>

            ${this.renderGuide()
              ? html`<div class="guide-right">${this.renderGuide()}</div>`
              : null}
          </div>
        </div>
      </div>
    `;
  }
}

@customElement(inputLabel)
export class InputLabel extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      color: var(--sp-color-label-text);
      line-height: var(-sp-line-height);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}
