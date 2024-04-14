import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
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


export { addNewCategory, getAllCategories, getAllProducts, addNewProduct, deleteProduct, deleteCategory };
