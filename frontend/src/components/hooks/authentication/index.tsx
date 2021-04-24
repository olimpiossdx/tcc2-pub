import React from 'react';
import firebase from '../../../config/firebase';
import { ApiServiceRequest } from '../../../services';
import INotification from '../notification/model';

interface IFirebaseUserInfo {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  accessKey: string;
};

interface IAuthState {
  token: string;
  user: IFirebaseUserInfo;
};

interface AuthContextData {
  user: IFirebaseUserInfo;
  signIn(setNotification: ((message: Omit<INotification, "id">) => void)): Promise<void>;
  signOut(): void;
  firebaseAuthAsync(): Promise<firebase.auth.UserCredential>
  updateAccesskey(accessKey: string): void;
};

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

const AuthenticationProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<IAuthState>(() => {
    const token = localStorage.getItem('@sisag:token');
    const user = localStorage.getItem('@sisag:user');

    if (token && user) {
      const parsedTOken = JSON.parse(token) as string;
      return { user: JSON.parse(user), token: parsedTOken };
    }

    return {} as IAuthState;
  });

  const firebaseAuthAsync = React.useCallback(async (): Promise<firebase.auth.UserCredential> => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return await firebase.auth().signInWithPopup(provider);
  }, []);

  const signIn = React.useCallback(async (addNotification?: ((message: Omit<INotification, "id">) => void)) => {
    const firebaseAuthResponse = await firebaseAuthAsync();
    const token = await firebaseAuthResponse.user?.getIdToken() as string;
    const providerUserData = firebaseAuthResponse.user?.providerData[0];

    const user = {
      uid: providerUserData?.uid,
      displayName: firebaseAuthResponse.user?.displayName,
      email: firebaseAuthResponse.user?.email,
      photoURL: firebaseAuthResponse.user?.photoURL,
      accessKey: ''
    } as IFirebaseUserInfo;


    localStorage.setItem('@sisag:token', JSON.stringify(token));
    
    const response = await ApiServiceRequest({ method: 'get', url: 'authentication' }, undefined, addNotification);

    if (!('status' in response)) {
      localStorage.setItem('@sisag:user', JSON.stringify(user));
      user.accessKey = response.accessKey;
      setState({ user, token });
    };

  }, [firebaseAuthAsync]);


  const signOut = React.useCallback(async () => {
    localStorage.removeItem('@sisag:token');
    localStorage.removeItem('@sisag:user');
    setState({} as IAuthState);
  }, []);

  const updateAccesskey = React.useCallback((accessKey: string) => {
    const usuario = state.user
    usuario.accessKey = accessKey;

    setState({ ...state, user: usuario });
  }, [state]);

  return (<AuthContext.Provider value={{ user: state.user, signIn, signOut, firebaseAuthAsync, updateAccesskey }}>
    {children}
  </AuthContext.Provider>);
}

function useAuth(): AuthContextData {
  const context = React.useContext(AuthContext);

  return context;
}

export { AuthenticationProvider, useAuth };
