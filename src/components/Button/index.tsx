// import React from 'react';
// import {
//   TouchableOpacity,
//   Text,
//   ActivityIndicator,
//   View,
//   StyleSheet,
// } from 'react-native';
// import {Ionicons} from '@expo/vector-icons';
// import Animated, {
//   useSharedValue,
//   withSpring,
//   useAnimatedStyle,
// } from 'react-native-reanimated';
//
// interface ButtonProps {
//   title: string;
//   onPress: () => void;
//   icon?: string;
//   iconPosition?: 'left' | 'right';
//   isLoading?: boolean;
// }
//
// export const Button: React.FC<ButtonProps> = ({
//   title,
//   onPress,
//   icon,
//   iconPosition = 'left',
//   isLoading = false,
// }) => {
//   const scale = useSharedValue(1);
//
//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{scale: scale.value}],
//   }));
//
//   return (
//     <Animated.View style={[styles.container, animatedStyle]}>
//       <TouchableOpacity
//         style={[styles.button, isLoading && styles.disabledButton]}
//         activeOpacity={0.7}
//         disabled={isLoading}
//         onPress={() => {
//           scale.value = withSpring(0.95, {damping: 5}, () => {
//             scale.value = withSpring(1);
//           });
//           onPress();
//         }}>
//         {isLoading ? (
//           <ActivityIndicator size="small" color="white" />
//         ) : (
//           <>
//             {icon && iconPosition === 'left' && (
//               <Ionicons
//                 name={icon}
//                 size={20}
//                 color="white"
//                 style={styles.icon}
//               />
//             )}
//             <Text style={styles.text}>{title}</Text>
//             {icon && iconPosition === 'right' && (
//               <Ionicons
//                 name={icon}
//                 size={20}
//                 color="white"
//                 style={styles.icon}
//               />
//             )}
//           </>
//         )}
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     overflow: 'hidden',
//     borderRadius: 8,
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#007AFF',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
//   text: {
//     color: 'white',
//     fontSize: 16,
//   },
//   icon: {
//     marginHorizontal: 5,
//   },
// });
