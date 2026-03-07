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

export interface StaffMember {
  id?: number;
  name: string;
  designation: string;
  image_url: string;
  category_id: number;
  display_order: number;
  is_active: number;
}

interface CategoryProps {
  id: number;
  title: string;
  slug: string;
  icon: string;
}

interface StaffEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffData: StaffMember | null;
  categories: CategoryProps[];
  defaultCategoryId?: number;
  onSuccess: () => void;
}

export const StaffEditModal = ({
  isOpen,
  onClose,
  staffData,
  categories,
  defaultCategoryId,
  onSuccess,
}: StaffEditModalProps) => {
  const { token } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<StaffMember>({
    name: "",
    designation: "",
    image_url: "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png",
    category_id: 0,
    display_order: 0,
    is_active: 1,
  });

  useEffect(() => {
    if (staffData) {
      setFormData(staffData);
    } else {
      setFormData({
        name: "",
        designation: "",
        image_url: "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png",
        category_id: defaultCategoryId || (categories.length > 0 ? categories[0].id : 0),
        display_order: 0,
        is_active: 1,
      });
    }
  }, [staffData, isOpen, categories, defaultCategoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      setLoading(true);
      const url = staffData 
        ? `/api/admin/staff/${staffData.id}` 
        : "/api/admin/staff";
      
      const method = staffData ? "PUT" : "POST";

      await apiFetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      toast.success(staffData ? "Staff updated" : "Staff added");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Staff Save Error", error);
      toast.error("Failed to save staff member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{staffData ? "Edit Staff Member" : "Add New Staff Member"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Mr. John Doe"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="e.g. Section Officer"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
              />
              <div className="mt-2 flex justify-center">
                <img 
                  src={formData.image_url || "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png"} 
                  alt="Preview" 
                  className="h-20 w-20 rounded-full object-cover border"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://dsnlu.ac.in/storage/2022/12/user-placeholder.png" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={formData.category_id.toString()}
                  onValueChange={(val) => setFormData({ ...formData, category_id: parseInt(val) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-gold hover:bg-gold/90 text-navy">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {staffData ? "Update Staff" : "Add Staff"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
