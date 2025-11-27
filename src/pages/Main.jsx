import React from 'react';

import Sidebar from '../components/common/Sidebar';
import MainContent from '../components/common/MainContent';
import './Main.css';

import SalesPage from './SalesPage';
//import ProductsPage from './ProductsPage';
//import SalesChartPage from './SalesChartPage';
//import SalesHistoryPage from './SalesHistoryPage';
//import EmployeeCRUDPage from './EmployeeCRUDPage';
//import AuditTablePage from './AuditTablePage';

function Main() {
    return (
        <div className="dashboard-layout-container">

            {/* Barra lateral (estática por ahora) */}
            <Sidebar />

            {/* Contenido principal */}
            <MainContent>
                {/* Página por defecto: Home */}
                {/*Parte de leo @leneza41 */}
                <div className="home-container" style={{ textAlign: 'center', padding: '40px' }}>
                    <h1 style={{ color: 'white' }}>Home</h1>

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1946/1946436.png"
                        alt="Home Icon"
                        style={{
                            width: '160px',
                            filter: 'invert(1)',
                            opacity: 0.9,
                            marginTop: '20px'
                        }}
                    />
                </div>
            </MainContent>

        </div>
    );
}

export default Main;
