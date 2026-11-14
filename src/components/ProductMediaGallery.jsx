import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

function MediaItem({ url, name }) {
  const [video, setVideo] = useState(false);

  if (video) {
    return (
      <video className="max-h-full w-full object-contain" controls playsInline preload="metadata">
        <source src={url} />
      </video>
    );
  }

  return <img src={url} alt={name} onError={() => setVideo(true)} className="max-h-full w-full object-contain" />;
}

export default function ProductMediaGallery({ product }) {
  const media = product.media?.length ? product.media : [product.photo].filter(Boolean);
  const [index, setIndex] = useState(0);
  const current = media[index] ?? media[0];

  if (!current) return null;

  const move = (step) => setIndex((value) => (value + step + media.length) % media.length);

  return (
    <div className="relative flex h-[min(60vh,28rem)] items-center justify-center overflow-hidden rounded-card bg-card shadow-soft">
      <MediaItem key={current} url={current} name={product.name} />
      {media.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Предыдущее медиа"
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Следующее медиа"
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-bold text-white">
            {index + 1} / {media.length}
          </span>
        </>
      )}
    </div>
  );
}
