import { Routes, Route } from "react-router-dom";
import { path } from "./untils/constant";
import { Home, Login } from "./containers/Public";
function App() {
    return (
        <div className="bg-primary">
            <Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route path={path.LOGIN} element={<Login />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
