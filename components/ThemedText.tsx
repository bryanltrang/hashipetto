import { Text, type TextProps } from 'react-native';

export type FontFamily =
  | 'DisplayDots'
  | 'Urbanist_100Thin'
  | 'Urbanist_100Thin_Italic'
  | 'Urbanist_200ExtraLight'
  | 'Urbanist_200ExtraLight_Italic'
  | 'Urbanist_300Light'
  | 'Urbanist_300Light_Italic'
  | 'Urbanist_400Regular'
  | 'Urbanist_400Regular_Italic'
  | 'Urbanist_500Medium'
  | 'Urbanist_500Medium_Italic'
  | 'Urbanist_600SemiBold'
  | 'Urbanist_600SemiBold_Italic'
  | 'Urbanist_700Bold'
  | 'Urbanist_700Bold_Italic'
  | 'Urbanist_800ExtraBold'
  | 'Urbanist_800ExtraBold_Italic'
  | 'Urbanist_900Black'
  | 'Urbanist_900Black_Italic';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  fontFamily?: FontFamily;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  fontFamily = 'Urbanist_400Regular',
  ...rest
}: ThemedTextProps) {
  // const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <Text style={[{ fontFamily }, style]} {...rest} />;
}

// const styles = StyleSheet.create({
//   default: {
//     fontSize: 16,
//     lineHeight: 24,
//   },
//   defaultSemiBold: {
//     fontSize: 16,
//     lineHeight: 24,
//     fontWeight: '600',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     lineHeight: 32,
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   link: {
//     lineHeight: 30,
//     fontSize: 16,
//     color: '#0a7ea4',
//   },
// });
