
-- page_number : 0 for the first page, 2 for the second ...etc


-- postgres query
SELECT * 
FROM products 
WHERE price BETWEEN 50 AND 200 
ORDER BY price ASC 
LIMIT 10 OFFSET ((:page_number - 1) * 10);

-- we can create index using this :
CREATE INDEX idx_price_category ON product (price, category);
-- creating a composite index on these columns can significantly speed up the queries.




--  mongodb query
db.products.find({ category: "Electronics" })
  .sort({ price: -1 })  
  .skip((page_number - 1) * 5) 
  .limit(5); 
--  in sort (-1) for descending order




-- Optimizing queries for high-traffic scenarios 

-- 1. Indexing:
  -- we can use indexing to speed up queries, indexing allows the database to quickly
  -- locate rows without scanning the entire table, improving query performance for filtering, sorting


-- 2. Partitioning:
  -- Partitioning improves performance by splitting large tables into smaller, more manageable pieces, reducing the amount of data scanned for queries



-- 3. Caching:
  -- Caching reduces database load by storing frequently accessed data in memory, enabling faster retrieval and improving response times for repeated queries.





