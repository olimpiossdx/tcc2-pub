import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Button, Step, StepLabel, Stepper, Typography, TextField, Avatar } from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useAuth } from '../../components/hooks/authentication';
import { useNotifcation } from '../../components/hooks/notification';
import { ApiServiceRequestAsync } from '../../services';

const getSteps = () => {
  return ['Selecionar conta', 'Adicionar código', 'Concluir'];
}

const getStepContent = (stepIndex: number) => {
  switch (stepIndex) {
    case 0:
      return 'Selecione sua conta Google';
    case 1:
      return 'Adicione o código de cadastro';
    case 2:
      return 'Revise suas informações';
    default:
      return 'Passo desconhecido';
  }
}

interface IBottomContetProps {
  activeStep: IActiveStep;
  steps: string[];
  isNext: boolean;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  getStepContent: (stepIndex: number) => string;
  handleSubmitAsync: () => void;
}

const BottomContent: React.FC<IBottomContetProps> = ({ activeStep, steps, isNext, handleNext, handleBack, handleReset, getStepContent, handleSubmitAsync }) => {
  return (<Grid item>
    {activeStep.active === steps.length ?
      (<>
        <Button onClick={handleReset} variant='outlined' size='small'>Novo cadastro</Button>
        &nbsp;
        <Button onClick={handleReset} variant='outlined' size='small' component={Link} to='/'>Logar</Button>
      </>) :
      (<>
        <Typography >{getStepContent(activeStep.active)}</Typography>
        <Button variant='outlined' disabled={activeStep.active === 0} onClick={handleBack} size='small' >
          Voltar
        </Button>
        &nbsp;
        {activeStep.active === steps.length - 1 ?
          (<Button variant='outlined' color='primary' onClick={handleSubmitAsync} size='small' disabled={isNext}>
            Concluir
          </Button>) :
          (<Button variant='outlined' color='primary' onClick={handleNext} size='small' disabled={isNext}>
            Próxmo
          </Button>)}
      </>)}
  </Grid>);
};

interface IUser {
  id: string;
  nome: string;
  email: string;
  urlImg: undefined | string;
  accessKey: string;
}

interface MainContentProps {
  activeStep: IActiveStep;
  steps: string[];
  user: IUser
  setUser(user: IUser): void;
  handleNext(): void;
};

