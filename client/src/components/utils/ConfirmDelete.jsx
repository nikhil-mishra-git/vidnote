import { FiTrash2, FiX } from "react-icons/fi";

const ConfirmDelete = ({ open, onCancel, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl bg-zinc-900 border border-white/10 p-6 text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Confirm Delete</h3>
          <button
            onClick={onCancel}
            className="text-zinc-400 hover:text-white"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Message */}
        <p className="text-sm text-zinc-400">
          Are you sure you want to delete?
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-sm bg-white/5 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-sm bg-red-500 hover:bg-red-600 transition flex items-center gap-2"
          >
            <FiTrash2 size={14} />
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmDelete;
