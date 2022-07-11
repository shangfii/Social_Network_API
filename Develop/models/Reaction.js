// 01. Pack "schema" and "model" from mongoose ready to use
//  Reaction needs User name 

const { Schema, Types } = require('mongoose');

// Schema for a general Reaction

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 500,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {//_id field not required because we have created reactionId above
    _id: false
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
  
);

// export reaction  schema

module.exports = reactionSchema;