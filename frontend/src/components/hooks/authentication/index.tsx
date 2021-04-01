import React from 'react';
import firebase from '../../../config/firebase';
import api from '../../../services';

interface IProfile {
  email: string;
  family_name: string;
  given_name: string;
  granted_scopes: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
};

export interface IFirebaseAdditionalUserInfo extends firebase.auth.AdditionalUserInfo {
  profile: IProfile;
};

interface IAuthState {
  oauthCredential: firebase.auth.OAuthCredential;
  user: IFirebaseAdditionalUserInfo;
};

interface AuthContextData {
  user: IFirebaseAdditionalUserInfo;
  signIn(): Promise<void>;
  signOut(): void;
  firebaseAuthAsync(): Promise<firebase.auth.UserCredential>
};

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

const AuthenticationProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<IAuthState>(() => {
    const oauthCrendial = localStorage.getItem('@sisag:token');
    const user = localStorage.getItem('@sisag:user');

    if (oauthCrendial && user) {
      const parsedOauthCredential = JSON.parse(oauthCrendial) as firebase.auth.OAuthCredential;
      api.defaults.headers.authorization = `Bearer ${parsedOauthCredential.idToken}`;
      return { user: JSON.parse(user), oauthCredential: parsedOauthCredential };
    }

    return {} as IAuthState;
  });

  const firebaseAuthAsync = React.useCallback(async (): Promise<firebase.auth.UserCredential> => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return await firebase.auth().signInWithPopup(provider);
  }, []);

  const signIn = React.useCallback(async () => {
    const response = await firebaseAuthAsync();
    const oauthCredential = (response.credential as firebase.auth.OAuthCredential);
    const user = response.additionalUserInfo as IFirebaseAdditionalUserInfo;

    localStorage.setItem('@sisag:token', JSON.stringify(oauthCredential));
    localStorage.setItem('@sisag:user', JSON.stringify(user));

    //TODO: tratamento de erro
    //await api.post('/login', (response.credential as firebase.auth.OAuthCredential).idToken);

    api.defaults.headers.authorization = `Bearer ${oauthCredential.idToken}`;

    setState({ user, oauthCredential });

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
