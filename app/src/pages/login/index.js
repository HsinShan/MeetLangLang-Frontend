const Login = () => (
    <div className="login_page">
        <div className="left_container">
            <div className="login_form">
                <header className="login_form_title">會員登入</header>
                <div className="account">
                    <p>
                        <label className="account_label">帳號</label>
                        <input type="text" className="accout_text" id="accout_text" placeholder="Username" />
                    </p>
                </div>
                <div className="password">
                    <p>
                        <label className="password_label">密碼</label>
                        <input type="text" className="password_text" id="password_text" placeholder="Password" />
                    </p>
                </div>
                <button className="login_button">登入</button>
            </div>
        </div>
        <div className="right_container">
            <div className="register_form">
                <header className="register_form_title">會員註冊</header>
                <div className="account">
                    <p>
                        <label className="account_label">帳號</label>
                        <input type="text" className="accout_text" id="accout_text" placeholder="Username" />
                    </p>
                </div>
                <div className="password">
                    <p>
                        <label className="password_label">密碼</label>
                        <input type="text" className="password_text" id="password_text" placeholder="Password" />
                    </p>
                </div>
                <button className="register_button">註冊</button>
            </div>
        </div>
    </div>
);

export default Login;
