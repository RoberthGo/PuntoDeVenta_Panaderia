import BreadButton from "../components/common/BreadButton";
import ProductCard from "../components/common/ProductCard";


function Main() {
    return (
        <div className="main-page-container">
            <h1 style={{ color: "white", textAlign: "center" }}>
                Seccion de inicio 
            </h1>
        </div>
    );
}

export default Main;

/*
leo, vamos a hacer el frontend algo asi:
vamos a tener el Main donde van a estar el sidebar y el main content
el sidebar va a tener los links de navegacion
el main content va a tener las paginas que se van a ir mostrando
cada pagina va a ser un componente separado
asi mantenemos todo ordenado y modularizado como debe ser.

Robe no ha puesto los moldes asi que algunos atributos de la base de datos se van a tener que cambiar, pero segun yo la base ya esta
solo falta agregar bien la navegacion entre paginas y poder testear cada componente por separado, por que eso no lo se hacer aun.
*/