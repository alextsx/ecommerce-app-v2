-- Create new generated column
ALTER TABLE "products" ADD COLUMN "rating" DECIMAL(3,2) DEFAULT 0;

-- Create function to update rating  
CREATE FUNCTION update_product_rating() RETURNS TRIGGER AS $$
BEGIN
  UPDATE "products" SET 
    "rating" = (SELECT AVG("rating") FROM "reviews" 
                WHERE "reviews"."productId" = NEW."productId")
  WHERE "id" = NEW."productId";
  
  RETURN NEW;  
END;
$$ LANGUAGE plpgsql;

-- Trigger function when reviews change
CREATE TRIGGER update_ratings
  AFTER INSERT OR UPDATE ON "reviews"
  FOR EACH ROW
  EXECUTE PROCEDURE update_product_rating();