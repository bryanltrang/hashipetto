import { Link, LinkProps } from 'expo-router';

export type ThemedTextProps = LinkProps<string> & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedLinkButton({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextProps) {
  return (
    <Link style={[{ fontFamily: 'Urbanist_600SemiBold' }, style]} {...rest} />
  );
}
