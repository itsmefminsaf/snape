const Thinking = () => {
  return (
    <div className="center w-fit gap-1 border-2 border-neutral-800 bg-neutral-950/20 p-3 backdrop-blur-2xl">
      <div
        className="size-2 animate-bounce rounded-full bg-white"
        style={{ animationDelay: `${1 * 500}ms` }}
      ></div>
      <div
        className="size-2 animate-bounce rounded-full bg-white"
        style={{ animationDelay: `${2 * 500}ms` }}
      ></div>
      <div
        className="size-2 animate-bounce rounded-full bg-white"
        style={{ animationDelay: `${3 * 500}ms` }}
      ></div>
    </div>
  );
};

export default Thinking;
