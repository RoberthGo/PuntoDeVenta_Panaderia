import React, { useState } from "react";
import Sidebar from '../components/common/Sidebar';
import MainContent from '../components/common/MainContent';
import './CSS/Main.css';
import { authService } from '../services';

import SalesPage from './SalesPage';
import ProductsPage from './ProductsPage';
import EmployeeCRUDPage from "./EmployeeCRUDPage";
import SalesHistoryPage from "./SalesHistoryPage";
import AuditTablePage from "./AuditTablePage";
import SalesChartPage from "./SalesChartPage";

/**
 * Layout principal de la aplicación.
 * Renderiza el Sidebar y la página activa según la selección del usuario.
 * @param {Object} props
 * @param {Function} props.onLogout - Callback para cerrar sesión
 * @returns {JSX.Element}
 */
function Main({ onLogout }) {
    const [selectedPage, setSelectedPage] = useState("Ventas");
    const isAdmin = authService.isAdmin();

    /** @param {string} pageName - Nombre de la página a mostrar */
    const handleSelectPage = (pageName) => {
        setSelectedPage(pageName);
    };

    /** Renderiza la página según la selección y permisos del usuario */
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
            <Sidebar onSelectPage={handleSelectPage} onLogout={onLogout} isAdmin={isAdmin} />
            <MainContent>
                {renderPage()}
            </MainContent>
        </div>
    );
}

export default Main;