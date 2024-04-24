import {
  Content,
  Indicator,
  Item,
  Link,
  List,
  Root,
  Trigger,
  Viewport,
} from '@radix-ui/react-navigation-menu';
import { ForwardedRef, ReactNode, forwardRef } from 'react';
import {
  Arrow,
  Callout,
  CalloutHeading,
  CalloutText,
  CaretDown,
  ListItemHeading,
  ListItemLink,
  ListItemText,
  StyledContent,
  StyledIndicator,
  StyledLink,
  StyledList,
  StyledRoot,
  StyledTrigger,
  StyledUl,
  StyledViewport,
  ViewportPosition,
} from './styles';

function CaretDownIcon({
  className,
  ...props
}: {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
}) {
  return (
    <CaretDown
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </CaretDown>
  );
}

CaretDownIcon.defaultProps = {
  className: undefined,
};

type ListItemProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
};

const ListItem = forwardRef(
  (
    { className, children, title, ...props }: ListItemProps,
    forwardedRef: ForwardedRef<HTMLAnchorElement>
  ) => (
    <li>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <StyledLink asChild>
        <ListItemLink
          className={`${className ?? ''}`}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          ref={forwardedRef}
        >
          <ListItemHeading>{title}</ListItemHeading>
          <ListItemText>{children}</ListItemText>
        </ListItemLink>
      </StyledLink>
    </li>
  )
);

ListItem.defaultProps = {
  className: undefined,
  href: undefined,
  title: undefined,
};

export function NavigationMenu() {
  return (
    <StyledRoot>
      <StyledList>
        <Item>
          <StyledTrigger>
            Learn <CaretDownIcon aria-hidden />
          </StyledTrigger>
          <StyledContent>
            <StyledUl className="one">
              <li style={{ gridRow: 'span 3' }}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <StyledLink asChild>
                  <Callout href="/">
                    <svg
                      aria-hidden
                      width="38"
                      height="38"
                      viewBox="0 0 25 25"
                      fill="white"
                    >
                      <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z" />
                      <path d="M12 0H4V8H12V0Z" />
                      <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z" />
                    </svg>
                    <CalloutHeading>Radix Primitives</CalloutHeading>
                    <CalloutText>
                      Unstyled, accessible components for React.
                    </CalloutText>
                  </Callout>
                </StyledLink>
              </li>

              <ListItem href="https://stitches.dev/" title="Stitches">
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
              <ListItem href="/colors" title="Colors">
                Beautiful, thought-out palettes with auto dark mode.
              </ListItem>
              <ListItem href="https://icons.radix-ui.com/" title="Icons">
                A crisp set of 15x15 icons, balanced and consistent.
              </ListItem>
            </StyledUl>
          </StyledContent>
        </Item>

        <Item>
          <StyledTrigger>
            Overview <CaretDownIcon aria-hidden />
          </StyledTrigger>
          <StyledContent>
            <StyledUl className="two">
              <ListItem
                title="Introduction"
                href="/primitives/docs/overview/introduction"
              >
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Getting started"
                href="/primitives/docs/overview/getting-started"
              >
                A quick tutorial to get you up and running with Radix
                Primitives.
              </ListItem>
              <ListItem title="Styling" href="/primitives/docs/guides/styling">
                Unstyled and compatible with any styling solution.
              </ListItem>
              <ListItem
                title="Animation"
                href="/primitives/docs/guides/animation"
              >
                Use CSS keyframes or any animation library of your choice.
              </ListItem>
              <ListItem
                title="Accessibility"
                href="/primitives/docs/overview/accessibility"
              >
                Tested in a range of browsers and assistive technologies.
              </ListItem>
              <ListItem
                title="Releases"
                href="/primitives/docs/overview/releases"
              >
                Radix Primitives releases and their changelogs.
              </ListItem>
            </StyledUl>
          </StyledContent>
        </Item>

        <Item>
          <StyledLink href="https://github.com/radix-ui">Github</StyledLink>
        </Item>

        <StyledIndicator>
          <Arrow />
        </StyledIndicator>
      </StyledList>

      <ViewportPosition>
        <StyledViewport />
      </ViewportPosition>
    </StyledRoot>
  );
}

export default NavigationMenu;
