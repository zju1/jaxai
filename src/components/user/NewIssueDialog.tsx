"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Список районов
const districts = [
  "Амударья",
  "Беруний",
  "Бозатау",
  "Шимбай",
  "Элликкала",
  "Кегейли",
  "Мойнак",
  "Нукус",
  "Канлыколь",
  "Кунград",
  "Караузяк",
  "Шуманай",
  "Тахиаташ",
  "Тахтакупыр",
  "Турткуль",
  "Ходжейли",
];

// Категории обращений
const categories = [
  { value: "overconsumption", label: "Перерасход" },
  { value: "power_outage", label: "Сбои в электроснабжении" },
  { value: "meter_malfunction", label: "Неисправность счётчика" },
  { value: "low_efficiency", label: "Низкая энергоэффективность" },
  { value: "tariff_issue", label: "Вопросы по тарифам" },
  { value: "technical_fault", label: "Технические неисправности" },
  { value: "power_quality", label: "Качество электроэнергии" },
  { value: "service_complaint", label: "Жалобы на обслуживание" },
  { value: "data_access_issue", label: "Проблемы доступа к данным" },
  {
    value: "savings_recommendation",
    label: "Рекомендации по энергосбережению",
  },
  { value: "other", label: "Другое" },
];

interface NewIssueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  loading: boolean;
}

export default function NewIssueDialog({
  open,
  onOpenChange,
  onSubmit,
  loading,
}: NewIssueDialogProps) {
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    // Валидация
    const newErrors: Record<string, string> = {};

    if (!district) newErrors.district = "Выберите район";
    if (!category) newErrors.category = "Выберите категорию";
    if (!content) newErrors.content = "Введите описание проблемы";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Отправка данных
    onSubmit({
      district,
      category,
      content,
    });
    setDistrict("");
    setCategory("");
    setContent("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          setDistrict("");
          setCategory("");
          setContent("");
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Новое обращение</DialogTitle>
          <DialogDescription>
            Заполните форму для создания нового обращения
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="district">Район</Label>
            <Select value={district} onValueChange={setDistrict}>
              <SelectTrigger
                id="district"
                className={errors.district ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Выберите район" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.district && (
              <p className="text-sm text-red-500">{errors.district}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Категория</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                id="category"
                className={errors.category ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">Описание проблемы</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Опишите вашу проблему подробно..."
              className={errors.content ? "border-red-500" : ""}
              rows={5}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? "Подождите..." : "Отправить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
