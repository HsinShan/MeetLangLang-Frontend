import { Button, Input } from 'antd';
import '../../assets/style/login/LoginForm.scss';

function LoginForm(props) {
    let name = '';
    if (props.type === 'login') {
        name = '登入';
    } else {
        name = '註冊';
    }
    return (
        <div className="login-form">
            <header className="login-form-title">會員{name}</header>
            <div className="account">
                <p>
                    <label className="label">帳號</label>
                    <Input type="text" className="accout-text" id="accout-text" placeholder="Username" />
                </p>
            </div>
            <div className="password">
                <p>
                    <label className="label">密碼</label>
                    <Input type="password" className="password-text" id="password-text" placeholder="Password" />
                </p>
            </div>
            <Button className="loginform-button">{name}</Button>
        </div>
    );
}

export default LoginForm;
