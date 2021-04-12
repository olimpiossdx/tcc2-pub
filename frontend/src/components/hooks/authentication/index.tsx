import React from 'react';
import firebase from '../../../config/firebase';
import api from '../../../services';

interface IFirebaseUserInfo {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  accesKey: string;
};

interface IAuthState {
  token: string;
  user: IFirebaseUserInfo;
};

interface AuthContextData {
  user: IFirebaseUserInfo;
  signIn(): Promise<void>;
  signOut(): void;
  firebaseAuthAsync(): Promise<firebase.auth.UserCredential>
};

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

const AuthenticationProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<IAuthState>(() => {
    const token = localStorage.getItem('@sisag:token');
    const user = localStorage.getItem('@sisag:user');

    if (token && user) {
      const parsedTOken = JSON.parse(token) as string;
      api.defaults.headers.authorization = `Bearer ${parsedTOken}`;
      return { user: JSON.parse(user), token: parsedTOken };
    }

    return {} as IAuthState;
  });

  const firebaseAuthAsync = React.useCallback(async (): Promise<firebase.auth.UserCredential> => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return await firebase.auth().signInWithPopup(provider);
  }, []);

  const signIn = React.useCallback(async () => {
    const response = await firebaseAuthAsync();
    const token = await response.user?.getIdToken() as string;

    const user = {
      uid: response.user?.uid,
      displayName: response.user?.displayName,
      email: response.user?.email,
      photoURL: response.user?.photoURL
    } as IFirebaseUserInfo;

    localStorage.setItem('@sisag:token', JSON.stringify(token));
    localStorage.setItem('@sisag:user', JSON.stringify(user));

    //TODO: tratamento de erro
    //await api.post('/login', (response.credential as firebase.auth.OAuthCredential).idToken);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setState({ user, token });

  }, [firebaseAuthAsync]);


  const signOut = React.useCallback(async () => {
    localStorage.removeItem('@sisag:token');
    localStorage.removeItem('@sisag:user');
    setState({} as IAuthState);
  }, []);

  return (<AuthContext.Provider value={{ user: state.user, signIn, signOut, firebaseAuthAsync }}>
    {children}
  </AuthContext.Provider>);
}

function useAuth(): AuthContextData {
  const context = React.useContext(AuthContext);

  return context;
}

export { AuthenticationProvider, useAuth };
