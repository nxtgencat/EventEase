const mongoose = require("mongoose");
const { eventSchema } = require("./event");

const adminSchema = new mongoose.Schema(
    {
        admin_id: {
            type: String,
            required: true,  // Corrected spelling
        },
        email: {
            type: String,
            unique: true,
        },
        pass: {
            type: String,
        },
        name: {
            type: String,
        },
        eventCreated: [],

        expireAt: {
            type: Date,
            default: Date.now,
            index: { expires: "2592000s" },
        },
    },
    { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

const test_credential = new Admin({
    admin_id: "hqwkufywealufyewf.weiugbfre654wegreg",
    email: "invite.testing@gmail.com",
    name: "test",
    pass: "invite123",
});

(async () => {
    try {
        const docs = await Admin.find({ admin_id: "hqwkufywealufyewf.weiugbfre654wegreg" });

        if (Array.isArray(docs) && docs.length === 0) {
            await test_credential.save();
            console.log("Saved::Admin::test credentials", test_credential);
        } else {
            console.log("Admin credentials already exist:", docs);
        }
    } catch (error) {
        console.error("Error finding or saving Admin:", error);
    }
})();

module.exports = Admin;
