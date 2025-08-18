import mongoose from "mongoose";
import slugify from "slugify";
import { format } from 'date-fns';

const workshopSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
            index: true
        },
        mentor: {
            type: String,
            required: true,
        },
        maxParticipants: {
            type: Number,
            required: true,
        },
        fee: {
            type: Number,
            default: 0,
        },
        duration: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        mode: {
            type: String,
            enum: ["Online", "Offline"],
            required: true,
        },

        location: {
            type: String,
            required: function () {
                return this.mode === "Offline";
            },
        },
        whatsAppLink: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        perks: {
            type: [String],
            default: [],
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Upcoming", "Completed", "Draft", "Published"],
            default: "Draft",
        },
        registeredUsers: {
            type: [
                {
                    name: { type: String, required: true },
                    email: { type: String, required: true },
                    phone: { type: String, required: true },
                    transactionId: { type: String, required: true },
                },
            ],
            default: [],
        },
        perks: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

workshopSchema.pre('save', function (next) {
    if (this.isModified('title') || this.isModified('date') || this.isNew) {
        const titleSlug = slugify(this.title, { lower: true, strict: true });
        const dateSlug = format(new Date(this.date), 'yyyy-MM-dd');
        this.slug = `${titleSlug}-${dateSlug}`;
    }
    next();
});

export default mongoose.model("Workshop", workshopSchema);