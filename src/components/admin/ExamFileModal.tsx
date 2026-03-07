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
import { apiFetch } from "@/lib/api";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ExamFile {
  id?: number;
  label: string;
  file_url: string;
  display_order: number;
}

interface ExamFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultId: number;
  editData: ExamFile | null;
  onSuccess: () => void;
}

export const ExamFileModal = ({
  isOpen,
  onClose,
  resultId,
  editData,
  onSuccess,
}: ExamFileModalProps) => {
  const { token } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ExamFile>({
    label: "",
    file_url: "",
    display_order: 0,
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        label: "",
        file_url: "",
        display_order: 0,
      });
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      setLoading(true);
      const url = editData 
        ? `/api/exams/exam-file/${editData.id}` 
        : "/api/exams/exam-file";
      
      const method = editData ? "PUT" : "POST";

      await apiFetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, result_id: resultId }),
      });

      toast.success(editData ? "File updated" : "File added");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Exam File Save Error", error);
      toast.error("Failed to save file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editData ? "Edit File" : "Add New File"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="label">File Label</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="e.g. Semester-I Result"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="file_url">File URL</Label>
              <Input
                id="file_url"
                value={formData.file_url}
                onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                placeholder="https://..."
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-gold hover:bg-gold/90 text-navy font-bold">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editData ? "Update File" : "Add File"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
