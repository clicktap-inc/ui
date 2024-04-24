import { ListBoxItemProps } from 'react-aria-components';
import { StyledListBoxItem } from './styles';

export function Option(props: ListBoxItemProps) {
  return (
    <StyledListBoxItem
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

export default Option;
