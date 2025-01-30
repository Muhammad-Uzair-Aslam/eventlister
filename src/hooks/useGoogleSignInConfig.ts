import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const useGoogleSignInConfig = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1028977651225-9s33hm5mlc9mhjuo9bpa69ua5mcvqajo.apps.googleusercontent.com', // Replace with your webClientId from Firebase Console
    });
  }, []);
};

export default useGoogleSignInConfig;
