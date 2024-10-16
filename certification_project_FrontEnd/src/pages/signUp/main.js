import Modal from "../../components/modal"
import SignUp from "./SignUp"
export default function Register(props){
return(
    <Modal
    
    open={props.open}
    handleClose={props.handleClose}
    renderContent={<SignUp handleClose={props.handleClose} />}
    width="40%"
    />
)
}