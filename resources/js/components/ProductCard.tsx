import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  onClick?: () => void;
}

export function ProductCard({ name, price, image, rating, category, onClick }: ProductCardProps) {
  return (
    <Card 
      className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 border-border"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-card shadow-md hover:bg-primary hover:text-primary-foreground transition-colors">
          <Heart className="w-4 h-4" />
        </button>
        <div className="absolute top-3 left-3 px-2 py-1 bg-secondary text-secondary-foreground rounded">
          {category}
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="line-clamp-1">{name}</h3>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) ? "fill-secondary" : "fill-muted"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
            <span className="ml-1 text-muted-foreground">({rating})</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-primary">${price.toFixed(2)}</span>
          <Button size="sm" className="bg-primary hover:bg-accent">
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
}