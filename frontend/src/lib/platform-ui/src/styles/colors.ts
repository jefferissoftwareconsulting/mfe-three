import { css } from 'lit-element'
import type { Property } from 'csstype'

declare module 'csstype' {
  interface Properties {
    '--sp-color-primary-900'?: Property.Color
    '--sp-color-primary-800'?: Property.Color
    '--sp-color-primary-700'?: Property.Color
    '--sp-color-primary-600'?: Property.Color
    '--sp-color-primary-500'?: Property.Color
    '--sp-color-primary-400'?: Property.Color
    '--sp-color-primary-300'?: Property.Color
    '--sp-color-primary-200'?: Property.Color
    '--sp-color-primary-100'?: Property.Color
  }
}

export const colors = css`
  :host {
    --sp-color-neutral-900: #1b263a;
    --sp-color-neutral-850: #223049;
    --sp-color-neutral-800: #364359;
    --sp-color-neutral-750: #4a556a;
    --sp-color-neutral-700: #5e687a;
    --sp-color-neutral-650: #697282;
    --sp-color-neutral-600: #7a8291;
    --sp-color-neutral-550: #8d95a5;
    --sp-color-neutral-500: #9aa2b2;
    --sp-color-neutral-450: #b3bac8;
    --sp-color-neutral-400: #cacfd9;
    --sp-color-neutral-350: #dadee6;
    --sp-color-neutral-300: #e4e7ed;
    --sp-color-neutral-250: #eceef3;
    --sp-color-neutral-200: #f3f5f9;
    --sp-color-neutral-0: #ffffff;

    --sp-color-white: var(--sp-color-neutral-0);

    --sp-color-blue-900: #0062b3;
    --sp-color-blue-800: #0070cc;
    --sp-color-blue-700: #007ee6;
    --sp-color-blue-600: #008cff;
    --sp-color-blue-500: #33a3ff;
    --sp-color-blue-400: #66baff;
    --sp-color-blue-300: #99d1ff;
    --sp-color-blue-200: #cce8ff;
    --sp-color-blue-100: #e6f4ff;

    --sp-color-green-900: #3e7f4d;
    --sp-color-green-800: #479258;
    --sp-color-green-700: #50a463;
    --sp-color-green-600: #59b66e;
    --sp-color-green-500: #7ac58b;
    --sp-color-green-400: #9bd3a8;
    --sp-color-green-300: #bde2c5;
    --sp-color-green-200: #def0e2;
    --sp-color-green-100: #ebf6ed;

    --sp-color-orange-900: #9f5314;
    --sp-color-orange-800: #b65e16;
    --sp-color-orange-700: #cc6a19;
    --sp-color-orange-600: #e3761c;
    --sp-color-orange-500: #e99149;
    --sp-color-orange-400: #eead77;
    --sp-color-orange-300: #f4c8a4;
    --sp-color-orange-200: #f9e4d2;
    --sp-color-orange-100: #fcf1e8;

    --sp-color-red-900: #952a22;
    --sp-color-red-800: #aa3026;
    --sp-color-red-700: #c0362b;
    --sp-color-red-600: #d53c30;
    --sp-color-red-500: #dd6359;
    --sp-color-red-400: #e68a83;
    --sp-color-red-300: #eeb1ac;
    --sp-color-red-200: #f7d8d6;
    --sp-color-red-100: #fbecea;

    --sp-color-purple-900: #514192;
    --sp-color-purple-800: #5c4aa6;
    --sp-color-purple-700: #6854bb;
    --sp-color-purple-600: #735dd0;
    --sp-color-purple-500: #8f7dd9;
    --sp-color-purple-400: #ab9ee3;
    --sp-color-purple-300: #c7beec;
    --sp-color-purple-200: #e3dff6;
    --sp-color-purple-100: #f1effa;

    --sp-color-cyan-900: #3aa9ca;
    --sp-color-cyan-800: #3aa9ca;
    --sp-color-cyan-700: #3aa9ca;
    --sp-color-cyan-600: #3aa9ca;
    --sp-color-cyan-500: #3aa9ca;
    --sp-color-cyan-400: #3aa9ca;
    --sp-color-cyan-300: #3aa9ca;
    --sp-color-cyan-200: #3aa9ca;
    --sp-color-cyan-100: #ebf6fa;

    --sp-color-yellow-900: #a1850b;
    --sp-color-yellow-800: #b8980c;
    --sp-color-yellow-700: #cfab0e;
    --sp-color-yellow-600: #e6be0f;
    --sp-color-yellow-500: #ebcb3f;
    --sp-color-yellow-400: #f0d86f;
    --sp-color-yellow-300: #f5e59f;
    --sp-color-yellow-200: #faf2cf;
    --sp-color-yellow-100: #fdf9e7;

    --sp-color-teal-900: #19675f;
    --sp-color-teal-800: #1d766c;
    --sp-color-teal-700: #20847a;
    --sp-color-teal-600: #249387;
    --sp-color-teal-500: #50a99f;
    --sp-color-teal-400: #7cbeb7;
    --sp-color-teal-300: #a7d4cf;
    --sp-color-teal-200: #d3e9e7;
    --sp-color-teal-100: #e9f4f3;

    --sp-color-pink-900: #832358;
    --sp-color-pink-800: #962864;
    --sp-color-pink-700: #a82d71;
    --sp-color-pink-600: #bb327d;
    --sp-color-pink-500: #c95b97;
    --sp-color-pink-400: #d684b1;
    --sp-color-pink-300: #e4adcb;
    --sp-color-pink-200: #f1d6e5;
    --sp-color-pink-100: #f8ebf2;

    --sp-color-sapphire-900: #3e6682;
    --sp-color-sapphire-800: #467495;
    --sp-color-sapphire-700: #4f83a7;
    --sp-color-sapphire-600: #5891ba;
    --sp-color-sapphire-500: #79a7c8;
    --sp-color-sapphire-400: #9bbdd6;
    --sp-color-sapphire-300: #bcd3e3;
    --sp-color-sapphire-200: #dee9f1;
    --sp-color-sapphire-100: #eef4f8;

    --sp-color-lime-900: #577d2e;
    --sp-color-lime-800: #638f35;
    --sp-color-lime-700: #70a13b;
    --sp-color-lime-600: #7cb342;
    --sp-color-lime-500: #96c268;
    --sp-color-lime-400: #b0d18e;
    --sp-color-lime-300: #cbe1b3;
    --sp-color-lime-200: #e5f0d9;
    --sp-color-lime-100: #f2f7ec;

    --sp-color-indigo-900: #2f3976;
    --sp-color-indigo-800: #364286;
    --sp-color-indigo-700: #3c4a97;
    --sp-color-indigo-600: #4352a8;
    --sp-color-indigo-500: #6975b9;
    --sp-color-indigo-400: #8e97cb;
    --sp-color-indigo-300: #b4badc;
    --sp-color-indigo-200: #d9dcee;
    --sp-color-indigo-100: #eceef6;

    --sp-color-brown-900: #7f4133;
    --sp-color-brown-800: #924a3a;
    --sp-color-brown-700: #a45442;
    --sp-color-brown-600: #b65d49;
    --sp-color-brown-500: #c57d6d;
    --sp-color-brown-400: #d39e92;
    --sp-color-brown-300: #e2beb6;
    --sp-color-brown-200: #f0dfdb;
    --sp-color-brown-100: #f8efed;

    --sp-color-maroon-900: #4f2b3f;
    --sp-color-maroon-800: #5a3248;
    --sp-color-maroon-700: #663851;
    --sp-color-maroon-600: #713e5a;
    --sp-color-maroon-500: #8d657b;
    --sp-color-maroon-400: #aa8b9c;
    --sp-color-maroon-300: #c6b2bd;
    --sp-color-maroon-200: #e3d8de;
    --sp-color-maroon-100: #f1ecef;

    --sp-color-rose-900: #89374a;
    --sp-color-rose-800: #9d3f55;
    --sp-color-rose-700: #b0475f;
    --sp-color-rose-600: #c44f6a;
    --sp-color-rose-500: #d07288;
    --sp-color-rose-400: #dc95a6;
    --sp-color-rose-300: #e7b9c3;
    --sp-color-rose-200: #f3dce1;
    --sp-color-rose-100: #f9edf0;

    --sp-color-overlay: #22304933;
    --sp-color-shadow-150: #22304926;
    --sp-color-shadow-100: #2230491a;

    --sp-color-primary-900: var(--sp-color-blue-900);
    --sp-color-primary-800: var(--sp-color-blue-800);
    --sp-color-primary-700: var(--sp-color-blue-700);
    --sp-color-primary-600: var(--sp-color-blue-600);
    --sp-color-primary-500: var(--sp-color-blue-500);
    --sp-color-primary-400: var(--sp-color-blue-400);
    --sp-color-primary-300: var(--sp-color-blue-300);
    --sp-color-primary-200: var(--sp-color-blue-200);
    --sp-color-primary-100: var(--sp-color-blue-100);

    --sp-color-error: var(--sp-color-red-600);
    --sp-color-label-text: var(--sp-color-neutral-750);

    --sp-color-text-on-color: var(--sp-color-white);
  }
`