const MainContent: React.FC<MainContentProps> = ({ activeStep, steps, user, handleNext, setUser }) => {
  const { addNotification } = useNotifcation();
  const { firebaseAuthAsync } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const handleFirebaseAuthAasync = async () => {
    setLoading(true)
    const response = await firebaseAuthAsync();
    console.log('user', response.user);
    if (response.user) {
      const providerUserData = response.user?.providerData[0];
      setUser({
        ...user,
        id: providerUserData?.uid as string,
        nome: providerUserData?.displayName as string,
        email: providerUserData?.email as string,
        urlImg: providerUserData?.photoURL as string
      });
      handleNext();
    } else {
      addNotification({ tipo: 'error', descricao: 'Não foi possível carregar os dados, tente novamente' });
    }
    setLoading(false);
  }

  const stepContent = () => {
    switch (activeStep.active) {
      case 0:
        return (<>
          <Typography variant='subtitle1'>Cadastre-se com sua Google</Typography>
          <div style={{ position: 'relative', margin: 8 }}>
            <Button variant='outlined' size='small' onClick={handleFirebaseAuthAasync} disabled={loading}>Adicionar conta Google</Button>
            {loading && <CircularProgress size={19} style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -9, marginLeft: -12 }} />}
          </div>
        </>);

      case 1:
        return (<Grid container spacing={2} justifyContent='space-evenly'>
          <Grid item xs={12}>
            <Grid container spacing={1} justifyContent='center' alignItems='center'>
              <Grid item>
                {user.urlImg ? <Avatar alt={user.nome} src={user.urlImg} /> : <AccountCircle fontSize='large' />}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1} justifyContent='center' alignItems='center'>
              <Grid item>
                <PersonIcon fontSize='small' />
              </Grid>
              <Grid item>
                <TextField id='input-name' label='Nome' value={user.nome} size='small' disabled />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1} justifyContent='center' alignItems='center'>
              <Grid item>
                <EmailIcon fontSize='small' />
              </Grid>
              <Grid item>
                <TextField id='input-email' label='E-maili' value={user.email} size='small' disabled />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1} justifyContent='center' alignItems='center'>
              <Grid item>
                <VpnKeyIcon fontSize='small' />
              </Grid>
              <Grid item>
                <TextField
                  id='input-key-rfid'
                  label='Código rfid'
                  size='small'
                  value={user.accessKey}
                  onChange={e => setUser({ ...user, accessKey: e.target.value })}
                  error={activeStep.error}
                  helperText={activeStep.message}
                  required />
              </Grid>
            </Grid>
          </Grid>

        </ Grid>);

      case 2:
        return (<Grid container spacing={2} justifyContent='space-evenly'>
          <Grid item xs={12}>
            <Grid container spacing={1} justifyContent='center' alignItems='center'>
              <Grid item>
                <Typography>Revise antes de concluir cadastro</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1} justifyContent='center' alignItems='center'>
              <Grid item>
                {user.urlImg ? <Avatar alt={user.nome} src={user.urlImg} /> : <AccountCircle fontSize='large' />}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1} justifyContent='center' alignItems='center'>
              <Grid item>
                <PersonIcon />
              </Grid>
              <Grid item>
                <TextField id='input-name' label='Nome' value={user.nome} size='small' disabled />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1} justifyContent='center' alignItems='center'>
              <Grid item>
                <EmailIcon />
              </Grid>
              <Grid item>
                <TextField id='input-email' label='E-maili' value={user.email} size='small' disabled />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1} justifyContent='center' alignItems='center' >
              <Grid item>
                <VpnKeyIcon />
              </Grid>
              <Grid item>
                <TextField id='input-key-rfid' value={user.accessKey} label='Código da tag rfid' size='small' disabled />
              </Grid>
            </Grid>
          </Grid>

        </ Grid>);

      case 3:
        return (<Grid container spacing={1} justifyContent='space-evenly'>
          <Grid item xs={12}>
            <Grid container spacing={1} justifyContent='center' alignItems='center'>
              <Grid item>
                <Typography>Registro concluido com sucesso !</Typography>
              </Grid>
            </Grid>
          </Grid>
        </ Grid>);
      default:
        return;
    };
  };

  return (<Grid item xs={12}>
    <Grid container justifyContent='center' style={{ margin: 10 }}>
      <Grid item>
        {stepContent()}
      </Grid>
    </Grid>
    <Stepper activeStep={activeStep.active} alternativeLabel>
      {steps.map((label) => (<Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>))}
    </Stepper>
  </Grid>);
};

interface IActiveStep {
  active: number;
  error: boolean;
  message: string;
}

const Cadastro: React.FC = () => {
  const { addNotification } = useNotifcation();
  const [user, setUser] = React.useState<IUser>({ accessKey: '' } as IUser);
  const [activeStep, setActiveStep] = React.useState<IActiveStep>({ active: 0, error: false, message: '' });
  const steps = getSteps();

  // TODO: validar campos obrigatório
  const handleNext = React.useCallback(() => {
    setActiveStep((prevActiveStep) => {
      if ((prevActiveStep.active + 1) === 2 && (user.accessKey.length < 8)) {
        return { ...prevActiveStep, error: true, message: 'Adicione chave do cartão RFID' };
      }

      return ({ ...activeStep, error: false, message: '', active: prevActiveStep.active + 1 });
    });

    if (activeStep.active === steps.length - 1) {
      setUser({} as IUser);
    }
  }, [activeStep, user, steps]);

  const handleBack = React.useCallback(() => {
    setActiveStep((prevActiveStep) => ({ ...activeStep, active: prevActiveStep.active - 1 }));
  }, [activeStep]);

  const handleReset = React.useCallback(() => {
    setActiveStep(() => ({ ...activeStep, active: 0 }));
  }, [activeStep]);

  const isNext = () => !(Object.keys(user).length > 1);

  const handleSubmitAsync = async () => {
    const response = await ApiServiceRequestAsync({ method: 'post', url: 'usuarios', data: user }, () => { }, addNotification);
    if (!('status' in response)) {
      setActiveStep((prevActiveStep) => ({ ...activeStep, active: prevActiveStep.active + 1 }));
    };
  };

  return (<Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
    <Grid item xs={11} sm={6} component={Paper} style={{ padding: '1%' }}>
      <Grid container spacing={1}>
        <MainContent
          activeStep={activeStep} steps={steps} user={user}
          handleNext={handleNext} setUser={setUser} />

        <BottomContent
          activeStep={activeStep} steps={steps} isNext={isNext()}
          handleNext={handleNext} handleBack={handleBack}
          handleReset={handleReset} getStepContent={getStepContent}
          handleSubmitAsync={handleSubmitAsync} />
      </Grid>
    </Grid>
  </Grid>);
}

export default Cadastro;
