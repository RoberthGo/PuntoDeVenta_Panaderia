import './BreadButton.css';

// Cambiar para que sea el boton y agrege el producto a la tabla de ventas cuando se clickea
function BreadButton({ imageUrl, name, price, onClick }) {
    return (
        <button className="bread-button" onClick={onClick}>
            <div className="bread-button-image">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="bread-button-name">{name}</span>
            <span className="bread-button-price">${price}</span>
        </button>
    );
}

export default BreadButton;