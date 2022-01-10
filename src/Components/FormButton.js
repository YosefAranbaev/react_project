import FormField from "./FormField";
// import AccessPlusIcon from '@material-ui/icons/AccessAlarm';
const FormButton = (props) => {
    const button = {
        position: 'absolute',
        width: '52px',
        height: '52px',
        backgroundColor: '#F86549',
        borderRadius: '26px',
        borderStyle: 'none',
        marginLeft: '1055px',
        marginTop: '640px',
        fontSize: '45px',
        textAlign: 'center',
        color:'white',

    }
    return (
        <button onClick={props.onClick} style={button}>+</button>
    );
};
export default FormButton;