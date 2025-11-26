"use client";

import { Plus, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (categories.includes(newCategory.trim())) {
      toast({
        title: "Error",
        description: "Category already exists",
        variant: "destructive",
      });
      return;
    }

    setCategories([...categories, newCategory.trim()]);
    setNewCategory("");
    toast({
      title: "Success",
      description: "Category added successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-console-blue flex items-center gap-2">
            <span>&gt;</span>
            <span>Categories</span>
          </h2>
          <p className="text-muted-foreground mt-2 font-mono text-sm">
            Manage product categories
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-glass border-console-blue/20 console-glow">
          <CardHeader>
            <CardTitle className="text-console-blue flex items-center gap-2">
              <Plus size={20} />
              <span>Add New Category</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-mono">
                Category Name
              </Label>
              <Input
                id="category"
                placeholder="e.g., Electronics, Clothing..."
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                onKeyPress={e => e.key === "Enter" && handleAddCategory()}
                className="bg-muted/50 border-console-blue/20 focus:border-console-blue font-mono"
              />
            </div>
            <Button
              onClick={handleAddCategory}
              className="w-full bg-console-blue hover:bg-console-blue-glow text-black font-bold"
            >
              <Plus size={16} />
              Add Category
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-glass border-console-blue/20">
          <CardHeader>
            <CardTitle className="text-console-blue flex items-center gap-2">
              <FolderTree size={20} />
              <span>Existing Categories ({categories.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {categories.length === 0 ? (
              <div className="text-center py-8">
                <FolderTree
                  className="mx-auto text-muted-foreground mb-2"
                  size={40}
                />
                <p className="text-sm text-muted-foreground font-mono">
                  No categories yet. Add your first one!
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="p-3 bg-muted/30 border border-console-blue/20 rounded-lg hover:border-console-blue/40 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-console-blue font-mono text-xs">
                        #{index + 1}
                      </span>
                      <span className="font-medium font-mono">{category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Categories;
