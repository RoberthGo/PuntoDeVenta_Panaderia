import React, { useEffect, useState } from 'react';
import ProductCard from "../components/common/ProductCard";
import './CSS/ProductsPage.css';
import { productService } from "../services/productService";
import img1 from "../Images/img-1.jpg";

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // CRUD State
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
        stock: '',
        imageUrl: ''
    });
    const [saving, setSaving] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await productService.getAllProducts();
            const withImages = (Array.isArray(data) ? data : []).map(p => ({
                ...p,
                imageUrl: p.imageUrl || img1,
            }));
            setProducts(withImages);
        } catch (err) {
            console.error('Failed to load products:', err);
            setError('No se pudieron cargar los productos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Reset form
    const resetForm = () => {
        setFormData({
            nombre: '',
            precio: '',
            descripcion: '',
            stock: '',
            imageUrl: ''
        });
        setEditingProduct(null);
    };

    // Open modal for creating
    const handleCreate = () => {
        resetForm();
        setShowModal(true);
    };

    // Open modal for editing
    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            nombre: product.nombre || '',
            precio: product.precio || '',
            descripcion: product.descripcion || '',
            stock: product.stock || '',
            imageUrl: product.imageUrl || ''
        });
        setShowModal(true);
    };

    // Delete product
    const handleDelete = async (idProducto) => {
        if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
        
        try {
            await productService.deleteProduct(idProducto);
            setProducts(products.filter(p => p.idProducto !== idProducto));
        } catch (err) {
            console.error('Error deleting product:', err);
            alert('Error al eliminar el producto');
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Submit form (create or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const productData = {
            nombre: formData.nombre,
            precio: parseFloat(formData.precio),
            descripcion: formData.descripcion,
            stock: parseInt(formData.stock, 10),
            imageUrl: formData.imageUrl || null
        };

        try {
            if (editingProduct) {
                // Update
                await productService.updateProduct(editingProduct.idProducto, productData);
            } else {
                // Create
                await productService.createProduct(productData);
            }
            setShowModal(false);
            resetForm();
            fetchProducts(); // Reload products
        } catch (err) {
            console.error('Error saving product:', err);
            alert('Error al guardar el producto');
        } finally {
            setSaving(false);
        }
    };

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    return (
        <div className="products-page-container">
            <div className="products-header">
                <h1 style={{ color: 'white', textAlign: 'center' }}>
                    Menu de panes Wum bao
                </h1>
                <button className="btn-add-product" onClick={handleCreate}>
                    + Agregar Producto
                </button>
            </div>

            {loading && (
                <p style={{ color: 'white', textAlign: 'center' }}>Cargando productos…</p>
            )}
            {error && (
                <p style={{ color: 'tomato', textAlign: 'center' }}>{error}</p>
            )}

            {!loading && !error && (
                <div className="bread-grid">
                    {products.map(product => (
                        <div key={product.idProducto} className="product-card-wrapper">
                            <ProductCard
                                idProducto={product.idProducto}
                                nombre={product.nombre}
                                precio={product.precio}
                                descripcion={product.descripcion}
                                imageUrl={product.imageUrl || img1}
                                stock={product.stock}
                                onAdd={() => {}}
                            />
                            <div className="product-crud-actions">
                                <button 
                                    className="btn-edit"
                                    onClick={() => handleEdit(product)}
                                >
                                    ✏️ Editar
                                </button>
                                <button 
                                    className="btn-delete"
                                    onClick={() => handleDelete(product.idProducto)}
                                >
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for Create/Edit */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="precio">Precio</label>
                                <input
                                    type="number"
                                    id="precio"
                                    name="precio"
                                    step="0.01"
                                    min="0"
                                    value={formData.precio}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="descripcion">Descripción</label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleInputChange}
                                    rows="3"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock">Stock</label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    min="0"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="imageUrl">URL de Imagen (opcional)</label>
                                <input
                                    type="text"
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleInputChange}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="modal-actions">
                                <button 
                                    type="button" 
                                    className="btn-cancel"
                                    onClick={handleCloseModal}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn-save"
                                    disabled={saving}
                                >
                                    {saving ? 'Guardando...' : (editingProduct ? 'Actualizar' : 'Crear')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductsPage;
