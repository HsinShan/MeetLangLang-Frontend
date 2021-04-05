import '../../assets/style/login/index.scss';
import LoginForm from '../../components/login/LoginForm';

const Login = () => (
    <div className="login-page">
        <div className="left-container">
            <LoginForm type='login' />
        </div>
        <div className="right-container">
            <LoginForm type='register' />
        </div>
    </div>
);

export default Login;
