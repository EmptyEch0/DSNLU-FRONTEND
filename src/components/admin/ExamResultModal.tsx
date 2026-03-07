import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiFetch } from "@/lib/api";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export interface ExamResult {
  id?: number;
  title: string;
  slug: string;
  result_date: string;
  type: 'pdf' | 'internal' | 'url';
  link?: string;
  is_active?: number;
}

interface ExamResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData: ExamResult | null;
  onSuccess: () => void;
}

export const ExamResultModal = ({
  isOpen,
  onClose,
  editData,
  onSuccess,
}: ExamResultModalProps) => {
  const { token } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ExamResult>({
    title: "",
    slug: "",
    result_date: "",
    type: "pdf",
    link: "",
    is_active: 1,
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        title: "",
        slug: "",
        result_date: "",
        type: "pdf",
        link: "",
        is_active: 1,
      });
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      setLoading(true);
      const url = editData 
        ? `/api/exams/exam-result/${editData.id}` 
        : "/api/exams/exam-result";
      
      const method = editData ? "PUT" : "POST";

      await apiFetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      toast.success(editData ? "Result updated" : "Result added");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Exam Result Save Error", error);
      toast.error("Failed to save exam result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editData ? "Edit Exam Result" : "Add New Exam Result"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Result Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. LL.M. Even Semester Results"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slug">Slug (Unique URL)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/ /g, "-") })}
                placeholder="e.g. llm-even-2025"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="result_date">Publish Date</Label>
                <Input
                  id="result_date"
                  value={formData.result_date}
                  onChange={(e) => setFormData({ ...formData, result_date: e.target.value })}
                  placeholder="e.g. 24 Jan, 2026"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Result Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(val: 'pdf' | 'internal' | 'url') => setFormData({ ...formData, type: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="internal">Internal (Multi-file)</SelectItem>
                    <SelectItem value="url">External URL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(formData.type === "pdf" || formData.type === "url") && (
              <div className="grid gap-2">
                <Label htmlFor="link">Result Link (PDF or Website)</Label>
                <Input
                  id="link"
                  value={formData.link || ""}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://..."
                  required
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-gold hover:bg-gold/90 text-navy font-bold">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editData ? "Update Result" : "Add Result"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
