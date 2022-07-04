import Register from "../Register"

function RegisterPage(props){
    return (
        <Register onRegister={props.onRegister}/>
    )
}

export default RegisterPage;