import { ParamListBase, useNavigation as useNavigationBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useNavigation = () => {
  const navigation = useNavigationBase<NativeStackNavigationProp<ParamListBase>>();

  return navigation;
};