const {Schema, model} = require('mongoose');

const ItemSchema = new Schema(
{
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    uses: {
        type: Number,
        required: true,
    }
});

module.exports = model('Item', ItemSchema);