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

interface IFirebaseAdditionalUserInfo extends firebase.auth.AdditionalUserInfo {
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

  const signIn = React.useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const response = await firebase.auth().signInWithPopup(provider);
    const oauthCredential = (response.credential as firebase.auth.OAuthCredential);
    const user = response.additionalUserInfo as IFirebaseAdditionalUserInfo;

    localStorage.setItem('@sisag:token', JSON.stringify(oauthCredential));
    localStorage.setItem('@sisag:user', JSON.stringify(user));

    //TODO: tratamento de erro
    //await api.post('/login', (response.credential as firebase.auth.OAuthCredential).idToken);

    api.defaults.headers.authorization = `Bearer ${oauthCredential.idToken}`;

    setState({ user, oauthCredential });

  }, []);


  const signOut = React.useCallback(async () => {
    localStorage.removeItem('@sisag:token');
    localStorage.removeItem('@sisag:user');
    setState({} as IAuthState);
  }, []);

  return (<AuthContext.Provider value={{ user: state.user, signIn, signOut }}>
    {children}
  </AuthContext.Provider>);
}

function useAuth(): AuthContextData {
  const context = React.useContext(AuthContext);

  return context;
}

export { AuthenticationProvider, useAuth };
