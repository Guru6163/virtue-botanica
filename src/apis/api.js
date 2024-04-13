import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

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

const getAllProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const categories = [];
        querySnapshot.forEach((doc) => {
            const categoryData = doc.data();
            categories.push({
                id: doc.id,
                ...categoryData
            });
        });
        return categories;
    } catch (error) {
        console.error("Error getting categories: ", error);
        return null;
    }
};

export { addNewCategory, getAllCategories, getAllProducts, addNewProduct };
