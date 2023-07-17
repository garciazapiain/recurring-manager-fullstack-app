import React from "react";

const ProductsGrid = ({ products }) => {
    const handleAddProduct = (productId) => {
        let csrfToken
        const cookies = document.cookie.split('; ');
        const csrfCookie = cookies.find((cookie) => cookie.startsWith('csrftoken='));
        if (csrfCookie) {
            csrfToken = csrfCookie.split('=')[1];
            console.log(csrfToken);
        } else {
            console.log('CSRF token cookie not found');
        }
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products/${productId}/add-to-user-product/`, {
            method: 'PUT',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken, // Replace 'csrftoken' with the name of your CSRF cookie
            },
            body: JSON.stringify({
                'current_inventory': 7,
            }),
        })
            .then((response) => {
                console.log("Response status:", response.status);
                return response.json();
            })
            .then(data => {
                console.log(`Product ${productId} was added to user products successfully:`, data);
                window.location.reload();
            })
            .catch(error => {
                console.error(`Error adding product ${productId} to user products:`, error);
            });
        // Add logic for adding the product here
    };

    return (
        <div className="products-grid">
            {products.map((product) => (
                <div key={product.id} className="product-item">
                    <h3>{product.title}</h3>
                    <h3>author:{product.author}</h3>
                    <button onClick={() => handleAddProduct(product.id)}>Add</button>
                </div>
            ))}
        </div>
    );
};

export default ProductsGrid;
