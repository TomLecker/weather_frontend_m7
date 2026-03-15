import { defineStore } from "pinia";
import { auth, db } from "../services/firebaseService";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    userData: {
      favoritos: [],
    },
    loading: false,
    loadingUser: true,
    error: null,
  }),

  actions: {
    async addFavorito(ciudad) {
      if (!this.user || !this.userData) {
        console.warn("Usuario no cargado");
        return;
      }

      const favoritos = this.userData.favoritos || [];

      if (favoritos.includes(ciudad)) return;

      const nuevos = [...favoritos, ciudad];

      await updateDoc(doc(db, "users", this.user.uid), { favoritos: nuevos });

      this.userData.favoritos = nuevos;
    },

    async cambiarUnidad(unidad) {
      if (!this.user) return;

      const userRef = doc(db, "users", this.user.uid);

      await updateDoc(userRef, {
        unidadTemperatura: unidad,
      });

      this.userData.unidadTemperatura = unidad;
    },

    async register(email, password) {
      this.loading = true;
      this.error = null;

      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const user = res.user;

        this.user = user;

        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          favoritos: [],
          preferenciaTemp: "C",
        });

        return true;
      } catch (error) {
        this.error = error.message;
        return false;
      } finally {
        this.loading = false;
      }
    },

    async login(email, password) {
      this.loading = true;
      this.error = null;

      try {
        const res = await signInWithEmailAndPassword(auth, email, password);

        this.user = res.user;

        // cargar datos del usuario
        const docRef = doc(db, "users", res.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.userData = docSnap.data();
        }

        return true;
      } catch (error) {
        this.error = "Credenciales incorrectas";
        return false;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      await signOut(auth);

      this.user = null;
      this.userData = null;
    },

    async cambiarPreferenciaTemp(unidad) {
      if (!this.user) return;

      const userRef = doc(db, "users", this.user.uid);

      await updateDoc(userRef, {
        preferenciaTemp: unidad,
      });

      this.userData.preferenciaTemp = unidad;
    },

    // persistencia de sesión

    loadingUser: true,

    async initAuth() {
  return new Promise((resolve) => {

    onAuthStateChanged(auth, async (user) => {

      if (user) {
        this.user = user

        try {
          const docRef = doc(db, "users", user.uid)
          const snap = await getDoc(docRef)

          if (snap.exists()) {
            this.userData = snap.data()
          } else {
            this.userData = { favoritos: [] }
          }

        } catch (error) {
          console.error("Error cargando datos del usuario:", error)
        }

      } else {
        this.user = null
        this.userData = null
      }

      this.loadingUser = false
      resolve()   // 👈 avisa que Firebase terminó de inicializar
    })
  })
}
  },
});
