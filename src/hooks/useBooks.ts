// hooks/useBooks.ts
import { useEffect, useState, useCallback } from "react";
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConf"; // ✅ import from your web Firebase config
import { useAppSelector } from "../redux/useAppSelector";

export type Book = {
  id?: string;
  image: string;
  title: string;
  author: string;
  status: string; // reading | completed | wishlist
  totalPages: number;
  currentPage: number;
};

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🧠 Redux user (must contain id or uid)
  const user = useAppSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (!user) {
      setBooks([]);
      setLoading(false);
      return;
    }

    // ✅ Firestore path for this user
    const userBooksRef = collection(
      db,
      "books",
      user?.uid ||"x", // adjust based on your state
      "userBooks"
    );

    const unsubscribe = onSnapshot(
      userBooksRef,
      (snapshot) => {
        const fetchedBooks = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Book),
        }));
        setBooks(fetchedBooks);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching books:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // ➕ Add Book
  const addBook = useCallback(
    async (book: Book) => {
      setLoading(true);
      try {
        if (!user) throw new Error("No user logged in");
        const userBooksRef = collection(
          db,
          "books",
          user?.uid || "x",
          "userBooks"
        );
        await addDoc(userBooksRef, book);
        console.log("Book added successfully");
      } catch (e: any) {
        console.error("Error adding book:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  // ✏️ Update Book
  const updateBook = useCallback(
    async (bookId: string, updates: Partial<Book>) => {
      setLoading(true);
      try {
        if (!user) throw new Error("No user logged in");
        const bookRef = doc(
          db,
          "books",
          user?.uid || "x",
          "userBooks",
          bookId
        );
        await updateDoc(bookRef, updates);
        console.log("Book updated successfully");
      } catch (e: any) {
        console.error("Error updating book:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  // ❌ Delete Book
  const deleteBook = useCallback(
    async (bookId: string) => {
      try {
        if (!user) throw new Error("No user logged in");
        const bookRef = doc(
          db,
          "books",
          user?.uid || "x",
          "userBooks",
          bookId
        );
        await deleteDoc(bookRef);
        console.log("Book deleted successfully");
      } catch (e: any) {
        console.error("Error deleting book:", e);
        setError(e.message);
      }
    },
    [user]
  );

  return {
    books,
    loading,
    error,
    addBook,
    updateBook,
    deleteBook,
  };
};

export default useBooks;
