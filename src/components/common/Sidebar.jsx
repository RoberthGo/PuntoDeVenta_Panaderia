import React, { useState } from 'react';
import './CSS/Sidebar.css';

function Sidebar({ onSelectPage }) {

    const [activeItem, setActiveItem] = useState("Ventas");

    const handleClick = (pageName) => {
        setActiveItem(pageName);       
        onSelectPage(pageName);
    };

    return (
        <nav className="sidebar">
            <h1 className="app-logo">Panaderia Wum Bao</h1>

            <ul className="nav-list">
                <li
                    className={`nav-item ${activeItem === "Ventas" ? "active" : ""}`}
                    onClick={() => handleClick("Ventas")}
                >
                    <span className="nav-icon">🛒</span>
                    Ventas
                </li>

                <li
                    className={`nav-item ${activeItem === "Productos" ? "active" : ""}`}
                    onClick={() => handleClick("Productos")}
                >
                    <span className="nav-icon">📦</span>
                    Productos
                </li>

                <li
                    className={`nav-item ${activeItem === "Gráfico" ? "active" : ""}`}
                    onClick={() => handleClick("Gráfico")}
                >
                    <span className="nav-icon">📊</span>
                    Gráfico
                </li>

                <li
                    className={`nav-item ${activeItem === "Historial" ? "active" : ""}`}
                    onClick={() => handleClick("Historial")}
                >
                    <span className="nav-icon">📜</span>
                    Historial
                </li>

                <li
                    className={`nav-item ${activeItem === "Empleados" ? "active" : ""}`}
                    onClick={() => handleClick("Empleados")}
                >
                    <span className="nav-icon">👥</span>
                    Empleados
                </li>

                <li
                    className={`nav-item ${activeItem === "Auditorías" ? "active" : ""}`}
                    onClick={() => handleClick("Auditorías")}
                >
                    <span className="nav-icon">🔒</span>
                    Auditorías
                </li>

            </ul>
        </nav>
    );
}

export default Sidebar;
