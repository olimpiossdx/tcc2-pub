import React from 'react';

import { Grid, Paper, Button, Step, StepLabel, Stepper, Typography, TextField, Avatar } from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { IFirebaseAdditionalUserInfo, useAuth } from '../../components/hooks/authentication';

function getSteps() {
  return ['Selecionar conta', 'Adicionar código', 'Concluir'];
}

function getStepContent(stepIndex: number) {
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
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  getStepContent: (stepIndex: number) => string;
}

const BottomContent: React.FC<IBottomContetProps> = ({ activeStep, steps, handleNext, handleBack, handleReset, getStepContent }) => {
  return (<Grid item>
    {activeStep.active === steps.length ?
      (<Button onClick={handleReset} variant='outlined' size='small'>Novo cadastro</Button>) :
      (<>
        <Typography >{getStepContent(activeStep.active)}</Typography>
        <Button variant='outlined' disabled={activeStep.active === 0} onClick={handleBack} size='small' >
          Voltar
        </Button>
        &nbsp;
        <Button variant='outlined' color='primary' onClick={handleNext} size='small'>
          {activeStep.active === steps.length - 1 ? 'Concluir' : 'Próxmo'}
        </Button>
      </>)}
  </Grid>);
};

interface MainContentProps {
  activeStep: IActiveStep;
  steps: string[];
  acessKey: string;
  setAcessKey(acessKey: string): void;
  handleNext(): void;
};

interface IUser {
  nome: string;
  email: string;
  urlImg: undefined | string;
}

const MainContent: React.FC<MainContentProps> = ({ activeStep, steps, acessKey, setAcessKey, handleNext }) => {
  const [user, setUser] = React.useState<IUser>({ nome: '', email: '', urlImg: undefined });
  const { firebaseAuthAsync } = useAuth();

  const handleFirebaseAuthAasync = async () => {
    const response = await firebaseAuthAsync();
    console.log((response.additionalUserInfo as IFirebaseAdditionalUserInfo).profile);
    const { profile } = (response.additionalUserInfo as IFirebaseAdditionalUserInfo);
    setUser({ nome: profile.given_name, email: profile.email, urlImg: profile.picture })
    handleNext();
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

          <Grid item >
            <Grid container spacing={1} alignItems='center'>
              <Grid item>
                <PersonIcon fontSize='small' />
              </Grid>
              <Grid item>
                <TextField id='input-name' label='Nome' value={user.nome} size='small' disabled />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={1} alignItems='center'>
              <Grid item>
                <EmailIcon fontSize='small' />
              </Grid>
              <Grid item>
                <TextField id='input-email' label='E-maili' value={user.email} size='small' disabled />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={1} alignItems='center' >
              <Grid item>
                <VpnKeyIcon fontSize='small' />
              </Grid>
              <Grid item>
                <TextField
                  id='input-key-rfid'
                  label='Código rfid'
                  size='small'
                  onChange={e => setAcessKey(e.target.value)}
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

          <Grid item >
            <Grid container spacing={1} alignItems='center'>
              <Grid item>
                <PersonIcon />
              </Grid>
              <Grid item>
                <TextField id='input-name' label='Nome' value={user.nome} size='small' disabled />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={1} alignItems='center'>
              <Grid item>
                <EmailIcon />
              </Grid>
              <Grid item>
                <TextField id='input-email' label='E-maili' value={user.email} size='small' disabled />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={1} alignItems='center' >
              <Grid item>
                <VpnKeyIcon />
              </Grid>
              <Grid item>
                <TextField id='input-key-rfid' value={acessKey} label='Código da tag rfid' size='small' disabled />
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
  const [activeStep, setActiveStep] = React.useState<IActiveStep>({ active: 0, error: false, message: '' });
  const [acessKey, setAcessKey] = React.useState('');
  const steps = getSteps();

  // TODO: validar campos obrigatório
  const handleNext = () => {

    setActiveStep((prevActiveStep) => {
      if ((prevActiveStep.active + 1) === 2 && !acessKey) {
        return prevActiveStep;
      }
      return ({ ...activeStep, active: prevActiveStep.active + 1 });
    });


    if (activeStep.active === steps.length - 1) {
      //TODO: finalizar processo de cadastrar usuário
      alert('cadastro concluido!')
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => ({ ...activeStep, active: prevActiveStep.active - 1 }));
  };

  const handleReset = () => {
    setActiveStep((prevActiveStep) => ({ ...activeStep, active: 0 }));
  };

  return (
    <Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
      <Grid item xs={11} sm={6} component={Paper} style={{ padding: '1%' }}>
        <Grid container spacing={1}>
          <MainContent activeStep={activeStep} steps={steps} acessKey={acessKey} setAcessKey={setAcessKey} handleNext={handleNext} />
          <BottomContent
            activeStep={activeStep} steps={steps}
            handleNext={handleNext} handleBack={handleBack}
            handleReset={handleReset} getStepContent={getStepContent} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Cadastro;
