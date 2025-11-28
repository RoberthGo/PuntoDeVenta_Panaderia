import React from 'react';
import ProductCard from "../components/common/ProductCard";
import "./CSS/SalesPage.css";

function Main() {
    return (
        <div className="products-page-container">
            <h1 style={{ color: 'white', textAlign: 'center' }}>
                Menu de panes Wum bao
            </h1>

            <div className="bread-grid">

                {/* Producto 1 */}
                <ProductCard
                    idProducto={1}
                    nombre="Whole Grain Spelt"
                    descripcion={null}
                    precio={6.00}
                    stock={15}
                    imageUrl="../Images/img-1.jpg"
                />

                {/* Producto 2 */}
                <ProductCard
                    idProducto={2}
                    nombre="Mt Ida Multigrain"
                    descripcion="Ingredientes: harina integral orgánica, agua filtrada, avena orgánica, cebada orgánica, levadura, sal."
                    precio={6.00}
                    imageUrl="ruta/a/imagen2.jpg"
                    stock={10}
                />

                {/* Producto 3 */}
                <ProductCard
                    idProducto={3}
                    nombre="Four Seed Whole Wheat"
                    descripcion={null}
                    precio={5.00}
                    imageUrl="../Images/img-1.jpg"
                    stock={22}
                />

                {/* Producto 4 */}
                <ProductCard
                    idProducto={4}
                    nombre="Bagel Multigrain"
                    descripcion="Panecillos de granos múltiples."
                    precio={3.00}
                    imageUrl="../Images/img-1.jpg"
                    stock={5}
                />

                {/* Producto 5 */}
                <ProductCard
                    idProducto={5}
                    nombre="Bagel Sesame"
                    descripcion={null}
                    precio={3.00}
                    imageUrl="../Images/img-1.jpg"
                    stock={0}
                />

                {/* Producto 6 */}
                <ProductCard
                    idProducto={6}
                    nombre="Puff Pastry (Strawberry)"
                    descripcion="Hojaldre con fresas frescas."
                    precio={6.00}
                    imageUrl="../Images/img-1.jpg"
                    stock={12}
                />

                {/* Producto 7 */}
                <ProductCard
                    idProducto={7}
                    nombre="French Baguette"
                    descripcion={null}
                    precio={6.00}
                    imageUrl="../Images/img-1.jpg"
                    stock={30}
                />

                {/* Producto 8 */}
                <ProductCard
                    idProducto={8}
                    nombre="Puff Pastry (Raspberry)"
                    descripcion="Hojaldre con frambuesas."
                    precio={6.00}
                    imageUrl="../Images/img-1.jpg"
                    stock={8}
                />

            </div>

        </div>
    );
}

export default Main;
