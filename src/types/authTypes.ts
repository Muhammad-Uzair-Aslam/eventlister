// export  type SignInFormData ={
//     email: string;
//     password: string;
//   }
  
//   export type User ={
//     name: string;
//     email: string;
//   }
  // src/types/navigation.types.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { RootStackParamList } from '../navigation/MainNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

export type SplashScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Splash'>;
export type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList & RootStackParamList, 'SignUp'>;

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export interface UseSignUpFormReturn {
  formData: SignUpFormData;
  status: string;
  error: string | null;
  handleSignUp: () => void;
  handleInputChange: (name: keyof SignUpFormData, value: string) => void;
}

export type SignInScreenProps = NativeStackScreenProps<AuthStackParamList & RootStackParamList, 'SignIn'>;

export interface AuthFormState {
  email: string;
  password: string;
}

export interface UseAuthFormReturn {
  email: string;
  password: string;
  status: string;
  error: string | null;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleSignIn: () => void;
}
// src/types/navigation.types.ts
export interface AuthScreenParams {
  Splash: Record<string, never>;  // empty object की जगह undefined के लिए
  SignIn: {
    redirectTo?: string;  // optional redirect path
  };
  SignUp: {
    initialEmail?: string;  // optional pre-filled email
  };
  RecoverPassword: {
    email?: string;  // pre-filled email for recovery
  };
  ResetPassword: {
    token: string;  // password reset token
    email: string;  // user email
  };
}

// इसमें हमने हर screen के लिए specific parameters define किए हैं