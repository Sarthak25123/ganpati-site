export function Motif({ className = '' }: { className?: string }) {
  return (
    <div className={`motif ${className}`} aria-hidden="true">
      <span className="motif__rule" />
      <svg className="motif__mark" viewBox="0 0 24 24" width="18" height="18">
        <path
          fill="currentColor"
          d="M12 2.2 13.2 8l5.8.4-4.4 3.6 1.6 5.6L12 14.8 7.8 17.6 9.4 12 5 8.4 10.8 8z"
        />
      </svg>
      <span className="motif__rule" />
    </div>
  )
}
