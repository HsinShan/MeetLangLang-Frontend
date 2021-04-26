import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserHeader = (props) => {
    const { isLogin, logout } = props;
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
                <Button onClick={() => logout()}>{t('login.logout')}</Button>
            }
        </>
    );
};

export default UserHeader;
