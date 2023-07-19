import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Route, Switch } from "wouter";
import Home from "./ui/pages/Home";
import Auth from "./ui/pages/Auth";

function App() {

  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/oauth">
        <Auth />
      </Route>
    </Switch>
  )
}

export default App
