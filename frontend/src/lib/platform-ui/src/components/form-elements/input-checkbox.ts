import { html, css, customElement, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { JSXProps } from '../../types';
import { IInputBaseAttributes, InputBase } from './input-base';

export type CheckboxChangeEvent = CustomEvent<CheckboxChangeEventPayload>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-input-checkbox': JSXProps<InputCheckbox, IInputCheckboxAttributes>;
    }
  }

  interface HTMLElementTagNameMap {
    'sp-input-checkbox': InputCheckbox;
  }
}

interface CheckboxChangeEventPayload {
  checked: boolean;
  indeterminate: boolean;
}

interface IInputCheckboxAttributes extends IInputBaseAttributes {
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
}

const CHECKBOX_STATES = {
  Checked: 'Checked',
  Indeterminate: 'Indeterminate',
  Empty: 'Empty',
};

@customElement('sp-input-checkbox')
export class InputCheckbox extends InputBase<string> {
  static styles = [
    css`
      label {
        display: flex;
        align-items: center;
      }

      :host([checked]) .checkbox,
      :host([indeterminate]) .checkbox {
        background-color: var(--sp-color-primary-600);
        border-color: transparent;
      }

      :host([readonly]) .checkbox {
        background-color: var(--sp-color-neutral-250);
      }

      :host([disabled]) label {
        color: var(--sp-color-neutral-600);
      }

      :host([disabled]) .checkbox {
        background-color: var(--sp-color-neutral-200);
        color: var(--sp-color-neutral-450);
        border-color: inherit;
      }

      .checkbox {
        width: 16px;
        min-width: 16px;
        height: 16px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        border: solid 1px var(--sp-color-neutral-450);
        color: var(--sp-color-white);
        border-radius: var(--sp-border-radius-default);
        margin-right: var(--sp-spacing-3);
        overflow: hidden;
      }

      input {
        display: none;
        opacity: 0;
        position: absolute;
        left: 0;
      }
    `,
  ];

  static properties = {
    ...InputBase.properties,
    value: { type: String },
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    indeterminate: { type: Boolean, reflect: true },
  };

  checked = false;
  disabled = false;
  indeterminate = false;

  private checkboxState = CHECKBOX_STATES.Empty;
  private inputElement: HTMLInputElement | null = null;

  updateProxyInput() {
    super.updateProxyInput();
    if (!this.proxyInput) return;

    if (this.checked) {
      this.proxyInput.setAttribute('checked', '');
      this.proxyInput.value = this.value || '';
    } else {
      this.proxyInput.value = '';
    }
  }

  handleKeyPress(e: KeyboardEvent) {
    if (e.key === ' ') this.onInput();
  }

  onInput() {
    if (this.readonly || this.disabled) return;

    switch (this.checkboxState) {
      case CHECKBOX_STATES.Checked:
        this.checked = false;
        break;

      case CHECKBOX_STATES.Empty:
        this.checked = true;
        break;

      case CHECKBOX_STATES.Indeterminate:
        this.checked = true;
        this.indeterminate = false;
        if (this.inputElement) this.inputElement.indeterminate = false;
        break;
    }

    this.dispatchEvent(
      new CustomEvent<CheckboxChangeEventPayload>('sp-input-change', {
        detail: { checked: this.checked, indeterminate: this.indeterminate },
      })
    );
  }

  getIcon(): TemplateResult | undefined {
    switch (this.checkboxState) {
      case CHECKBOX_STATES.Checked:
        return html`<sp-icon icon="checkBoxTick" size="16"></sp-icon>`;

      case CHECKBOX_STATES.Indeterminate:
        return html`<sp-icon icon="zoomOut" size="16"></sp-icon>`;

      case CHECKBOX_STATES.Empty:
        return undefined;
    }
  }

  firstUpdated() {
    this.inputElement = this.renderRoot.querySelector('input');

    if (this.indeterminate && this.inputElement) {
      this.inputElement.indeterminate = true;
    }
  }

  render() {
    this.checkboxState = this.checked
      ? CHECKBOX_STATES.Checked
      : this.indeterminate
      ? CHECKBOX_STATES.Indeterminate
      : CHECKBOX_STATES.Empty;

    return html` <label>
      <div
        class="checkbox"
        tabindex=${this.disabled ? '-1' : '0'}
        @keypress=${this.handleKeyPress}
      >
        ${this.getIcon()}
      </div>

      <input
        @change=${this.onInput}
        .value=${this.value}
        type="checkbox"
        ?readonly=${this.readonly}
        ?checked=${this.checkboxState === CHECKBOX_STATES.Checked}
        aria-invalid=${ifDefined(this.invalid ? this.invalid : undefined)}
        id=${this.id}
        ?disabled=${this.disabled}
      />

      <slot></slot>
    </label>`;
  }
}
