import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import Button from "../components/Button";
import {
  DELIVERY_ZONES,
  DELIVERY_WINDOWS,
  COLLECTION,
  PRODUCTS,
  getZone,
  formatPrice,
} from "../data/catalog";
import { useOrder } from "../hooks/useOrder";
import { useTelegram } from "../hooks/useTelegram";
import { isValidPhone, minOrderFor } from "../store/selectors";
import { generateOrderNo } from "../store/orderReducer";
import { useOrders } from "../hooks/useOrders";
import { AlertIcon, TruckIcon } from "../components/icons";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const telegram = useTelegram();
  const { order, dispatch } = useOrder();
  const { addOrder } = useOrders();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const summaryRef = useRef(null);

  const lines = Object.entries(order.cart)
    .map(([id, qty]) => {
      const product = PRODUCTS.find((p) => p.id === Number(id));
      return product ? { product, qty } : null;
    })
    .filter(Boolean);

  const itemsTotal = lines.reduce((sum, { product, qty }) => sum + product.price * qty, 0);
  const zone = getZone(order.zoneId);
  const deliveryMode = zone?.mode ?? null;
  const deliveryPrice = zone?.mode === "fixed" ? zone.price : 0;
  const total = itemsTotal + deliveryPrice;
  const minOrder = minOrderFor(order.zoneId);

  const setField = (field, value) => {
    dispatch({ type: "setField", field, value });
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const next = {};
    if (!order.customerName.trim()) next.customerName = "Укажите имя";
    if (!isValidPhone(order.phone)) next.phone = "Укажите телефон для связи";
    if (!order.zoneId) next.zoneId = "Выберите населённый пункт";
    if (!order.street.trim()) next.street = "Укажите улицу";
    if (!order.house.trim()) next.house = "Укажите дом";
    if (!order.agreed) next.agreed = "Нужно согласие с условиями";
    if (zone && itemsTotal < minOrder)
      next.zoneId = `Минимальная сумма заказа для ${zone.name} — ${formatPrice(minOrder)}`;
    return next;
  };

  const submit = async () => {
    telegram.haptic("light");
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setSubmitting(true);
    // Мок отправки: позже здесь будет POST на сервер, номер вернёт сервер.
    await new Promise((resolve) => setTimeout(resolve, 700));
    const snapshot = lines.map(({ product, qty }) => ({
      productId: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      qty,
    }));
    const orderNo = generateOrderNo();
    dispatch({
      type: "submit",
      items: snapshot,
      itemsTotal,
      deliveryPrice: zone?.mode === "fixed" ? deliveryPrice : null,
      deliveryMode,
      total: zone?.mode === "fixed" ? total : null,
      orderNo,
    });
    addOrder({
      orderNo,
      collectionId: COLLECTION.id,
      customerName: order.customerName,
      phone: order.phone,
      address: {
        zoneId: order.zoneId,
        zoneName: zone?.name,
        street: order.street,
        house: order.house,
        apartment: order.apartment,
        comment: order.comment,
      },
      windowId: order.windowId,
      items: snapshot,
      itemsTotal,
      deliveryMode,
      deliveryPrice: zone?.mode === "fixed" ? deliveryPrice : null,
      total: zone?.mode === "fixed" ? total : null,
    });
    telegram.notification("success");
    navigate("/done");
  };

  const field = (name) => [
    "w-full rounded-xl border bg-card px-4 text-[14.5px] font-medium text-ink transition-all duration-200 placeholder:text-muted/60",
    errors[name]
      ? "border-destructive-red/70 bg-destructive-red/[0.03]"
      : "border-line focus:border-sea focus:shadow-[0_0_0_4px_rgb(14_116_144/0.08)]",
    "h-12 outline-none",
  ];

  return (
    <PageShell docTitle="Оформление заявки" contentClassName="pb-4">
      <h1 className="mt-3 text-[24px] font-extrabold tracking-[-0.02em] text-ink">Оформление заявки</h1>
      <p className="mt-1 text-[13px] font-medium text-muted">
        Привоз №{COLLECTION.id} · {lines.length} поз. · товары {formatPrice(itemsTotal)}
      </p>

      {/* Error summary: фокус после неудачного сабмита (UX-правило focusable error summary) */}
      {Object.keys(errors).length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="error-title"
          className="mt-4 rounded-card border border-destructive-red/30 bg-destructive-red/5 px-4 py-3 shadow-soft outline-none"
        >
          <p id="error-title" className="text-[13.5px] font-extrabold text-destructive-red">
            Проверьте форму:
          </p>
          <ul className="mt-1.5 flex flex-col gap-1">
            {Object.entries(errors).map(([key, message]) => (
              <li key={key} className="text-[13px] text-destructive-red">
                <a href={`#field-${key}`} className="underline decoration-dotted">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form
        className="mt-4 flex flex-col gap-4"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <section className="flex flex-col gap-3 rounded-card bg-card p-4 shadow-soft">
          <p className="text-[12px] font-extrabold tracking-widest text-sea uppercase">Контакты</p>

          <div>
            <label htmlFor="field-customerName" className="mb-1.5 block text-[13px] font-bold text-ink-soft">
              Имя <span className="text-accent-strong" aria-hidden="true">*</span>
            </label>
            <input
              id="field-customerName"
              type="text"
              autoComplete="name"
              value={order.customerName}
              onChange={(e) => setField("customerName", e.target.value)}
              placeholder="Как к вам обращаться"
              aria-invalid={Boolean(errors.customerName)}
              className={field("customerName")}
            />
          </div>

          <div>
            <label htmlFor="field-phone" className="mb-1.5 block text-[13px] font-bold text-ink-soft">
              Телефон <span className="text-accent-strong" aria-hidden="true">*</span>
            </label>
            <input
              id="field-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={order.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="+7 (___) ___-__-__"
              aria-invalid={Boolean(errors.phone)}
              className={field("phone")}
            />
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-card bg-card p-4 shadow-soft">
          <p className="text-[12px] font-extrabold tracking-widest text-sea uppercase">Доставка</p>

          <div>
            <label htmlFor="field-zoneId" className="mb-1.5 block text-[13px] font-bold text-ink-soft">
              Населённый пункт <span className="text-accent-strong" aria-hidden="true">*</span>
            </label>
            <select
              id="field-zoneId"
              value={order.zoneId}
              onChange={(e) => setField("zoneId", e.target.value)}
              aria-invalid={Boolean(errors.zoneId)}
              className={field("zoneId")}
            >
              <option value="">Выберите…</option>
              {DELIVERY_ZONES.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name}
                  {z.mode === "fixed" ? ` — доставка ${z.price} ₽` : " — рассчитает менеджер"}
                </option>
              ))}
            </select>
            {zone?.mode === "manager" && (
              <p className="mt-1.5 flex items-start gap-1.5 text-[12.5px] leading-snug font-medium text-ink-soft">
                <TruckIcon className="mt-0.5 h-4 w-4 shrink-0 text-sea-deep" />
                Стоимость и доступность доставки менеджер подтвердит по телефону до окончательного
                подтверждения заявки.
              </p>
            )}
          </div>

          <div className="grid grid-cols-[1fr_90px] gap-2">
            <div>
              <label htmlFor="field-street" className="mb-1.5 block text-[13px] font-bold text-ink-soft">
                Улица <span className="text-accent-strong" aria-hidden="true">*</span>
              </label>
              <input
                id="field-street"
                type="text"
                value={order.street}
                onChange={(e) => setField("street", e.target.value)}
                placeholder="ул. Ленина"
                aria-invalid={Boolean(errors.street)}
                className={field("street")}
              />
            </div>
            <div>
              <label htmlFor="field-house" className="mb-1.5 block text-[13px] font-bold text-ink-soft">
                Дом <span className="text-accent-strong" aria-hidden="true">*</span>
              </label>
              <input
                id="field-house"
                type="text"
                value={order.house}
                onChange={(e) => setField("house", e.target.value)}
                placeholder="12а"
                aria-invalid={Boolean(errors.house)}
                className={field("house")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="field-apartment" className="mb-1.5 block text-[13px] font-bold text-ink-soft">
              Квартира / подъезд / этаж
            </label>
            <input
              id="field-apartment"
              type="text"
              value={order.apartment}
              onChange={(e) => setField("apartment", e.target.value)}
              placeholder="кв. 45, подъезд 2, этаж 5"
              className={field("apartment")}
            />
          </div>

          <div>
            <label htmlFor="field-comment" className="mb-1.5 block text-[13px] font-bold text-ink-soft">
              Комментарий курьеру
            </label>
            <textarea
              id="field-comment"
              rows={2}
              value={order.comment}
              onChange={(e) => setField("comment", e.target.value)}
              placeholder="Позвонить за час, код домофона…"
              className="w-full resize-none rounded-xl border border-line bg-card px-4 py-3 text-[14.5px] font-medium outline-none transition-all duration-200 placeholder:text-muted/60 focus:border-sea focus:shadow-[0_0_0_4px_rgb(14_116_144/0.08)]"
            />
          </div>
        </section>
        <section className="flex flex-col gap-2.5 rounded-card bg-card p-4 shadow-soft">
          <p className="text-[12px] font-extrabold tracking-widest text-sea uppercase">
            Интервал доставки
          </p>
          {DELIVERY_WINDOWS.map((w) => (
            <label
              key={w.id}
              className={[
                "flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-[14px] font-bold transition-all duration-200",
                order.windowId === w.id
                  ? "border-sea-deep bg-sea-soft text-sea-deep shadow-soft"
                  : "border-line bg-canvas text-ink hover:border-sea/50",
              ].join(" ")}
            >
              <span>{w.label}</span>
              <input
                type="radio"
                name="windowId"
                value={w.id}
                checked={order.windowId === w.id}
                onChange={() => setField("windowId", w.id)}
                className="sr-only"
              />
              <span
                className={[
                  "h-5 w-5 rounded-full border-2 transition-all duration-200",
                  order.windowId === w.id
                    ? "border-sea-deep bg-sea-deep shadow-[inset_0_0_0_3px_var(--color-sea-soft)]"
                    : "border-line bg-card",
                ].join(" ")}
                aria-hidden="true"
              />
            </label>
          ))}
          <p className="text-[12px] leading-snug font-medium text-muted">
            Точное время доставки зависит от маршрута — гарантирован только выбранный интервал.
          </p>
        </section>

        <section className="rounded-card bg-card p-4 shadow-soft">
          <p className="text-[12px] font-extrabold tracking-widest text-sea uppercase">Ваш заказ</p>
          <ul className="mt-2.5 flex flex-col gap-1.5 text-[13.5px]">
            {lines.map(({ product, qty }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span className="text-ink">
                  {product.name} — {qty} {product.unit === "kg" ? "кг" : "шт/упак"}
                </span>
                <span className="shrink-0 font-semibold tabular-nums">
                  {formatPrice(product.price * qty)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-1.5 border-t border-line pt-3 text-[13.5px]">
            <div className="flex justify-between text-muted">
              <span>Товары</span>
              <span className="tabular-nums">{formatPrice(itemsTotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Доставка</span>
              <span className="tabular-nums">
                {zone
                  ? zone.mode === "fixed"
                    ? formatPrice(zone.price)
                    : "рассчитает менеджер"
                  : "—"}
              </span>
            </div>
            <div className="flex justify-between text-[15px] font-bold text-ink">
              <span>Итого</span>
              <span className="tabular-nums">
                {zone?.mode === "fixed" ? formatPrice(total) : "уточнит менеджер"}
              </span>
            </div>
          </div>
        </section>

        <label
          className={[
            "flex cursor-pointer items-start gap-3 rounded-card border px-4 py-3.5 text-[13px] leading-snug font-medium transition-all duration-200",
            errors.agreed ? "border-destructive-red/70 bg-destructive-red/[0.03]" : "border-line bg-card shadow-soft",
          ].join(" ")}
        >
          <input
            type="checkbox"
            checked={order.agreed}
            onChange={(e) => setField("agreed", e.target.checked)}
            aria-invalid={Boolean(errors.agreed)}
            className="mt-0.5 h-5 w-5 shrink-0 accent-sea"
          />
          <span className="text-ink">
            Согласен с условиями заказа и{" "}
            <span className="font-semibold underline decoration-dotted">
              политикой обработки персональных данных
            </span>
            . Телефон и адрес используются только для оформления и доставки заявки.
          </span>
        </label>

        <Button type="submit" variant="accent" disabled={submitting} icon="none" className={submitting ? "animate-pulse" : ""}>
          {submitting ? "Отправляем заявку…" : "Подтвердить заявку"}
        </Button>

        <p className="mb-2 flex items-start gap-1.5 px-1 text-[12px] leading-snug font-medium text-muted">
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
          Приём заказов закрывается заранее — не откладывайте оформление. Отменить заявку можно по
          телефону до момента комплектации.
        </p>
      </form>
    </PageShell>
  );
}
