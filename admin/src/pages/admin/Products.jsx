"use client";

import { useState } from "react";
import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const [categories] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    productImage: "",
    productTitle: "",
    productDescription: "",
    category: "",
    price: "",
    size: "small",
    productDetails: [],
  });
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!formData.productName || !formData.category || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (categories.length === 0) {
      toast({
        title: "Error",
        description: "Please create at least one category first",
        variant: "destructive",
      });
      return;
    }

    setProducts([...products, formData]);
    setFormData({
      productName: "",
      productImage: "",
      productTitle: "",
      productDescription: "",
      category: "",
      price: "",
      size: "small",
      productDetails: [],
    });
    toast({
      title: "Success",
      description: "Product added successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-console-blue flex items-center gap-2">
          <span>&gt;</span>
          <span>Products</span>
        </h2>
        <p className="text-muted-foreground mt-2 font-mono text-sm">
          Manage your product catalog
        </p>
      </div>

      {categories.length === 0 && (
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive font-mono">
              ⚠ Warning: No categories found. Please create categories first
              before adding products.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card/50 backdrop-glass border-console-blue/20 console-glow">
          <CardHeader>
            <CardTitle className="text-console-blue flex items-center gap-2">
              <Plus size={20} />
              <span>Add New Product</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productName" className="text-sm font-mono">
                  Product Name *
                </Label>
                <Input
                  id="productName"
                  value={formData.productName}
                  onChange={e =>
                    setFormData({ ...formData, productName: e.target.value })
                  }
                  className="bg-muted/50 border-console-blue/20 focus:border-console-blue font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productTitle" className="text-sm font-mono">
                  Product Title *
                </Label>
                <Input
                  id="productTitle"
                  value={formData.productTitle}
                  onChange={e =>
                    setFormData({ ...formData, productTitle: e.target.value })
                  }
                  className="bg-muted/50 border-console-blue/20 focus:border-console-blue font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productImage" className="text-sm font-mono">
                Product Image URL *
              </Label>
              <Input
                id="productImage"
                value={formData.productImage}
                onChange={e =>
                  setFormData({ ...formData, productImage: e.target.value })
                }
                className="bg-muted/50 border-console-blue/20 focus:border-console-blue font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productDescription" className="text-sm font-mono">
                Description *
              </Label>
              <Textarea
                id="productDescription"
                value={formData.productDescription}
                onChange={e =>
                  setFormData({
                    ...formData,
                    productDescription: e.target.value,
                  })
                }
                className="bg-muted/50 border-console-blue/20 focus:border-console-blue font-mono min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-mono">
                  Category *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={value =>
                    setFormData({ ...formData, category: value })
                  }
                  disabled={categories.length === 0}
                >
                  <SelectTrigger className="bg-muted/50 border-console-blue/20 focus:border-console-blue font-mono">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-mono">
                  Price *
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={e =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="bg-muted/50 border-console-blue/20 focus:border-console-blue font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size" className="text-sm font-mono">
                  Size *
                </Label>
                <Select
                  value={formData.size}
                  onValueChange={value =>
                    setFormData({ ...formData, size: value })
                  }
                >
                  <SelectTrigger className="bg-muted/50 border-console-blue/20 focus:border-console-blue font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                    <SelectItem value="xxl">XXL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={categories.length === 0}
              className="w-full bg-console-blue hover:bg-console-blue-glow text-black font-bold"
            >
              <Plus size={16} />
              Add Product
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-glass border-console-blue/20">
          <CardHeader>
            <CardTitle className="text-console-blue flex items-center gap-2">
              <Package size={20} />
              <span>Products ({products.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="text-center py-8">
                <Package
                  className="mx-auto text-muted-foreground mb-2"
                  size={40}
                />
                <p className="text-sm text-muted-foreground font-mono">
                  No products yet
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="p-3 bg-muted/30 border border-console-blue/20 rounded-lg hover:border-console-blue/40 transition-all"
                  >
                    <div className="font-medium font-mono text-sm">
                      {product.productName}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">
                      {product.category} • ${product.price} • {product.size}
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

export default Products;
