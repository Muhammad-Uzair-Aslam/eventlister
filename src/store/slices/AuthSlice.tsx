import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
interface AuthState {
  user: {name: string; email: string} | null;
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
  async (_, {rejectWithValue}) => {
    try {
      await auth().signOut();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to sign out');
    }
  },
);
export const signUpUser = createAsyncThunk<
  {name: string; email: string},
  {name: string; email: string; password: string}
>('user/signUp', async ({name, email, password}, {rejectWithValue}) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    await firestore().collection('users').doc(user.uid).set({
      name,
      email,
      password,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    return {name, email};
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to sign up');
  }
});

export const signInUser = createAsyncThunk<
  {name: string; email: string},
  {email: string; password: string}
>('user/signIn', async ({email, password}, {rejectWithValue}) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    const userDoc = await firestore().collection('users').doc(user.uid).get();
    const userData = userDoc.data();
    const name = userData?.name || user.displayName || 'User';
    return {name, email};
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to sign in');
  }
});
export const resetPassword = createAsyncThunk<
  void,
  {currentPassword: string; newPassword: string}
>(
  'user/resetPassword',
  async ({currentPassword, newPassword}, {rejectWithValue}) => {
    try {
      const user = auth().currentUser;

      if (!user) throw new Error('User not logged in');
      if (!user.email) throw new Error('User email is null');

      const credential = auth.EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword);
      await firestore().collection('users').doc(user.uid).update({
        password: newPassword,
      });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

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
  extraReducers: builder => {
    builder
      .addCase(signUpUser.pending, state => {
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
    builder
      .addCase(signInUser.pending, state => {
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
    builder
      .addCase(resetPassword.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    builder
      .addCase(signOutUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, state => {
        state.status = 'succeeded';
        state.user = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
