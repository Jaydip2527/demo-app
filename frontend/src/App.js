import { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider from react-redux
import { NOTFOUND, LIST, SIGNIN, SIGNUP, FORM } from "./routes";
import Registration from "./components/Registration";
import Login from "./components/Login";
import NotFound from "./components/notfound";
import List from "./components/List";
import Form from "./components/Form";
import store from "./redux/store"; // Import Redux store
import { ProtectedRoute  } from "./utils/ProtectedRoute"; // Import Auth component(protected)
import { PublicRoute } from "./utils/PublicRoute"; // Import Auth component(public)
import "./App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Fragment>
      <Provider store={store}> {/* Wrap components with Provider */}
        <BrowserRouter>
          <Routes>
            {/* Public Routes (only accessible when not logged in) */}
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Login />} />
              <Route path={SIGNIN} element={<Login />} />
              <Route path={SIGNUP} element={<Registration />} />
            </Route>

            {/* Protected Routes (only accessible when logged in) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" exact element={<List />} />
              <Route path={LIST} element={<List />} />
              <Route path={FORM} element={<Form />} />
            </Route>
            
            {/* Always accessible routes */}
            <Route path={NOTFOUND} element={<NotFound />} />
            <Route path="*" element={<Navigate to={NOTFOUND} replace />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default App;
