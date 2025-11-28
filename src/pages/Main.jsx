import React, { useState } from "react";
import Sidebar from '../components/common/Sidebar';
import MainContent from '../components/common/MainContent';
import './CSS/Main.css';

{/*Imports de las paginas*/}
import SalesPage from './SalesPage';
import ProductsPage from './ProductsPage';
import EmployeeCard from './EmployeeCRUDPage'; 
import EmployeeCRUDPage from "./EmployeeCRUDPage";

function Main() {
    const [selectedPage, setSelectedPage] = useState("Ventas");

    // Esta función recibe el pageName desde el Sidebar
    const handleSelectPage = (pageName) => {
        setSelectedPage(pageName);
    };

    // Aquí decides qué componente mostrar
    const renderPage = () => {
        switch (selectedPage) {
            case "Productos": return <ProductsPage />;
            case "Empleados":  return <EmployeeCRUDPage />;
            default: return <SalesPage />;
        }
    };

    return (
        <div className="dashboard-layout-container">

            {/* Sidebar manda a llamar handleSelectPage */}
            <Sidebar onSelectPage={handleSelectPage} />

            {/* Aquí se carga la página que toque */}
            <MainContent>
                {renderPage()}
            </MainContent>

        </div>
    );
}

export default Main;