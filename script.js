
function Header(props) {
    return (
        <div style={props.style}>
            <h1>Product App</h1>
        </div>
    );
}
function Main(props) {
    const [products, setProducts] = React.useState([]);

    function handleSubmit(e) {
        e.preventDefault();

        const product = {
            id: Date.now(), // unique id for deletion
            name: e.target.name.value,
            category: e.target.category.value,
            price: e.target.price.value,
            stock: e.target.stock.value,
            details: e.target.details.value
        };

        setProducts([...products, product]);
        e.target.reset();
    }

    function handleDelete(id) {
        setProducts(products.filter(p => p.id !== id));
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <form style={props.style} onSubmit={handleSubmit}>
                    <label>Product Name</label>
                    <input type="text" name="name" required />

                    <label>Category</label>
                    <input type="text" name="category" required />

                    <label>Price</label>
                    <input type="number" name="price" required />

                    <label>Stock</label>
                    <input type="number" name="stock" required />

                    <label>Details</label>
                    <textarea name="details" rows="4"></textarea>

                    <button style={btn}>Add Product</button>
                </form>
            </div>

            <ProductList products={products} onDelete={handleDelete} />
        </div>
    );
}


function ProductList({ products, onDelete }) {
    if (products.length === 0) {
        return <p style={{ textAlign: "center" }}>No products added</p>;
    }

    return (
        <div style={list}>
            {products.map((p) => (
                <div key={p.id} style={card}>
                    <h3>{p.name}</h3>
                    <p>Category: {p.category}</p>
                    <p>Price: ₹{p.price}</p>
                    <p>Stock: {p.stock}</p>
                    <p>{p.details}</p>
                    <button onClick={() => onDelete(p.id)} style={{ ...btn, backgroundColor: "red" }}>Delete</button>
                </div>
            ))}
        </div>
    );
}



const card = {
    border: "1px solid #ccc",
    padding: "10px",
    width: "200px"
};
function App() {
    return (
        <div>
            <Header style={a} />
            <Main style={b} />
        </div>
    );
}
const page = ReactDOM.createRoot(document.getElementById("root"));
page.render(<App />);




//styles
const a = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
    backgroundColor: "black",
    height: "100px"
};

const b = {
    paddingTop: "10px",
    display: "flex",
    width: "300px",
    flexDirection: "column",
    gap: "6px"
};

const btn = {
    marginTop: "10px",
    padding: "6px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    cursor: "pointer"
};

const list = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap"
};
