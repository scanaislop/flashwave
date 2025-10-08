import { Link, Stack } from 'expo-router';
import { sharedStyles } from '@/components/styles/shared';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (<>
    <Stack.Screen options={{ title: 'Oops!' }} />
    <View style={sharedStyles.container}>
      <Text style={sharedStyles.text}>This screen doesn&apos;t exist.</Text>
      <Link href="/" style={sharedStyles.link}>
        <Text>Go to home screen!</Text>
      </Link>
    </View>
  </>);
}
