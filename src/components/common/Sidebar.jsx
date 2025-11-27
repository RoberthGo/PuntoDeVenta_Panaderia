import React from 'react';
import './Sidebar.css';

function Sidebar() {
    return (
        <nav className="sidebar">

            <h1 className="app-logo">Panaderia Wum Bao</h1>

            <ul className="nav-list">
                <li className="nav-item active">
                    <span className="nav-icon"></span>
                    Home
                </li>

                <li className="nav-item">
                    <span className="nav-icon">🛒</span>
                    Ventas
                </li>

                <li className="nav-item">
                    <span className="nav-icon">📦</span>
                    Productos
                </li>

                <li className="nav-item">
                    <span className="nav-icon">📊</span>
                    Gráfico
                </li>

                <li className="nav-item">
                    <span className="nav-icon">📜</span>
                    Historial
                </li>

                <li className="nav-item">
                    <span className="nav-icon">👥</span>
                    Empleados
                </li>

                <li className="nav-item">
                    <span className="nav-icon">🔒</span>
                    Auditorías
                </li>
            </ul>

        </nav>
    );
}

export default Sidebar;
