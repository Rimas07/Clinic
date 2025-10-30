import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebaseconfig";

interface AuthProps {
  onClose?: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "Неверный email или пароль. Если у вас нет аккаунта, переключитесь на регистрацию.";
      case "auth/user-not-found":
        return "Пользователь с таким email не найден. Зарегистрируйтесь, пожалуйста.";
      case "auth/wrong-password":
        return "Неверный пароль.";
      case "auth/email-already-in-use":
        return "Этот email уже зарегистрирован. Войдите в систему.";
      case "auth/weak-password":
        return "Пароль должен содержать минимум 6 символов.";
      case "auth/invalid-email":
        return "Некорректный email адрес.";
      case "auth/too-many-requests":
        return "Слишком много попыток. Попробуйте позже.";
      default:
        return "Произошла ошибка. Попробуйте снова.";
    }
  };

  const handleSignIn = async () => {
    try {
      setError("");
      setLoading(true);

      if (!email || !password) {
        setError("Заполните все поля");
        setLoading(false);
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      onClose?.();
    } catch (err: any) {
      const errorMessage = getErrorMessage(err.code || err.message);
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setError("");
      setLoading(true);

      if (!email || !password) {
        setError("Заполните все поля");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Пароль должен содержать минимум 6 символов");
        setLoading(false);
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      onClose?.();
    } catch (err: any) {
      const errorMessage = getErrorMessage(err.code || err.message);
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setPassword("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        {isSignUp ? "Регистрация" : "Вход"}
      </h2>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div className="space-y-3">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={isSignUp ? handleSignUp : handleSignIn}
          disabled={loading}
        >
          {loading ? "Загрузка..." : isSignUp ? "Зарегистрироваться" : "Войти"}
        </button>
        <button
          className="w-full text-blue-600 hover:text-blue-700 text-sm"
          onClick={handleToggleMode}
          disabled={loading}
        >
          {isSignUp
            ? "Уже есть аккаунт? Войти"
            : "Нет аккаунта? Зарегистрироваться"}
        </button>
      </div>
    </div>
  );
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};

export const useAuthState = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};

export { auth };
