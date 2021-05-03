import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserHeader = (props) => {
    const { isLogin, logout } = props;
    const firstName = localStorage.getItem('firstName');
    const { t } = useTranslation();
    return (
        <>
            {(!isLogin) &&
                <Link to='/login'>
                    <Button >
                        {t('login.login')}
                    </Button>
                </Link>
            }
            {(isLogin) &&
                <div>
                    <label className='welcome'>{t('login.welcome')}, {firstName}</label>
                    <Button onClick={() => logout()}>{t('login.logout')}</Button>
                </div>
            }
        </>
    );
};

export default UserHeader;
