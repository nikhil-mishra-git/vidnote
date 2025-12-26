import Note from "../models/Notes.model.js";
import User from "../models/User.model.js";

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notes.length,
            notes,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch notes",
        });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }

        res.status(200).json({
            success: true,
            note,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch note",
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { summary, notes } = req.body;

        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            {
                $set: {
                    ...(summary && { summary }),
                    ...(notes && { notes }),
                },
            },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note: updatedNote,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update note",
        });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }

        await User.findByIdAndUpdate(req.user._id, {
            $pull: { generatedNotes: deletedNote._id },
        });

        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            deletedNoteId: deletedNote._id,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete note",
        });
    }
};

