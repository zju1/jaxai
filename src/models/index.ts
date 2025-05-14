import mongoose, { mongo, Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: String,
    phoneNumber: { type: String, unique: true },
    password: String,
    address: String,
    accountNumber: Number,
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
);

export interface SingleIssue {
  sender: string;
  _id: string;
  content: string;
  district: string;
  response: string;
  createdAt: string;
  category: string;
}

const IssueSchema = new mongoose.Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    district: { type: String },
    content: String,
    response: String,
    category: {
      type: String,
      enum: [
        "overconsumption", // Перерасход
        "power_outage", // Сбои в электроснабжении
        "meter_malfunction", // Неисправность счётчика
        "low_efficiency", // Низкая энергоэффективность
        "tariff_issue", // Вопросы по тарифам
        "technical_fault", // Технические неисправности
        "power_quality", // Качество электроэнергии
        "service_complaint", // Жалобы на обслуживание
        "data_access_issue", // Проблемы доступа к данным
        "savings_recommendation", // Рекомендации по энергосбережению
        "other",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export const Issue =
  mongoose.models?.Issue || mongoose.model("Issue", IssueSchema);
