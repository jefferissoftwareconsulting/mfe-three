import { html, TemplateResult } from 'lit';
import '../src/mfe-three.js';

export default {
  title: 'MfeThree',
  component: 'mfe-three',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ title, backgroundColor = 'white' }: ArgTypes) => html`
  <mfe-three style="--mfe-three-background-color: ${backgroundColor}" .title=${title}></mfe-three>
`;

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
