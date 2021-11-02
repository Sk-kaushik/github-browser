import { Route, Switch } from "react-router-dom";

import Main from "./pages/Main/Main";
import Commit from "./pages/Commit/Commit";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route exact path="/repo/:repo_name">
          <Main />
        </Route>

        <Route path="/repo/:repo_name/commit/:branch_name*">
          <Commit />
        </Route>
      </Switch>
    </>
  );
}

export default App;
