import React, { useEffect, useState } from "react";
import sharedStyles from "../shared/styles.module.css";
import { GiCancel } from "react-icons/gi";

const CreateProduct = ({ onClose }) => {
    const [categories, setCategories] = useState([]);
    const [userData, setUserData] = useState({})
    useEffect(() => {
        // Fetch the user data from the API endpoint
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/user/`)
            .then((response) => response.json())
            .then((data) => {
                if (!data.username) {
                    // User is not logged in, redirect to the login page
                    window.location.href = "/login/";
                } else {
                    // Update the formData with the correct author value
                    setFormData((prevData) => ({
                        ...prevData,
                        author: data.id,
                    }));
                    setLoading(false);
                }
            });
    }, []);

    const UNIT_CHOICES = [
        { value: "ml", label: "Milliliter" },
        { value: "l", label: "Liter" },
        { value: "piece", label: "Piece" },
        { value: "kg", label: "Kilogram" },
        // Add more choices as needed
    ];

    useEffect(() => {
        // Fetch categories from API endpoint
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/productcategories/`)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        author: userData.id,
        unit: "",
        standard_size: "",
        use_days: "",
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid(formData)) {
            // Form is valid, proceed with submission
            console.log("Form data:", formData);
            // ... Code to submit the form to the backend ...
            // Add the code to send the product data to the backend
            addProductToDatabase(formData);
            onClose();
        } else {
            // Form is not valid, display an error message or handle it as needed
            console.log("Form is not valid. Please fill in all fields.");
        }
    };

    const isFormValid = (formData) => {
        // Check if any required field is empty
        const requiredFields = ["title", "category", "unit", "standard_size", "use_days"];
        for (const key of requiredFields) {
            if (formData[key].trim() === "") {
                return false;
            }
        }
        return true;
    };


    const addProductToDatabase = (productData) => {
        let csrfToken;
        const cookies = document.cookie.split("; ");
        const csrfCookie = cookies.find((cookie) => cookie.startsWith("csrftoken="));
        if (csrfCookie) {
            csrfToken = csrfCookie.split("=")[1];
        } else {
            console.log("CSRF token cookie not found");
        }
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products/`, {
            method: "POST",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify(productData),
        })
            .then((response) => {
                console.log("Response status:", response);
                return response.json();
            })
            .then((data) => {
                console.log("Product added successfully:", data);
                window.location.reload()
            })
            .catch((error) => {
                console.error("Error adding product:", error);
            });
        onClose();
    };

    return (
        <div className={sharedStyles.modalOverlay}>
            <div className={sharedStyles.modalContentBig}>
                <div className={sharedStyles.modalContentHeader}>
                    <h2>Create New Product</h2>
                    <GiCancel onClick={onClose} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={sharedStyles.modalDetailsRow}>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required // Add required attribute for validation
                        />
                    </div>
                    <div className={sharedStyles.modalDetailsRow}>
                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required // Add required attribute for validation
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={sharedStyles.modalDetailsRow}>
                        <label>Unit</label>
                        <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleInputChange}
                            required // Add required attribute for validation
                        >
                            <option value="">Select a unit</option>
                            {UNIT_CHOICES.map((choice) => (
                                <option key={choice.value} value={choice.value}>
                                    {choice.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={sharedStyles.modalDetailsRow}>
                        <label>Standard Size</label>
                        <input
                            type="number"
                            name="standard_size"
                            value={formData.standard_size}
                            onChange={handleInputChange}
                            required // Add required attribute for validation
                        />
                    </div>
                    <div className={sharedStyles.modalDetailsRow}>
                        <label>Use Days</label>
                        <input
                            type="number"
                            name="use_days"
                            value={formData.use_days}
                            onChange={handleInputChange}
                            required // Add required attribute for validation
                        />
                    </div>
                    {/* <div className={sharedStyles.modalDetailsRow}>
                        <label>Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                        />
                    </div> */}
                    <div className={sharedStyles.modalActions}>
                        <button className={sharedStyles.primaryButton} type="submit">
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
