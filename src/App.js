import Header from "./components/header";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Switch>
          {routes.map(({ path, component, ...routes }) => (
            <Route key={path} path={path} component={component} {...routes} />
          ))}
        </Switch>
      </div>
    </div>
  );
}

export default App;
