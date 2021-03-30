import { Switch, Route } from 'react-router-dom';
import Header from './components/header';
import route from './routes';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="content">
                <Switch>
                    {route.map(({ path, component, ...routes }) => (
                        <Route key={path} path={path} component={component} {...routes} />
                    ))}
                </Switch>
            </div>
        </div>
    );
}

export default App;
