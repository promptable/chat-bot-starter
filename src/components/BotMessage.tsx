export const BotMessage = ({ msg }: { msg: Message }) => {
  return (
    <div className="flex items-center space-x-8 border-y-2 bg-base-300 py-10 px-40 text-xl">
      <div className="daisy-placeholder daisy-avatar">
        <div className="daisy-mask daisy-mask-square w-8 bg-secondary text-3xl font-black text-accent"></div>
      </div>
      <div className="rounded-md text-xl text-base-content">
        {msg.text?.length ? (
          msg.text.trim()
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
};