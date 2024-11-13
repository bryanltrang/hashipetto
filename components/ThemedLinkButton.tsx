import { Link, type LinkProps } from 'expo-router';

export type ThemedLinkProps = LinkProps<string> & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedLink({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedLinkProps) {
  return <Link style={style} {...rest} />;
}
