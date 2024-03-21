//DefaultTheme implements UiKitTheme
import { DefaultTheme } from 'quickblox-react-ui-kit';

export default class CustomTheme extends DefaultTheme {
  divider = (): string => 'var(--divider)';
  fontFamily = (): string => 'Roboto';
  caption = (): string => 'var(--caption)';
  chatInput = (): string => 'var(--chat-input)';
  disabledElements = (): string => 'var(--disabled-elements)';
  dropdownBackground = (): string => 'var(--dropdown-background)';
  error = (): string => 'var(--error)';
  fieldBorder = (): string => 'var(--field-border)';
  hightlight = (): string => 'var(--hightlight)';
  incomingBackground = (): string => 'var(--incoming-background)';
  inputElements = (): string => 'var(--input-elements)';
  mainBackground = (): string => 'var(--main-background)';
  mainElements = (): string => 'var(--main-elements)';
  outgoingBackground = (): string => 'var(--outgoing-background)';
  secondaryBackground = (): string => 'var(--secondary-background)';
  secondaryElements = (): string => 'var(--secondary-elements)';
}
