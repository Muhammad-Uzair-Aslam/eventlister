import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Firestore import
interface AuthState {
  user: { name: string; email: string } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};
export const signOutUser = createAsyncThunk<void, void>(
  'user/signOut',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Attempting to sign out');
      await auth().signOut(); // Firebase sign-out method
      console.log('User signed out successfully');
    } catch (error: any) {
      console.error('Error during sign out:', error);
      return rejectWithValue(error.message || 'Failed to sign out');
    }
  }
);
// Async Thunk for Signing Up
export const signUpUser = createAsyncThunk<
  { name: string; email: string }, // Return type
  { name: string; email: string; password: string } // Argument type
>(
  'user/signUp',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Save user data to Firestore after successful sign up
      await firestore().collection('users').doc(user.uid).set({
        name,
        email,
        password,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      return { name, email };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to sign up');
    }
  }
);

// Async Thunk for Signing In
export const signInUser = createAsyncThunk<
  { name: string; email: string }, // Return type
  { email: string; password: string } // Argument type
>(
  'user/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Retrieve user data from Firestore (if needed)
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      const userData = userDoc.data();

      // If you have the name in Firestore, use it
      const name = userData?.name || user.displayName || 'User';
      return { name, email };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to sign in');
    }
  }
);

// Async Thunk for Resetting Password
export const resetPassword = createAsyncThunk<
  void,
  { currentPassword: string; newPassword: string }
>('user/resetPassword', async ({ currentPassword, newPassword }, { rejectWithValue }) => {
  try {
    const user = auth().currentUser;

    if (!user) throw new Error('User not logged in');
    if (!user.email) throw new Error('User email is null');

    const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
    await user.reauthenticateWithCredential(credential);
    await user.updatePassword(newPassword);
    await firestore().collection('users').doc(user.uid).update({
      password: newPassword,
    });
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Sign Up Reducers
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    // Sign In Reducers
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    // Reset Password Reducers
    builder
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    builder
      .addCase(signOutUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null; // Clear user data on successful logout
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
