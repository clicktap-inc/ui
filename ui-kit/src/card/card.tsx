/* eslint-disable eslint-comments/disable-enable-pair, react/jsx-props-no-spreading */
import { Children, isValidElement, ReactElement } from 'react';
import {
  CardContentProps,
  CardHeaderProps,
  CardFooterProps,
  CardMediaProps,
  CardProps,
} from './card.props';
import {
  StyledCard,
  StyledCardContent,
  StyledCardHeader,
  StyledCardFooter,
  StyledCardMedia,
  StyledCardTitleFrame,
  StyledCardTitle,
  StyledCardSubtitle,
  StyledCardIcon,
  StyledCardAvatar,
  StyledCardActions,
} from './card.styles';
// import theme from '../theming/theming';

// CardContent

function CardContent(props: CardContentProps) {
  return <StyledCardContent {...props} />;
}

CardContent.defaultProps = {
  background: 'white',
};

// CardHeader

function CardHeader(props: CardHeaderProps) {
  const { title, subtitle, icon, avatar, actions, children } = props;

  return children ? (
    <StyledCardHeader {...props}>{children}</StyledCardHeader>
  ) : (
    <StyledCardHeader {...props}>
      {icon && !avatar && <StyledCardIcon {...props}>{icon}</StyledCardIcon>}

      {avatar && <StyledCardAvatar {...props}>{avatar}</StyledCardAvatar>}

      {(title || subtitle) && (
        <StyledCardTitleFrame {...props}>
          {title && <StyledCardTitle {...props}>{title}</StyledCardTitle>}

          {subtitle && (
            <StyledCardSubtitle {...props}>{subtitle}</StyledCardSubtitle>
          )}
        </StyledCardTitleFrame>
      )}

      {actions && <StyledCardActions {...props}>{actions}</StyledCardActions>}
    </StyledCardHeader>
  );
}

CardHeader.defaultProps = {
  background: 'white',
};

// CardFooter

function CardFooter(props: CardFooterProps) {
  return <StyledCardFooter {...props} />;
}

CardFooter.defaultProps = {
  background: 'white',
};

// CardMedia

function CardMedia(props: CardMediaProps) {
  return <StyledCardMedia {...props} />;
}

CardMedia.defaultProps = {
  background: 'gray-200',
  aspectRatio: 16 / 9,
};

// Card

export function Card(props: CardProps) {
  const { title, subtitle, icon, avatar, actions, footer, media, children } =
    props;

  return Children.toArray(children)
    .filter((child) => isValidElement(child))
    .map((child) => (child as ReactElement).type)
    .some((type) =>
      [Card.Content, Card.Header, Card.Footer, Card.Media].some(
        (component) => component === type
      )
    ) ? (
    <StyledCard {...props}>{children}</StyledCard>
  ) : (
    <StyledCard {...props}>
      {[title, subtitle, icon, avatar, actions].some(Boolean) && (
        <Card.Header
          title={title}
          subtitle={subtitle}
          icon={icon}
          avatar={avatar}
          actions={actions}
        />
      )}

      {media && <Card.Media>{media}</Card.Media>}

      {children && <Card.Content>{children}</Card.Content>}

      {footer && <Card.Footer>{footer}</Card.Footer>}
    </StyledCard>
  );
}

Card.Content = CardContent;
Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.Media = CardMedia;

export default Card;
