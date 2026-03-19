export default function RatingBadge({ rating }) {
  const color =
    rating >= 8 ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' :
    rating >= 7 ? 'text-amber-400 bg-amber-400/10 border-amber-400/30' :
    'text-orange-400 bg-orange-400/10 border-orange-400/30';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-sm font-bold ${color}`}>
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      {rating.toFixed(1)}
    </span>
  );
}
