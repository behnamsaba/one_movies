function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-indigo-600 animate-spin" />
    </div>
  );
}

export default LoadingSpinner;
