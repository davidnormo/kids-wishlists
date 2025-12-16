import { useState } from "preact/hooks";
import { Product, addProduct } from "../supabase";

export const TableFor = ({
  owner,
  person,
  products,
  onAdded,
}: {
  owner: string;
  person: string;
  products: Product[];
  onAdded: () => void;
}) => {
  const [adding, setAdding] = useState(false);

  const submitProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const product = Object.fromEntries(
      formData.entries(),
    ) as unknown as Product;

    setAdding(false);
    e.currentTarget.reset();
    await addProduct({
      ...product,
      owner,
      for: person,
      buyer: null,
      price: parseFloat(product.price as unknown as string),
    });
    onAdded();
  };

  return (
    <div>
      <h2>{person}'s Wishlist</h2>
      <form onSubmit={submitProduct}>
        <table
          css={{
            background: "#fff",
            width: "800px",
          }}
        >
          <thead css={{ fontWeight: "bold" }}>
            <tr>
              <td css={{ width: "300px" }}>Product</td>
              <td css={{ width: "100px" }}>Price</td>
              <td>URL</td>
              <td>Bought by</td>
            </tr>
          </thead>
          <tbody>
            {products.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>£{row.price.toFixed(2)}</td>
                <td>{row.url || "-"}</td>
                <td>{row.buyer?.name || "-"}</td>
              </tr>
            ))}
            <tr>
              {!adding ? (
                <td>
                  <button onClick={() => setAdding(true)}>+</button>
                </td>
              ) : (
                <>
                  <td>
                    <input placeholder="Product name" name="name" />
                  </td>
                  <td>
                    <input placeholder="£0.00" type="number" name="price" />
                  </td>
                  <td>
                    <input placeholder="url" name="url" />
                  </td>
                  <td>
                    <button>Add</button>
                  </td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};
