import './BreadButton.css';

// Cambiar para que sea el boton y agrege el producto a la tabla de ventas cuando se clickea
function BreadButton({ imageUrl, name, price, weight, onClick }) {
    return (
        <button className="bread-button" onClick={onClick}>
            <div className="bread-button-image">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="bread-button-name">{name}</span>
            <div className="bread-button-info">
                <span className="bread-button-price">${price}</span>
                {weight && <span className="bread-button-weight">{weight}</span>}
            </div>
        </button>
    );
}

export default BreadButton;