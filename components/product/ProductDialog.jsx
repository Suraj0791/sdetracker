import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  PRODUCT_CATEGORIES,
  APPLICATION_STATUSES,
  PRIORITIES,
  REFERRAL_STATUSES,
  REFERRAL_FRIENDLY,
} from "@/lib/constants";

export default function ProductDialog({ job, onSave, onClose }) {
  const [formData, setFormData] = useState({
    Company: "",
    Category: "BigTech",
    Country: "India",
    Product_Domain: "",
    Target_Role: "Product Analyst Intern",
    Hiring_Season: "Summer",
    Internship_Type: "",
    Conversion_Potential: "Medium",
    Case_Interview_Focus: "",
    SQL_Level: "Intermediate",
    Product_Sense_Level: "Intermediate",
    Analytics_Tools: "",
    Stipend_Monthly: "",
    Expected_FTE_CTC: "",
    Referral_Friendly: "Medium",
    Referral_Status: "Not Contacted",
    Referral_Name: "",
    LinkedIn_Profile: "",
    Application_Status: "Not Applied",
    Followup_Date: "",
    Careers_Page: "",
    Notes: "",
    Priority: "3",
  });

  useEffect(() => {
    if (job) {
      setFormData({ ...job });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold">
            {job ? "Edit Product Job" : "Add Product Job"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)] scrollbar-thin"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="Company"
                value={formData.Company}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                name="Category"
                value={formData.Category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Role *</label>
              <input
                type="text"
                name="Target_Role"
                value={formData.Target_Role}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Product Domain
              </label>
              <input
                type="text"
                name="Product_Domain"
                value={formData.Product_Domain}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                name="Application_Status"
                value={formData.Application_Status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {APPLICATION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                name="Priority"
                value={formData.Priority}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                SQL Level
              </label>
              <select
                name="SQL_Level"
                value={formData.SQL_Level}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="None">None</option>
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Analytics Tools
              </label>
              <input
                type="text"
                name="Analytics_Tools"
                value={formData.Analytics_Tools}
                onChange={handleChange}
                placeholder="e.g., SQL, Excel, Tableau"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Case Interview Focus
              </label>
              <input
                type="text"
                name="Case_Interview_Focus"
                value={formData.Case_Interview_Focus}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Careers Page URL
              </label>
              <input
                type="url"
                name="Careers_Page"
                value={formData.Careers_Page}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <textarea
                name="Notes"
                value={formData.Notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors"
          >
            {job ? "Update" : "Add"} Job
          </button>
        </div>
      </div>
    </div>
  );
}
