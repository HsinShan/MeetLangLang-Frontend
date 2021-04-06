import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header';
import route from './routes';

function App() {
    const [isLogin, setIsLogin] = useState((localStorage.getItem('token') !== null && localStorage.getItem('token') !== ''));
    const logout = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
    };
    const loggedin = (token) => {
        localStorage.setItem('token', token);
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
        </div>
    );
}

export default App;
