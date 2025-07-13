const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <img
        src="/assets/logos/beekeys-logo.png"
        alt="Loading..."
        className="w-16 h-16 animate-spin-slow"
      />
    </div>
  );
};

export default Loader;
