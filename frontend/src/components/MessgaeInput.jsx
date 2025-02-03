import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, Smile, X } from "lucide-react";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

const MessageInput = () => {
  // ✅ To‘g‘ri nom
  const { sendMessage } = useChatStore();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInfutRef = useRef(null);
  const [emojiClick, setEmojiClick] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      // ✅ startWith -> startsWith
      toast.error("Please select an image file");
      return; // ✅ noto‘g‘ri fayl bo‘lsa, kodni to‘xtatish kerak
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInfutRef.current) fileInfutRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear inputs
      setText("");
      setImagePreview(null);
      setEmojiClick(false);
      if (fileInfutRef.current) fileInfutRef.current.value = "";
    } catch (error) {
      console.log("Failed to send message", error);
    }
  };
  const addEmoji = (emoji) => {
    setText((prevText) => prevText + emoji.emoji);
    setEmojiClick(false);
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="">
          <div className="relative">
            <img
              src={imagePreview}
              alt="prevImage"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage}>
        <div className="flex gap-2 flex-1">
          <input
            type="text"
            placeholder="Type a Message"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInfutRef}
            onChange={handleImageChange}
          />
          <div className="relative">
            <button
              type="button"
              className={`hidden sm:flex btn btn-circle ${
                imagePreview ? "text-emerald-500" : "text-zinc-400"
              }`}
            >
              <Smile size={20} onClick={() => setEmojiClick((prev) => !prev)} />
              <div className="  absolute bottom-16 -right-5">
                <EmojiPicker open={emojiClick} onEmojiClick={addEmoji} />
              </div>
            </button>
          </div>
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInfutRef.current?.click()}
          >
            <Image size={20} />
          </button>

          <button type="submit" className={`hidden sm:flex btn btn-circle `}>
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput; // ✅ To‘g‘ri nom
