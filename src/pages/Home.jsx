import React, { useState } from 'react';

import Sidebar from '../components/common/Header';
import MainContent from '../components/common/MainContent';
import './Home.css'; 

import SalesPage from '../pages/SalesPage';
import SalesChartPage from '../pages/SalesChartPage';
import SalesHistoryPage from '../pages/SalesHistoryPage';
import EmployeeCRUDPage from '../pages/EmployeeCRUDPage';
import AuditTablePage from '../pages/AuditTablePage';
import ProductsCarousel from './ProductsCarousel';

const SECTION_MAP = [
    { id: 'productos', title: 'Productos (Inventario)', component: ProductsCarousel, role: 'general' },
    { id: 'grafico', title: 'Gráfico de Ventas', component: SalesChartPage, role: 'general' },
    { id: 'historial', title: 'Historial de Ventas', component: SalesHistoryPage, role: 'admin' },
    { id: 'empleados', title: 'CRUD de Empleados', component: EmployeeCRUDPage, role: 'admin' },
    { id: 'auditoria', title: 'Tabla de Auditorías', component: AuditTablePage, role: 'admin' },
];

function Home({ userData, onLogout }) { 
    const [activeSectionId, setActiveSectionId] = useState('ventas');
    
    // Use userData.role instead of hardcoded role
    const userRole = userData?.role || 'general';
    
    const availableSections = SECTION_MAP.filter(section => 
        section.role === 'general' || (section.role === 'admin' && userRole === 'admin')
    );

    const activeIndex = availableSections.findIndex(s => s.id === activeSectionId);

    return (
        <>
        <div className="dashboard-layout-container">
            <Sidebar 
                sections={availableSections} 
                activeSectionId={activeSectionId} 
                onSectionClick={setActiveSectionId} 
            />
            <MainContent 
                sections={availableSections} 
                activeIndex={activeIndex} 
            />
        </div>
        </>
    );
}

export default Home;