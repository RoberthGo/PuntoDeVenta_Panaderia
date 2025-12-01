import React, { useEffect, useState } from 'react';
import ProductCard from "../components/common/ProductCard";
import './CSS/ProductsPage.css';
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";
import img1 from "../Images/img-1.jpg";

/**
 * Página de gestión de productos (CRUD).
 * Permite ver, crear, editar y eliminar productos.
 * @returns {JSX.Element}
 */
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
    const [validationErrors, setValidationErrors] = useState({});

    /** Constantes de validación basadas en restricciones de la BD */
    const VALIDATION = {
        nombre: { maxLength: 100, required: true },
        descripcion: { maxLength: 200, required: false },
        precio: { min: 0, max: 99999999.99, required: true },
        costo: { min: 0, max: 99999999.99, required: true },
        stock: { min: 0, max: 2147483647, required: true },
        reorderLevel: { min: 0, max: 2147483647, required: true },
        categoria: { required: true }
    };

    /** Valida todos los campos del formulario @returns {boolean} */
    const validateForm = () => {
        const errors = {};
        
        if (!formData.nombre.trim()) {
            errors.nombre = 'El nombre es obligatorio';
        } else if (formData.nombre.length > VALIDATION.nombre.maxLength) {
            errors.nombre = `Máximo ${VALIDATION.nombre.maxLength} caracteres`;
        }
        
        if (formData.descripcion && formData.descripcion.length > VALIDATION.descripcion.maxLength) {
            errors.descripcion = `Máximo ${VALIDATION.descripcion.maxLength} caracteres`;
        }
        
        const precio = parseFloat(formData.precio);
        if (!formData.precio && formData.precio !== 0) {
            errors.precio = 'El precio es obligatorio';
        } else if (isNaN(precio) || precio < VALIDATION.precio.min) {
            errors.precio = 'El precio debe ser un número positivo';
        } else if (precio > VALIDATION.precio.max) {
            errors.precio = 'El precio excede el límite permitido';
        }
        
        const costo = parseFloat(formData.costo);
        if (!formData.costo && formData.costo !== 0) {
            errors.costo = 'El costo es obligatorio';
        } else if (isNaN(costo) || costo < VALIDATION.costo.min) {
            errors.costo = 'El costo debe ser un número positivo';
        } else if (costo > VALIDATION.costo.max) {
            errors.costo = 'El costo excede el límite permitido';
        }
        
        const stock = parseInt(formData.stock);
        if (formData.stock === '' || formData.stock === null) {
            errors.stock = 'El stock es obligatorio';
        } else if (isNaN(stock) || stock < VALIDATION.stock.min) {
            errors.stock = 'El stock debe ser un número entero positivo';
        } else if (stock > VALIDATION.stock.max) {
            errors.stock = 'El stock excede el límite permitido';
        }
        
        const reorderLevel = parseInt(formData.reorderLevel);
        if (formData.reorderLevel === '' || formData.reorderLevel === null) {
            errors.reorderLevel = 'El nivel de reorden es obligatorio';
        } else if (isNaN(reorderLevel) || reorderLevel < VALIDATION.reorderLevel.min) {
            errors.reorderLevel = 'El nivel de reorden debe ser un número entero positivo';
        }
        
        if (!formData.categoria) {
            errors.categoria = 'Selecciona una categoría';
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    /** Carga todos los productos desde la API */
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await productService.getAllProducts();
            const withImages = (Array.isArray(data) ? data : []).map(p => {
                let imageUrl = img1;
                
                if (p.imagen) {
                    if (typeof p.imagen === 'string' && p.imagen.startsWith('data:image')) {
                        imageUrl = p.imagen;
                    } else if (typeof p.imagen === 'string') {
                        imageUrl = `data:image/jpeg;base64,${p.imagen}`;
                    }
                } else if (p.imagenBase64) {
                    if (p.imagenBase64.startsWith('data:image')) {
                        imageUrl = p.imagenBase64;
                    } else {
                        imageUrl = `data:image/jpeg;base64,${p.imagenBase64}`;
                    }
                } else if (p.imageUrl) {
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

    /** Carga todas las categorías desde la API */
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

    /** Limpia el formulario y estado de edición */
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

    /** Abre el modal para crear un nuevo producto */
    const handleCreate = () => {
        resetForm();
        setShowModal(true);
    };

    /** @param {Object} product - Producto a editar */
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

    /** @param {number} idProducto - ID del producto a eliminar */
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

    /** @param {Event} e - Evento del input */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /** @param {Event} e - Evento del formulario */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setSaving(true);

        const formDataToSend = new FormData();
        formDataToSend.append('nombre', formData.nombre);
        formDataToSend.append('precio', formData.precio);
        formDataToSend.append('descripcion', formData.descripcion);
        formDataToSend.append('stock', formData.stock);
        formDataToSend.append('idCategoria', formData.categoria);
        formDataToSend.append('costo', formData.costo);
        formDataToSend.append('reorderLevel', formData.reorderLevel);
        
        if (formData.imageFile) {
            formDataToSend.append('imagenArchivo', formData.imageFile);
        } else {
            const emptyFile = new File([], 'empty.txt', { type: 'text/plain' });
            formDataToSend.append('imagenArchivo', emptyFile);
        }

        try {
            if (editingProduct) {
                formDataToSend.append('idProducto', editingProduct.idProducto);
                await productService.updateProduct(editingProduct.idProducto, formDataToSend);
            } else {
                await productService.createProduct(formDataToSend);
            }
            setShowModal(false);
            resetForm();
            fetchProducts();
        } catch (err) {
            console.error('Error saving product:', err);
            alert('Error al guardar el producto');
        } finally {
            setSaving(false);
        }
    };

    /** Cierra el modal y limpia el formulario */
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

            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre *</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    maxLength={100}
                                    className={validationErrors.nombre ? 'input-error' : ''}
                                />
                                {validationErrors.nombre && <span className="error-text">{validationErrors.nombre}</span>}
                                <small className="char-count">{formData.nombre.length}/100</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="precio">Precio *</label>
                                <input
                                    type="number"
                                    id="precio"
                                    name="precio"
                                    step="0.01"
                                    min="0"
                                    max="99999999.99"
                                    value={formData.precio}
                                    onChange={handleInputChange}
                                    className={validationErrors.precio ? 'input-error' : ''}
                                />
                                {validationErrors.precio && <span className="error-text">{validationErrors.precio}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="costo">Costo *</label>
                                <input
                                    type="number"
                                    id="costo"
                                    name="costo"
                                    step="0.01"
                                    min="0"
                                    max="99999999.99"
                                    value={formData.costo}
                                    onChange={handleInputChange}
                                    className={validationErrors.costo ? 'input-error' : ''}
                                />
                                {validationErrors.costo && <span className="error-text">{validationErrors.costo}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="descripcion">Descripción</label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleInputChange}
                                    rows="3"
                                    maxLength={200}
                                    className={validationErrors.descripcion ? 'input-error' : ''}
                                />
                                {validationErrors.descripcion && <span className="error-text">{validationErrors.descripcion}</span>}
                                <small className="char-count">{formData.descripcion.length}/200</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock">Stock *</label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    min="0"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    className={validationErrors.stock ? 'input-error' : ''}
                                />
                                {validationErrors.stock && <span className="error-text">{validationErrors.stock}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="reorderLevel">Nivel de Reorden *</label>
                                <input
                                    type="number"
                                    id="reorderLevel"
                                    name="reorderLevel"
                                    min="0"
                                    value={formData.reorderLevel}
                                    onChange={handleInputChange}
                                    className={validationErrors.reorderLevel ? 'input-error' : ''}
                                />
                                {validationErrors.reorderLevel && <span className="error-text">{validationErrors.reorderLevel}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="categoria">Categoría *</label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleInputChange}
                                    className={`form-select ${validationErrors.categoria ? 'input-error' : ''}`}
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
                                {validationErrors.categoria && <span className="error-text">{validationErrors.categoria}</span>}
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
