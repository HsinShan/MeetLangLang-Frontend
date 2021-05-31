import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import route from './routes';

function App() {
    const [isLogin, setIsLogin] = useState((localStorage.getItem('token') !== null && localStorage.getItem('token') !== ''));
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('fullName');
        setIsLogin(false);
    };
    const loggedin = (token, firstName, fullName) => {
        localStorage.setItem('token', token);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('fullName', fullName);
        setIsLogin(true);
    };
    return (
        <div className="App">
            <Header
                isLogin={isLogin}
                logout={logout}
            />
            <div className="content">
                <Switch>
                    {route.map(({ path, component, ...routes }) => (
                        <Route
                            key={path}
                            path={path}
                            component={() => component({ isLogin, loggedin })}
                            {...routes}
                        />
                    ))}
                </Switch>
            </div>
            <Footer />
        </div>
    );
}

export default App;
