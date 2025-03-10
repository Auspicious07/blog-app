import { useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  height: 48px;
`;
const SignupButton = styled(Button)`
    box-shadow: 0 2px 4px 0 rgb(0 0 0 /0.2);
    color: #2874f0
    border-radius: 2px;
    height: 48px;
`;
const Text = styled(Typography)`
  color: #878787;
`;
const Error=styled(Typography)`
  font-size:10px;
  color:#ff6161;
  line-height:0;
  margin-top:10px;
  font-weight:600;
`
const loginInitialValues={
  name:'',
  password:''
}

const signupInitialValues={
  name:'',
  username:'',
  password:''
}

const imageURL =
  "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

const Login = ({isUserAuthenticated}) => {
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup]=useState(signupInitialValues);
  const [error, setError]=useState('');
  const [login, setLogin]=useState(loginInitialValues);

  const {setAccount} = useContext(DataContext);
  const navigate=useNavigate(); 

    const toggleSignup = () => {
    toggleAccount("signup");
  };

  const onInputChange=(e)=>{
    setSignup({...signup,[e.target.name]:e.target.value});
  }

  const signupUser= async ()=>{
    let response= await API.userSignup(signup);
    if(response.isSuccess){
      setError('');
      setSignup(signupInitialValues);
      toggleAccount('login')
    }else{
      setError('Something went wrong! Please try again later ')
    }
  }

  const onValueChange =(e)=>{
    setLogin({...login, [e.target.name]:e.target.value})
  }

  const loginUser= async()=>{
    let response=await API.userLogin(login)
    if(response.isSuccess){
      setError('');


      sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
      sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

      setAccount({username: response.data.username, name: response.data.name}); 

      isUserAuthenticated(true);
      navigate('/');
    }else{
      setError('Something went wrong! Please try again later!');
    }
  }
  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="Login" />
        {account === "login" ? (
          <Wrapper>
            <TextField variant="standard" value={login.username} onChange={(e)=>onValueChange(e)} name="username" label="Enter username" />
            <TextField variant="standard" value={login.password} onChange={(e)=>onValueChange(e)} name="password" label="Enter password" />
            <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton onClick={() => toggleSignup()}>
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='name' label="Enter name" />
            <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='username' label="Enter username" />
            <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='password' label="Enter password" />
            {error && <Error>{error}</Error>}
            <SignupButton onClick={()=>signupUser()}>Sign up</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleAccount("login")}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
