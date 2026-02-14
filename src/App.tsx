import React, { useEffect, useState } from "react";
import { Box } from "./screens/box";
import { I18nProvider } from "./lib/i18n";
import { CheckCircle, XCircle, X } from "lucide-react";

function App() {
  const [paymentStatus, setPaymentStatus] = useState<"success" | "cancelled" | null>(null);

  useEffect(() => {
    // Проверяем параметры URL после возврата со Stripe
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    
    if (payment === "success" || payment === "cancelled") {
      setPaymentStatus(payment);
      // Удаляем параметр из URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const handleCloseNotification = () => {
    setPaymentStatus(null);
  };

  return (
    <I18nProvider>
      <Box />
      {/* Уведомление об успешной оплате */}
      {paymentStatus === "success" && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 border-2 border-green-500 rounded-lg shadow-xl p-4 max-w-md animate-in slide-in-from-top-5">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={24} />
            <div className="flex-1">
              <h3 className="font-semibold text-green-800 mb-1">
                Оплата успешно завершена!
              </h3>
              <p className="text-sm text-green-700">
                Спасибо за оплату. Подтверждение отправлено на ваш email.
              </p>
            </div>
            <button
              onClick={handleCloseNotification}
              className="text-green-600 hover:text-green-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
      {/* Уведомление об отмене оплаты */}
      {paymentStatus === "cancelled" && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-50 border-2 border-yellow-500 rounded-lg shadow-xl p-4 max-w-md animate-in slide-in-from-top-5">
          <div className="flex items-start gap-3">
            <XCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={24} />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-800 mb-1">
                Оплата отменена
              </h3>
              <p className="text-sm text-yellow-700">
                Вы можете оплатить позже или в клинике при визите.
              </p>
            </div>
            <button
              onClick={handleCloseNotification}
              className="text-yellow-600 hover:text-yellow-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </I18nProvider>
  );
}

export default App;
