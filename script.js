
function Header(props) {
    return (
        <div style={props.style}>
            <h1>Product App</h1>
        </div>
    );
}
function Main(props) {
    const [products, setProducts] = React.useState([]);
    const [editingId, setEditingId] = React.useState(null); // track product being edited

    function handleSubmit(e) {
        e.preventDefault();

        const productData = {
            id: editingId ? editingId : Date.now(), //product uniqe id
            name: e.target.name.value,
            category: e.target.category.value,
            price: e.target.price.value,
            stock: e.target.stock.value,
            details: e.target.details.value
        };

        if (editingId) {
            // Update existing product
            setProducts(products.map(p => p.id === editingId ? productData : p));
            setEditingId(null); // reset editing state
        } else {
            // Add new product
            setProducts([...products, productData]);
        }

        e.target.reset();
    }

    function handleDelete(id) {
        setProducts(products.filter(p => p.id !== id));
    }

    function handleEdit(product) {
        setEditingId(product.id);

        // Populate form fields
        const form = document.querySelector("form");
        form.name.value = product.name;
        form.category.value = product.category;
        form.price.value = product.price;
        form.stock.value = product.stock;
        form.details.value = product.details;
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

                    <button style={btn}>
                        {editingId ? "Update Product" : "Add Product"}
                    </button>
                </form>
            </div>

            <ProductList products={products} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
    );
}


function ProductList({ products, onDelete, onEdit }) {
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
                    <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
                        <button onClick={() => onEdit(p)}style={{ ...btn, backgroundColor: "orange" }}>Edit</button>
                        <button onClick={() => onDelete(p.id)}style={{ ...btn, backgroundColor: "red" }}>Delete</button>
                    </div>
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
