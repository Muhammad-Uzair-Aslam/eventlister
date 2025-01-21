import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/Store';
import {signUpUser} from '../../store/slices/AuthSlice';
import {useAppDispatch} from '../../store/hook'; // Adjust the path
import InputField from '../../components/inputField/InputField';
import CustomButton from '../../components/customButton/CustomButton';
import DividerComponent from '../../components/dividerComponent/DividerComponent';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
const SignUpScreen: React.FC = ({navigation}: any) => {
  const [formData, setFormData] = useState({name: '', email: '', password: ''});
  const dispatch = useAppDispatch();
  const {status, error} = useSelector((state: RootState) => state.user);

  const handleSignUp = () => {
    const {name, email, password} = formData;
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }
    dispatch(signUpUser({name, email, password}))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'User account created and saved to database!');
        setFormData({name: '', email: '', password: ''});
        navigation.navigate('Home');
      })
      .catch(err => {
        Alert.alert('Error', err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <InputField
        label="Name"
        placeholder="Enter your name"
        value={formData.name}
        onChangeText={text => setFormData({...formData, name: text})}
      />
      <InputField
        label="Email"
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={text => setFormData({...formData, email: text})}
        keyboardType="email-address"
      />
      <InputField
        label="Password"
        placeholder="Password"
        value={formData.password}
        onChangeText={text => setFormData({...formData, password: text})}
        secureTextEntry
      />
      <CustomButton
        title="Sign Up"
        onPress={handleSignUp}
        disabled={status === 'loading'}
      />
      {status === 'loading' && (
        <ActivityIndicator size="large" color="#6F3DE9" />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Text style={styles.linkText}>
        Already have an account?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.touchable}>Login Instead</Text>
        </TouchableOpacity>
      </Text>
      <DividerComponent />
      <ImageComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    marginTop: 40,
    marginBottom: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  touchable: {
    color: '#6F3DE9',
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default SignUpScreen;
