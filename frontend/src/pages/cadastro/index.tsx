import React from 'react';
import { AxiosError } from 'axios';
import { Grid, Paper, Button, Step, StepLabel, Stepper, Typography, TextField, Avatar } from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { useAuth } from '../../components/hooks/authentication';
import api from '../../services';
import { useNotifcation } from '../../components/hooks/notification';

const getSteps = () => {
  return ['Selecionar conta', 'Adicionar código', 'Concluir'];
}

const getStepContent = (stepIndex: number) => {
  switch (stepIndex) {
    case 0:
      return 'Selecione sua conta google';
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
      (<Button onClick={handleReset} variant='outlined' size='small'>Novo cadastro</Button>) :
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
  nome: string;
  email: string;
  id: string;
  urlImg: undefined | string;
  acessKey: string;
}

interface MainContentProps {
  activeStep: IActiveStep;
  steps: string[];
  user: IUser
  setUser(user: IUser): void;
  handleNext(): void;
};

const MainContent: React.FC<MainContentProps> = ({ activeStep, steps, user, handleNext, setUser }) => {
  const { firebaseAuthAsync } = useAuth();

  const handleFirebaseAuthAasync = async () => {
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
    }
  }

  const stepContent = () => {
    switch (activeStep.active) {
      case 0:
        return (<>
          <Typography variant='subtitle1'>Cadastre-se com sua Google</Typography>
          <Button variant='outlined' size='small' onClick={handleFirebaseAuthAasync}>Adicionar conta Google</Button>
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
                  value={user.acessKey}
                  onChange={e => setUser({ ...user, acessKey: e.target.value })}
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
                <TextField id='input-key-rfid' value={user.acessKey} label='Código da tag rfid' size='small' disabled />
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
  const [user, setUser] = React.useState<IUser>({ acessKey: '' } as IUser);
  const [activeStep, setActiveStep] = React.useState<IActiveStep>({ active: 0, error: false, message: '' });
  const steps = getSteps();

  // TODO: validar campos obrigatório
  const handleNext = React.useCallback(() => {
    setActiveStep((prevActiveStep) => {
      if ((prevActiveStep.active + 1) === 2 && (user.acessKey.length < 8)) {
        return { ...prevActiveStep, error: true, message: 'Adicione chave do cartão RFID' };
      }

      return ({ ...activeStep, error: false, message: '', active: prevActiveStep.active + 1 });
    });

    if (activeStep.active === steps.length - 1) {
      //TODO: finalizar processo de cadastrar usuário
      // setUser({} as IUser);

    }
  }, [activeStep, user, steps]);

  const handleBack = React.useCallback(() => {
    setActiveStep((prevActiveStep) => ({ ...activeStep, active: prevActiveStep.active - 1 }));
  }, [activeStep]);

  const handleReset = React.useCallback(() => {
    setActiveStep(() => ({ ...activeStep, active: 0 }));
  }, [activeStep]);

  const isNext = () => !(Object.keys(user).length > 1);

  const handleSubmitAsync = () => {
    api.post('usuario', user)
      .then(response => {
        setActiveStep((prevActiveStep) => ({ ...activeStep, active: prevActiveStep.active + 1 }));
      }).catch((error: AxiosError) => {
        //TODO: tratar menssagem de erro no cadastro
        console.log(error);
        if (error.response?.status === 401) {
          addNotification({ tipo: 'error', descricao: 'Não foi possível cadastrar' });
        }
        addNotification({ tipo: 'error', descricao: 'Caso erro persista contacte o suporte' });
      });
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
