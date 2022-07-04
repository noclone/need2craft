import Register from "../Register"

function RegisterPage(props){
    return (
        <Register onLogIn={props.onLogIn}/>
    )
}

export default RegisterPage;