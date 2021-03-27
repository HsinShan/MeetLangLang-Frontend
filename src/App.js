import Header from "./components/header";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        {routes.map(({ path, component, ...routes }) => (
          <Route key={path} path={path} component={component} {...routes} />
        ))}
      </Switch>
    </div>
  );
}

export default App;
