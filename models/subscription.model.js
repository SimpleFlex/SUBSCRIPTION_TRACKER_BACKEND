import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      require: [true, "price is required"],
      min: [0, "price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "NGN", "GBP"],
      default: "NGN",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["basic", "premium", "pro"],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      require: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      require: true,
      validate: {
        validator: (value) => {
          return value > this.startDate;
        },
        message: "start date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriod = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriod[this.frequency]
    );
    if (this.renewalDate < new Date()) {
      this.status = "expire";
    }
  }
  next();
});

const subscription = mongoose.models("subscription", subscriptionSchema);
export default subscription;
