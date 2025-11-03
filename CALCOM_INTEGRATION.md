# 📅 Интеграция Cal.com в проект клиники

## Что такое Cal.com?

Cal.com - это open-source платформа для онлайн-записи (альтернатива Calendly, Reservanto).

**Преимущества:**
- ✅ Готовый календарь с выбором даты и времени
- ✅ Автоматическая синхронизация с Google Calendar, Outlook
- ✅ Встроенные напоминания по email/SMS
- ✅ Интеграция с Stripe для оплаты
- ✅ Управление несколькими типами встреч
- ✅ Доступен бесплатный план

---

## 🚀 Быстрый старт

### Вариант 1: Использовать Cal.com (облачный)

#### Шаг 1: Регистрация
```bash
1. Перейдите на https://cal.com
2. Зарегистрируйтесь (бесплатно)
3. Создайте username (например: clinic-moscow)
```

#### Шаг 2: Создайте типы событий
```
В панели Cal.com создайте события для ваших услуг:

- "consultation" - Общая консультация (30 мин, 3000₽)
- "cardiology" - Кардиология (45 мин, 4500₽)
- "blood-test" - Анализы крови (15 мин, 2500₽)
- "dentistry" - Стоматология (40 мин, 3500₽)
```

#### Шаг 3: Установите npm пакет
```bash
npm install @calcom/embed-react
```

#### Шаг 4: Используйте в React
```typescript
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function BookingCalendar() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#2563eb" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  return (
    <Cal
      calLink="clinic-moscow/consultation"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: 'month_view' }}
    />
  );
}
```

---

### Вариант 2: Простой embed (без npm)

Просто добавьте этот код в ваш компонент:

```html
<!-- Добавьте скрипт в head или перед закрывающим body -->
<script src="https://app.cal.com/embed/embed.js"></script>

<!-- Кнопка для открытия popup -->
<button
  data-cal-link="your-username/consultation"
  data-cal-config='{"layout":"month_view"}'
>
  Записаться на прием
</button>

<!-- ИЛИ встроенный календарь -->
<div
  data-cal-link="your-username/consultation"
  data-cal-config='{"layout":"month_view","theme":"light"}'
  style="width:100%;height:100%;min-height:600px"
/>
```

---

### Вариант 3: Cal.com API (для кастомного UI)

#### Шаг 1: Получите API ключ
```
1. Войдите в Cal.com
2. Settings → Developer → API Keys
3. Create new API key
```

#### Шаг 2: Используйте API
```typescript
const API_KEY = 'cal_live_xxxxx';
const BASE_URL = 'https://api.cal.com/v1';

// Получить доступные слоты
async function getAvailability(eventTypeId: number, dateFrom: string, dateTo: string) {
  const response = await fetch(
    `${BASE_URL}/availability?eventTypeId=${eventTypeId}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      }
    }
  );
  return response.json();
}

// Создать бронирование
async function createBooking(bookingData: {
  eventTypeId: number;
  start: string;
  responses: {
    name: string;
    email: string;
    phone?: string;
  };
}) {
  const response = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData)
  });
  return response.json();
}
```

---

## 📝 Примеры использования в вашем проекте

### Пример 1: Замена текущего BookingModal на Cal.com

```typescript
// src/components/ui/calcom-booking.tsx уже создан!
import { CalComBooking } from "../../components/ui/calcom-booking";
import { useState } from "react";

export function BookingSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Записаться на прием
      </button>

      <CalComBooking
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        calLink="clinic-moscow/consultation"
      />
    </>
  );
}
```

### Пример 2: Выбор услуги, потом Cal.com

```typescript
// Сначала пользователь выбирает услугу, потом открывается Cal.com для этой услуги
const serviceToCalLink = {
  "consultation": "clinic-moscow/consultation",
  "cardiology": "clinic-moscow/cardiology",
  "blood-test": "clinic-moscow/blood-test",
};

function BookingFlow() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <>
      {/* Шаг 1: Выбор услуги */}
      {!selectedService && (
        <ServiceSelection onSelect={setSelectedService} />
      )}

      {/* Шаг 2: Cal.com календарь для выбранной услуги */}
      {selectedService && (
        <CalComBooking
          isOpen={true}
          onClose={() => setSelectedService(null)}
          calLink={serviceToCalLink[selectedService]}
        />
      )}
    </>
  );
}
```

---

## 💰 Настройка оплаты

### Через Cal.com + Stripe

1. **Подключите Stripe к Cal.com:**
   ```
   Cal.com → Settings → Billing → Connect Stripe
   ```

2. **Установите цену для каждого события:**
   ```
   Event Type → Edit → Price → 3000 RUB
   ```

3. **Cal.com автоматически обработает оплату!**

### Альтернатива: Собственная оплата

Если хотите свою систему оплаты:
1. Используйте Cal.com API для создания бронирования
2. После бронирования перенаправьте на свою страницу оплаты
3. После успешной оплаты подтвердите бронирование

---

## 🔔 Уведомления

Cal.com автоматически отправляет:
- ✉️ Email подтверждения
- 📧 Email напоминания (за 24 часа, за 1 час)
- 📱 SMS уведомления (опционально)
- 📆 Календарные приглашения (.ics файлы)

Настройка:
```
Event Type → Edit → Notifications & Workflows
```

---

## 🎨 Кастомизация внешнего вида

```typescript
const calConfig = {
  layout: "month_view", // или "week_view", "column_view"
  theme: "light", // или "dark", "auto"
  styles: {
    branding: {
      brandColor: "#2563eb", // Ваш цвет бренда
    }
  },
  hideEventTypeDetails: false,
  hideLandingPageDetails: false,
};

<Cal
  calLink="your-link"
  config={calConfig}
/>
```

---

## 🆚 Cal.com vs Собственная система

| Функция | Cal.com | Собственная система |
|---------|---------|---------------------|
| Время разработки | 1 час | 2-4 недели |
| Календарь | ✅ Готов | ❌ Нужно интегрировать |
| Синхронизация календарей | ✅ Есть | ❌ Нет |
| Напоминания | ✅ Автоматически | ❌ Нужно настраивать |
| Оплата | ✅ Stripe встроен | ❌ Нужно интегрировать |
| Гибкость | ⚠️ Ограничена | ✅ Полная |
| Стоимость | $0-12/мес | Бесплатно (но много работы) |

---

## 🔗 Полезные ссылки

- 📚 Документация: https://cal.com/docs
- 🎨 Embed инструкция: https://cal.com/docs/how-to-guides/how-to-embed-cal
- 🔌 API документация: https://cal.com/docs/api-reference
- 💻 GitHub: https://github.com/calcom/cal.com
- 🎥 Видео туториалы: https://www.youtube.com/c/calcom

---

## ❓ FAQ

**Q: Cal.com бесплатный?**
A: Да, есть бесплатный план. Платные планы от $12/мес добавляют больше возможностей.

**Q: Можно ли использовать на русском?**
A: Да, Cal.com поддерживает русский язык.

**Q: Работает ли в России?**
A: Да, но для оплаты нужно использовать российские платежные системы (ЮKassa, Тинькофф).

**Q: Можно ли развернуть на своем сервере?**
A: Да, Cal.com open-source и можно self-host.

**Q: Сколько времени займет интеграция?**
A: Embed версию можно интегрировать за 30-60 минут.

---

## 🎯 Рекомендация для вашего проекта

**Для быстрого прототипа:** Используйте Cal.com embed (Вариант 1 или 2)
**Для полного контроля:** Разрабатывайте собственную систему (как мы начали)
**Золотая середина:** Используйте Cal.com API с вашим UI (Вариант 3)
