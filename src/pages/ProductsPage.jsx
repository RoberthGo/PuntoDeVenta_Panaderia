import React, { useEffect, useState } from 'react';
import ProductCard from "../components/common/ProductCard";
import './CSS/ProductsPage.css';
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";
import img1 from "../Images/img-1.jpg";

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
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
        categoria: '',
        costo: '',
        reorderLevel: '',
        imageFile: null
    });
    const [imagePreview, setImagePreview] = useState('');
    const [saving, setSaving] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await productService.getAllProducts();
            const withImages = (Array.isArray(data) ? data : []).map(p => {
                let imageUrl = img1; // Default image
                
                // Handle different image formats from backend
                if (p.imagen) {
                    // If imagen is a byte array or base64 string
                    if (typeof p.imagen === 'string' && p.imagen.startsWith('data:image')) {
                        imageUrl = p.imagen;
                    } else if (typeof p.imagen === 'string') {
                        // Assume it's base64 without prefix
                        imageUrl = `data:image/jpeg;base64,${p.imagen}`;
                    }
                } else if (p.imagenBase64) {
                    // If backend sends imagenBase64 field
                    if (p.imagenBase64.startsWith('data:image')) {
                        imageUrl = p.imagenBase64;
                    } else {
                        imageUrl = `data:image/jpeg;base64,${p.imagenBase64}`;
                    }
                } else if (p.imageUrl) {
                    // If backend sends imageUrl field
                    imageUrl = p.imageUrl;
                }
                
                return {
                    ...p,
                    imageUrl: imageUrl,
                };
            });
            setProducts(withImages);
        } catch (err) {
            console.error('Failed to load products:', err);
            setError('No se pudieron cargar los productos.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getAllCategories();
            setCategories(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Failed to load categories:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Reset form
    const resetForm = () => {
        setFormData({
            nombre: '',
            precio: '',
            descripcion: '',
            stock: '',
            categoria: '',
            costo: '',
            reorderLevel: '',
            imageFile: null
        });
        setImagePreview('');
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
            categoria: product.idCategoria || product.categoria || '',
            costo: product.costo || '',
            reorderLevel: product.reorderLevel || '',
            imageFile: null
        });
        
        // Set image preview from existing product image
        let preview = '';
        if (product.imagen) {
            if (typeof product.imagen === 'string' && product.imagen.startsWith('data:image')) {
                preview = product.imagen;
            } else if (typeof product.imagen === 'string') {
                preview = `data:image/jpeg;base64,${product.imagen}`;
            }
        } else if (product.imagenBase64) {
            if (product.imagenBase64.startsWith('data:image')) {
                preview = product.imagenBase64;
            } else {
                preview = `data:image/jpeg;base64,${product.imagenBase64}`;
            }
        } else if (product.imageUrl && product.imageUrl !== img1) {
            preview = product.imageUrl;
        }
        
        setImagePreview(preview);
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

        const formDataToSend = new FormData();
        formDataToSend.append('nombre', formData.nombre);
        formDataToSend.append('precio', formData.precio);
        formDataToSend.append('descripcion', formData.descripcion);
        formDataToSend.append('stock', formData.stock);
        formDataToSend.append('idCategoria', formData.categoria); // Backend expects idCategoria
        formDataToSend.append('costo', formData.costo);
        formDataToSend.append('reorderLevel', formData.reorderLevel);
        
        // Send imagenArchivo - backend requires this parameter
        if (formData.imageFile) {
            formDataToSend.append('imagenArchivo', formData.imageFile);
        } else {
            // Send empty file with proper filename to satisfy backend validation
            const emptyFile = new File([], 'empty.txt', { type: 'text/plain' });
            formDataToSend.append('imagenArchivo', emptyFile);
        }

        try {
            if (editingProduct) {
                // Update - add idProducto to FormData
                formDataToSend.append('idProducto', editingProduct.idProducto);
                await productService.updateProduct(editingProduct.idProducto, formDataToSend);
            } else {
                // Create
                await productService.createProduct(formDataToSend);
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
                                <label htmlFor="costo">Costo</label>
                                <input
                                    type="number"
                                    id="costo"
                                    name="costo"
                                    step="0.01"
                                    min="0"
                                    value={formData.costo}
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
                                <label htmlFor="reorderLevel">Nivel de Reorden</label>
                                <input
                                    type="number"
                                    id="reorderLevel"
                                    name="reorderLevel"
                                    min="0"
                                    value={formData.reorderLevel}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="categoria">Categoría</label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleInputChange}
                                    required
                                    className="form-select"
                                >
                                    <option value="" disabled>
                                        Selecciona una categoría
                                    </option>
                                    {categories.map((cat) => (
                                        <option key={cat.idCategoria} value={cat.idCategoria}>
                                            {cat.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="imageFile">Imagen del Producto (opcional)</label>
                                <input
                                    type="file"
                                    id="imageFile"
                                    name="imageFile"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setFormData(prev => ({
                                                ...prev,
                                                imageFile: file
                                            }));
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setImagePreview(reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                                {imagePreview && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                    </div>
                                )}
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
