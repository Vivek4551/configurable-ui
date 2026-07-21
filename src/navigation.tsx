import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Details from './pages/Details';

export type RootStackParamList = {
  Home: undefined;
  Details: { city: string; state: 'bihar' };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
