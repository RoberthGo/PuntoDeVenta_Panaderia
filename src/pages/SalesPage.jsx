import BreadButton from "../components/common/BreadButton";
import ProductCard from "../components/common/ProductCard";
import "./SalesPage.css";

// Datos simulados
const PRODUCTOS_MOCK = [
    {
        idProducto: 1,
        nombre: "Whole Grain Spelt",
        descripcion: null,
        precio: 6.00,
        stock: 15,
        costo: 3.50,
        imageUrl: "../Images/img-1.jpg",
        weight: "390g"
    },
    {
        idProducto: 2,
        nombre: "Mt Ida Multigrain",
        descripcion: "Ingredientes: harina integral orgánica, agua filtrada, avena orgánica, cebada orgánica, levadura, sal.",
        precio: 6.00,
        stock: 10,
        costo: 3.00,
        imageUrl: "ruta/a/imagen2.jpg",
        weight: "300g"
    },
    {
        idProducto: 3,
        nombre: "Four Seed Whole Wheat",
        descripcion: null,
        precio: 5.00,
        stock: 22,
        costo: 2.50,
        imageUrl: "../Images/img-1.jpg",
        weight: "420g"
    },
    {
        idProducto: 4,
        nombre: "Bagel Multigrain",
        descripcion: "Panecillos de granos múltiples.",
        precio: 3.00,
        stock: 5,
        costo: 1.50,
        imageUrl: "../Images/img-1.jpg",
        weight: "100g"
    },
    {
        idProducto: 5,
        nombre: "Bagel Sesame",
        descripcion: null,
        precio: 3.00,
        stock: 0,
        costo: 1.50,
        imageUrl: "../Images/img-1.jpg",
        weight: "100g"
    },
    {
        idProducto: 6,
        nombre: "Puff Pastry (Strawberry)",
        descripcion: "Hojaldre con fresas frescas.",
        precio: 6.00,
        stock: 12,
        costo: 4.00,
        imageUrl: "../Images/img-1.jpg",
        weight: "130g"
    },
    {
        idProducto: 7,
        nombre: "French Baguette",
        descripcion: null,
        precio: 6.00,
        stock: 30,
        costo: 3.50,
        imageUrl: "../Images/img-1.jpg",
        weight: "280g"
    },
    {
        idProducto: 8,
        nombre: "Puff Pastry (Raspberry)",
        descripcion: "Hojaldre con frambuesas.",
        precio: 6.00,
        stock: 8,
        costo: 4.00,
        imageUrl: "../Images/img-1.jpg",
        weight: "130g"
    },
];

function Main() {
    return (
        <div className="sales-page-container">
            <h1 style={{color: 'white', textAlign: 'center'}}> Menu de panes Wum bao</h1>

            <div className="bread-grid">
                {PRODUCTOS_MOCK.map(product => (
                    <ProductCard 
                        key={product.idProducto}
                        idProducto={product.idProducto}
                        nombre={product.nombre}
                        precio={product.precio}
                        weight={product.weight}
                        descripcion={product.descripcion}
                        imageUrl={product.imageUrl}
                        stock={product.stock}
                    />
                ))}
            </div>

            <BreadButton 
                imageUrl="https://th.bing.com/th/id/R.cf379560878e5cf74c383124bb013478?rik=yTH5vF2Vq52zyA&pid=ImgRaw&r=0" 
                name="Cheems" 
                price="41.69" 
                onClick={() => alert('Bonk!')}
            />
        </div>
    );
}

export default Main;