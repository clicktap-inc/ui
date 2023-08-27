import type {
  MiddlewareState,
  ReferenceElement,
  Middleware,
} from '@floating-ui/react';

export const parent: Middleware = {
  name: 'parent',
  // eslint-disable-next-line @typescript-eslint/require-await
  async fn({ x, y, elements, ...props }: MiddlewareState) {
    const referenceEl = elements.reference as ReferenceElement & Element;
    const parentEl = referenceEl.parentElement;
    if (parentEl && parentEl.tagName.toLowerCase() === 'div') {
      const rect = parentEl.getBoundingClientRect();
      // eslint-disable-next-line no-console
      // console.log(parentEl.offsetWidth);
      return { x: rect.width + 34, y: 0, ...props };
    }

    return { x, y, elements, ...props };
  },
};

export default parent;
