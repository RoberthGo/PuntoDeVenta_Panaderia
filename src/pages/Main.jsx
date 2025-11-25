import BreadButton from "../components/common/BreadButton";

function Main() {
    return (
        <div>
            <h1>Main Page</h1>
            <BreadButton imageUrl="https://th.bing.com/th/id/R.cf379560878e5cf74c383124bb013478?rik=yTH5vF2Vq52zyA&pid=ImgRaw&r=0" name="Cheems" price="41.69" onClick={() => alert('Bonk!')}></BreadButton>
        </div>
    );
}

export default Main;