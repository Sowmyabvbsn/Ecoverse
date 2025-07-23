/*
  # EcoBid Database Schema Migration

  1. New Tables
    - `users` - User accounts with authentication support
    - `accounts` - NextAuth account linking
    - `sessions` - NextAuth session management  
    - `verification_tokens` - NextAuth email verification
    - `addresses` - User shipping addresses
    - `products` - Product listings
    - `reviews` - Product reviews and ratings
    - `cart` - Shopping cart items
    - `wishlist` - User wishlists

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Proper foreign key constraints

  3. Features
    - UUID primary keys with automatic generation
    - JSON columns for flexible data storage
    - Proper indexing for performance
    - Timestamp tracking for audit trails
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text,
    email text UNIQUE NOT NULL,
    image text,
    email_verified timestamptz,
    mobile bigint,
    password text,
    role text DEFAULT 'BUYER' CHECK (role IN ('BUYER', 'SELLER', 'ADMIN')),
    eco_loyalty_points integer DEFAULT 0,
    carbon_offset_contribution decimal(10,2) DEFAULT 0,
    is_eco_certified_seller boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Accounts table for NextAuth
CREATE TABLE IF NOT EXISTS accounts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type text NOT NULL,
    provider text NOT NULL,
    provider_account_id text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    created_at timestamptz DEFAULT now(),
    UNIQUE(provider, provider_account_id)
);

-- Sessions table for NextAuth
CREATE TABLE IF NOT EXISTS sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token text UNIQUE NOT NULL,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires timestamptz NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Verification tokens table for NextAuth
CREATE TABLE IF NOT EXISTS verification_tokens (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamptz NOT NULL,
    PRIMARY KEY (identifier, token)
);

-- Addresses table
CREATE TABLE IF NOT EXISTS addresses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    street text,
    city text,
    state text,
    country text,
    zip_code text,
    user_id uuid UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NOT NULL,
    images jsonb DEFAULT '[]'::jsonb,
    seller_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category jsonb DEFAULT '[]'::jsonb,
    price integer NOT NULL,
    stocks integer NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment text,
    created_at timestamptz DEFAULT now()
);

-- Cart table
CREATE TABLE IF NOT EXISTS cart (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity integer DEFAULT 1,
    price integer NOT NULL,
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id, product_id)
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id, product_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_session_token ON sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data" ON users
    FOR SELECT TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE TO authenticated
    USING (auth.uid() = id);

-- RLS Policies for accounts table
CREATE POLICY "Users can read own accounts" ON accounts
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- RLS Policies for sessions table
CREATE POLICY "Users can read own sessions" ON sessions
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- RLS Policies for addresses table
CREATE POLICY "Users can read own addresses" ON addresses
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses" ON addresses
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses" ON addresses
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses" ON addresses
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

-- RLS Policies for products table
CREATE POLICY "Anyone can read products" ON products
    FOR SELECT TO authenticated, anon
    USING (true);

CREATE POLICY "Sellers can insert own products" ON products
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update own products" ON products
    FOR UPDATE TO authenticated
    USING (auth.uid() = seller_id);

CREATE POLICY "Sellers can delete own products" ON products
    FOR DELETE TO authenticated
    USING (auth.uid() = seller_id);

-- RLS Policies for reviews table
CREATE POLICY "Anyone can read reviews" ON reviews
    FOR SELECT TO authenticated, anon
    USING (true);

CREATE POLICY "Users can insert own reviews" ON reviews
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON reviews
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews" ON reviews
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

-- RLS Policies for cart table
CREATE POLICY "Users can read own cart" ON cart
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items" ON cart
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items" ON cart
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items" ON cart
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

-- RLS Policies for wishlist table
CREATE POLICY "Users can read own wishlist" ON wishlist
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wishlist items" ON wishlist
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own wishlist items" ON wishlist
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();