import { defineStore } from "pinia";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: null,
      from: null,
    };
  },

  actions: {
    async registro(email, password, name) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await auth.updateProfile({ displayName: name });
        this.user = auth.currentUser;
        this.from = "registro";
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Ya esta registrado el email");
            break;

          case "auth/invalid-email":
            alert("email invalido");
            break;
        }
        return;
      }
    },

    async login(email, password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        this.user = auth.currentUser;
        this.from = "login";
      } catch (error) {
        console.log("el error", error);
        switch (error.code) {
          case "auth/user-not-found":
            alert("El usuario no esta registrado");
            break;

          case "auth/wrong-password":
            alert("Contraseña invalida");
            break;
        }
        return;
      }
    },
  },
});
