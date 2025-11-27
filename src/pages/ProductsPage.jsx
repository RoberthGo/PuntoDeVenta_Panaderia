import React from 'react';
import ProductCard from "../components/common/ProductCard";
import BreadButton from "../components/common/BreadButton";
import "./SalesPage.css";

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
                    weight="390g"
                />

                {/* Producto 2 */}
                <ProductCard
                    idProducto={2}
                    nombre="Mt Ida Multigrain"
                    descripcion="Ingredientes: harina integral orgánica, agua filtrada, avena orgánica, cebada orgánica, levadura, sal."
                    precio={6.00}
                    stock={10}
                    imageUrl="ruta/a/imagen2.jpg"
                    weight="300g"
                />

                {/* Producto 3 */}
                <ProductCard
                    idProducto={3}
                    nombre="Four Seed Whole Wheat"
                    descripcion={null}
                    precio={5.00}
                    stock={22}
                    imageUrl="../Images/img-1.jpg"
                    weight="420g"
                />

                {/* Producto 4 */}
                <ProductCard
                    idProducto={4}
                    nombre="Bagel Multigrain"
                    descripcion="Panecillos de granos múltiples."
                    precio={3.00}
                    stock={5}
                    imageUrl="../Images/img-1.jpg"
                    weight="100g"
                />

                {/* Producto 5 */}
                <ProductCard
                    idProducto={5}
                    nombre="Bagel Sesame"
                    descripcion={null}
                    precio={3.00}
                    stock={0}
                    imageUrl="../Images/img-1.jpg"
                    weight="100g"
                />

                {/* Producto 6 */}
                <ProductCard
                    idProducto={6}
                    nombre="Puff Pastry (Strawberry)"
                    descripcion="Hojaldre con fresas frescas."
                    precio={6.00}
                    stock={12}
                    imageUrl="../Images/img-1.jpg"
                    weight="130g"
                />

                {/* Producto 7 */}
                <ProductCard
                    idProducto={7}
                    nombre="French Baguette"
                    descripcion={null}
                    precio={6.00}
                    stock={30}
                    imageUrl="../Images/img-1.jpg"
                    weight="280g"
                />

                {/* Producto 8 */}
                <ProductCard
                    idProducto={8}
                    nombre="Puff Pastry (Raspberry)"
                    descripcion="Hojaldre con frambuesas."
                    precio={6.00}
                    stock={8}
                    imageUrl="../Images/img-1.jpg"
                    weight="130g"
                />

            </div>

        </div>
    );
}

export default Main;
