import React, { useState } from "react";
import Sidebar from '../components/common/Sidebar';
import MainContent from '../components/common/MainContent';
import './CSS/Main.css';
import { authService } from '../services';

{/*Imports de las paginas*/}
import SalesPage from './SalesPage';
import ProductsPage from './ProductsPage';
import EmployeeCRUDPage from "./EmployeeCRUDPage";
import SalesHistoryPage from "./SalesHistoryPage";
import AuditTablePage from "./AuditTablePage";
import SalesChartPage from "./SalesChartPage";

function Main({ onLogout }) {
    const [selectedPage, setSelectedPage] = useState("Ventas");
    const userRole = authService.getUserRole();
    const isAdmin = authService.isAdmin();

    // Esta función recibe el pageName desde el Sidebar
    const handleSelectPage = (pageName) => {
        setSelectedPage(pageName);
    };

    // Aquí decides qué componente mostrar
    // Los empleados solo pueden ver Ventas e Historial
    const renderPage = () => {
        switch (selectedPage) {
            case "Productos": 
                return isAdmin ? <ProductsPage /> : <SalesPage />;
            case "Empleados":  
                return isAdmin ? <EmployeeCRUDPage /> : <SalesPage />;
            case "Historial": 
                return <SalesHistoryPage />;
            case "Auditorias": 
                return isAdmin ? <AuditTablePage /> : <SalesPage />;
            case "Comparativo": 
                return isAdmin ? <SalesChartPage /> : <SalesPage />;
            default: 
                return <SalesPage />;
        }
    };

    return (
        <div className="dashboard-layout-container">

            {/* Sidebar manda a llamar handleSelectPage */}
            <Sidebar onSelectPage={handleSelectPage} onLogout={onLogout} isAdmin={isAdmin} />

            {/* Aquí se carga la página que toque */}
            <MainContent>
                {renderPage()}
            </MainContent>

        </div>
    );
}

export default Main;