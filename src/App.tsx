import { Routes, Route } from "react-router-dom";
import "./App.css";
import RootRoute from "./pages/RootRoute/RootRoute";
import MainPage from "./pages/MainPage/MainPage";
import ItemCurrency from "./pages/Item/Item";

function App() {
    return (
        <Routes>
            <Route path="/" element={<RootRoute />}>
                <Route index element={<MainPage />} />
                <Route path="/currencyId" element={<ItemCurrency />} />
            </Route>
        </Routes>
    );
}

export default App;
