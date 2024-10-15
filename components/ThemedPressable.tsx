import { Pressable, type PressableProps } from 'react-native';

export type ThemedPressableProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedPressable({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedPressableProps) {
  return <Pressable style={style} {...rest} />;
}
