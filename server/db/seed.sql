TRUNCATE TABLE recipes RESTART IDENTITY CASCADE;

INSERT INTO recipes
  (name, description, image_url, ingredients, steps, category)
VALUES
(
  'KareKare',
  '',
  '/assets/recipes/karekare.webp',
  '[]'::jsonb,
  '[]'::jsonb,
  'Entrée'
),
(
  'Fried Cauliflower',
  '',
  '/assets/recipes/fried-cauliflower.jpg',
  '[]'::jsonb,
  '[]'::jsonb,
  'Appetizer'
),
(
  'Cabbage Ball',
  '',
  '/assets/recipes/cabbage-ball.jpg',
  '[]'::jsonb,
  '[]'::jsonb,
  'Appetizer'
);