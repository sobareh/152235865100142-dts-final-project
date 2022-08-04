import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import { provider } from '../../config/github-provider';

export const login = async (auth, email, password, dispatch, navigate) => {
  try {
    const reqLogin = await signInWithEmailAndPassword(auth, email, password);

    if (reqLogin.user) {
      const userAuth = JSON.stringify(reqLogin.user);
      localStorage.setItem('firebase-auth', userAuth);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          data: reqLogin.user,
        },
      });

      navigate('/home');
    }
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAIL',
      payload: {
        error: error.message,
      },
    });
  }
};

export const handleGithubLogin = async (navigate, dispatch) => {
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, provider);

    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const user = result.user;

    const userAuth = JSON.stringify({ token, user });
    localStorage.setItem('firebase-auth', userAuth);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        data: { token, user },
      },
    });

    if (result) {
      navigate('/home');
    }
  } catch (error) {
    // const errCode = error.code;
    // const errMessage = error.message;
    // const email = error.email;
    // const credential = GithubAuthProvider.credentialFromError(error);

    dispatch({
      type: 'LOGIN_FAIL',
      payload: {
        error: error.message,
      },
    });
  }
};

export const logout = async (auth, navigate, dispatch) => {
  try {
    await signOut(auth);

    localStorage.removeItem('firebase-auth');

    dispatch({
      type: 'LOGOUT',
    });

    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const register = async (auth, email, password, dispatch, navigate) => {
  try {
    const reqRegister = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userAuth = JSON.stringify(reqRegister.user);
    localStorage.setItem('firebase-auth', userAuth);

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: {
        data: reqRegister.user,
      },
    });

    navigate('/home');
  } catch (error) {
    dispatch({
      type: 'REGISTER_FAIL',
      payload: {
        error: error.message,
      },
    });
  }
};
