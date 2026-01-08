function Header(props) {
    return (
        <div style={props.style}>
            <h1>Product App</h1>
        </div>
    );
}
function Main(props) {
    const [products, setProducts] = React.useState([]);
    const [editingIndex, setEditingIndex] = React.useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        const productData = {
            name: e.target.name.value,
            category: e.target.category.value,
            price: e.target.price.value,
            stock: e.target.stock.value,
            details: e.target.details.value
        };

        if (editingIndex !== null) {
            // Update existing product
            const updatedProducts = [...products];
            updatedProducts[editingIndex] = productData;
            setProducts(updatedProducts);
            setEditingIndex(null);
        } else {
            // Add new product
            setProducts([...products, productData]);
        }

        e.target.reset();
    }

    function handleDelete(index) {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    }

    function handleEdit(product, index) {
        setEditingIndex(index);

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
                    <input style={{border:"1px solid",height:"20px"}} type="text" name="name" required />

                    <label>Category</label>
                    <input style={{border:"1px solid",height:"20px"}} type="text" name="category" required />

                    <label>Price</label>
                    <input style={{border:"1px solid",height:"20px"}} type="number" name="price" required />

                    <label>Stock</label>
                    <input style={{border:"1px solid",height:"20px"}} type="number" name="stock"  required />

                    <label>Details</label>
                    <textarea style={{border:"1px solid"}} name="details" rows="4"></textarea>

                    <button style={btn}>
                        {editingIndex !== null ? "Update Product" : "Add Product"}
                    </button>
                </form>
            </div>

            <ProductTable
                products={products}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
}

// Table view like Excel
function ProductTable({ products, onDelete, onEdit }) {
    if (products.length === 0) {
        return <p style={{ textAlign: "center", marginTop: "20px" }}>No products added</p>;
    }

    return (
        <table style={table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price (₹)</th>
                    <th>Stock</th>
                    <th>Details</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((p, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td> {/* sequential ID */}
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>{p.price}</td>
                        <td>{p.stock}</td>
                        <td>{p.details}</td>
                        <td>
                            <button onClick={() => onEdit(p, i)}style={{ ...btn, backgroundColor: "orange" }}>Edit</button>
                            <button onClick={() => onDelete(i)}style={{ ...btn, backgroundColor: "red" }}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// Styles
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
    gap: "6px",
    
};

const btn = {
    margin: "2px",
    padding: "6px",
    color: "white",
    border: "none",
    cursor: "pointer",
    backgroundColor:"green"
};

const table = {
    width: "90%",
    margin: "20px auto",
    borderCollapse: "collapse",
    textAlign: "center",
};

table.th = table.td = {
    border: "1px solid #ccc",
    padding: "8px"
};

// App
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
