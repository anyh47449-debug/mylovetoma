const FloatingHeartsBackground = () => {
  return (
    <div className="romantic-hearts-layer transition-opacity duration-700 opacity-100" aria-hidden>
      {Array.from({ length: 16 }).map((_, index) => (
        <span
          key={index}
          className="floating-heart"
          style={{
            left: `${5 + ((index * 6) % 90)}%`,
            animationDelay: `${index * 0.9}s`,
            animationDuration: `${16 + (index % 5)}s`,
            opacity: 0.35 + ((index % 3) * 0.18),
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
};

export default FloatingHeartsBackground;
