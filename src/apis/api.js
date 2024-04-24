import { collection, addDoc, query, where, getDocs, deleteDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Function to add a new category
const addNewCategory = async (categoryName) => {
    try {
        // Check if a category with the same name already exists
        const categoryQuery = query(collection(db, "categories"), where("categoryName", "==", categoryName));
        const querySnapshot = await getDocs(categoryQuery);

        // If a category with the same name exists, throw an error
        if (!querySnapshot.empty) {
            throw new Error("Category with the same name already exists.");
        }
        const docRef = await addDoc(collection(db, "categories"), {
            categoryName: categoryName,
        });
        
        return docRef.id;
    } catch (error) {
        console.error("Error adding category document: ", error);
        return null;
    }
};

// Function to add a new product
const addNewProduct = async (productData) => {
    try {
        const productQuery = query(collection(db, "products"), where("productName", "==", productData.productName));
        const querySnapshot = await getDocs(productQuery);
        if (!querySnapshot.empty) {
            throw new Error("Product with the same name already exists.");
        }
        const docRef = await addDoc(collection(db, "products"), {
            ...productData
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding product document: ", error);
        return null;
    }
};

// Function to delete a product
const deleteProduct = async (productId) => {
    try {
        await deleteDoc(doc(db, "products", productId));
        console.log("Product deleted successfully");
        return true;
    } catch (error) {
        console.error("Error deleting product: ", error);
        return false;
    }
};

// Function to get all categories
const getAllCategories = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categories = [];
        querySnapshot.forEach((doc) => {
            const categoryData = doc.data();
            categories.push({
                id: doc.id,
                categoryName: categoryData.categoryName
            });
        });
        return categories;
    } catch (error) {
        console.error("Error getting categories: ", error);
        return null;
    }
};

// Function to get all products
const getAllProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = [];
        querySnapshot.forEach((doc) => {
            const productData = doc.data();
            products.push({
                id: doc.id,
                ...productData
            });
        });
        return products;
    } catch (error) {
        console.error("Error getting products: ", error);
        return null;
    }
};

const deleteCategory = async (categoryId) => {
    try {
        await deleteDoc(doc(db, "categories", categoryId));
        console.log("Category deleted successfully");
        return true;
    } catch (error) {
        console.error("Error deleting category: ", error);
        return false;
    }
};

// Function to add a new order
const addNewOrder = async (orderData) => {
    try {
        // Get the latest order to determine the next order ID
        const latestOrderQuerySnapshot = await getDocs(collection(db, "orders"));
        let latestOrderId = 0;
        latestOrderQuerySnapshot.forEach(doc => {
            const orderId = parseInt(doc.data().orderId.replace('#', ''), 10);
            if (orderId >= latestOrderId) {
                latestOrderId = orderId + 1;
            }
        });

        // If there are no existing orders, set the latestOrderId to 1
        if (latestOrderId === 0) {
            latestOrderId = 1;
        } 

        const orderId = `#${(latestOrderId).toString().padStart(5, '0')}`;

        // Add the order with timestamp and generated order ID
        const docRef = await addDoc(collection(db, "orders"), {
            ...orderData,
            orderId: orderId,
            timestamp: serverTimestamp(),
            deliveryStatus:'pending'
        });
        return orderId;
    } catch (error) {
        console.error("Error adding order document: ", error);
        return null;
    }
};






// Function to get all orders
const getAllOrders = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const orders = [];
        querySnapshot.forEach((doc) => {
            const orderData = doc.data();
            orders.push({
                id: doc.id,
                ...orderData
            });
        });
        return orders;
    } catch (error) {
        console.error("Error getting orders: ", error);
        return null;
    }
};

// Function to delete an order
const deleteOrder = async (orderId) => {
    try {
        await deleteDoc(doc(db, "orders", orderId));
        console.log("Order deleted successfully");
        return true;
    } catch (error) {
        console.error("Error deleting order: ", error);
        return false;
    }
};

const getOrderById = async (orderId) => {
    try {
        const orderDoc = await getDoc(doc(db, "orders", orderId));
        if (orderDoc.exists()) {
            return {
                id: orderDoc.id,
                ...orderDoc.data()
            };
        } else {
            console.error("Order does not exist");
            return null;
        }
    } catch (error) {
        console.error("Error getting order by ID: ", error);
        return null;
    }
};



export { addNewCategory, getAllCategories, getAllProducts, addNewProduct, deleteProduct, deleteCategory, addNewOrder, getAllOrders, getOrderById, deleteOrder };
