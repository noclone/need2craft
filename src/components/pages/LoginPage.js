import Login from "../Login";

function LoginPage(props){
    return (
        <Login onLogIn={props.onLogIn}/>
    )
}

export default LoginPage;