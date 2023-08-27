import { /* Children, isValidElement, */ PropsWithChildren } from 'react';
import {
  BreadcrumbsList,
  BreadcrumbsItem,
  BreadcrumbsSeparator,
  BreadcrumbsRoot,
} from './breadcrumbs.styles';
import type {
  BreadcrumbsProps,
  BreadcrumbsItemProps,
} from './breadcrumbs.props';
import type { UIComponent } from '../types';
// import type { ReactNode, ReactElement } from "react";

/** @todo write a child validator that can be used across modules for compound component children type-checking */
// const isValidChild = (child: ReactElement): boolean => {
//   if (Object.prototype.hasOwnProperty.call(child?.type, 'componentId') &&
//     (child?.type?.componentId === 'Breadcrumbs.Item' || child?.type?.componentId === 'Breadcrumbs.Separator')) {
//     return true;
//   }

//   return false;
// };

export const Breadcrumbs: UIComponent<BreadcrumbsProps> & {
  Item: UIComponent<BreadcrumbsItemProps>;
  Separator: UIComponent<BreadcrumbsProps>;
  // eslint-disable-next-line react/function-component-definition
} = ({ children }: PropsWithChildren) => {
  // let enrichedChildren;
  // if (Children.count(children)) {
  //   let separatorCount = 0;

  //   enrichedChildren = Children.toArray(children).map((element) => {
  //     if (!isValidElement(element)) return element;

  //     if (!Object.prototype.hasOwnProperty.call(element.type, 'componentId')) return element;
  //     const elementType = element.type as UIComponent; // we know this is UIComponent due to componentId

  //     // override separator elements with parent component prop so user doesn't need to manually specify in every child
  //     // if (elementType.componentId === BreadcrumbsSeparatorFC.name || elementType.target?.name === BreadcrumbsSeparatorFC.name) {
  //     if (elementType.componentId === BreadcrumbsSeparatorFC.componentId) {
  //       separatorCount++;
  //       return <element.type separator={separator} {...element.props} key={element.key} />;
  //     }

  //     return element;
  //   });

  // auto-magically add separator elements if user didn't specify
  // if (separatorCount === 0) {
  //   enrichedChildren = [];
  //   Children.map(children, (child, index) => {
  //     if (index % 2 !== 0) {
  //       enrichedChildren.push(<BreadcrumbsSeparatorFC />);
  //       enrichedChildren.push(child);
  //     } else if (Children.count(children) === index + 1) {
  //       enrichedChildren.push(<BreadcrumbsSeparatorFC />);
  //       enrichedChildren.push(child);
  //     } else {
  //       enrichedChildren.push(child);
  //     }
  //   });
  // }
  // }

  return (
    <BreadcrumbsRoot aria-label="Breadcrumb">
      <BreadcrumbsList>{children}</BreadcrumbsList>
    </BreadcrumbsRoot>
  );
};
Breadcrumbs.componentId = 'Breadcrumbs';

// eslint-disable-next-line react/function-component-definition
const BreadcrumbsItemFC: UIComponent<BreadcrumbsItemProps> = ({
  current = false,
  children,
  // eslint-disable-next-line react/jsx-props-no-spreading
  ...props
}: BreadcrumbsItemProps) =>
  children ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BreadcrumbsItem current={current} {...props}>
      {children}
    </BreadcrumbsItem>
  ) : null;
BreadcrumbsItemFC.componentId = 'Breadcrumbs.Item';

// eslint-disable-next-line react/function-component-definition
const BreadcrumbsSeparatorFC: UIComponent<BreadcrumbsProps> = ({
  separator,
  // eslint-disable-next-line react/jsx-props-no-spreading
  ...props
}: Pick<BreadcrumbsProps, 'separator'>) =>
  separator ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BreadcrumbsSeparator aria-hidden {...props}>
      {separator}
    </BreadcrumbsSeparator>
  ) : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BreadcrumbsSeparator aria-hidden {...props}>
      /
    </BreadcrumbsSeparator>
  );
BreadcrumbsSeparatorFC.componentId = 'Breadcrumbs.Separator';

Breadcrumbs.Item = BreadcrumbsItemFC;

Breadcrumbs.Separator = BreadcrumbsSeparatorFC;

export default Breadcrumbs;
