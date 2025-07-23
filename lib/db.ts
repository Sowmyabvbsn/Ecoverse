import pool, { executeQuery } from './mysql';

// User operations
export const getUserByEmail = async (email: string) => {
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const results = await executeQuery(query, [email]) as any[];
    return results[0] || null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const query = 'SELECT * FROM users WHERE id = ?';
    const results = await executeQuery(query, [id]) as any[];
    return results[0] || null;
  } catch (error) {
    console.error('Error fetching user by id:', error);
    return null;
  }
};

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) => {
  try {
    const query = `
      INSERT INTO users (name, email, password, role) 
      VALUES (?, ?, ?, ?)
    `;
    const result = await executeQuery(query, [
      userData.name,
      userData.email,
      userData.password,
      userData.role || 'BUYER'
    ]);
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: any) => {
  try {
    const fields = [];
    const values = [];
    
    for (const [key, value] of Object.entries(userData)) {
      if (key !== 'address' && value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    
    if (fields.length === 0) return null;
    
    values.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    
    await executeQuery(query, values);
    
    // Handle address separately if provided
    if (userData.address) {
      await upsertAddress(id, userData.address);
    }
    
    return await getUserById(id);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Address operations
export const upsertAddress = async (userId: string, addressData: any) => {
  try {
    const checkQuery = 'SELECT id FROM addresses WHERE user_id = ?';
    const existing = await executeQuery(checkQuery, [userId]) as any[];
    
    if (existing.length > 0) {
      // Update existing address
      const updateQuery = `
        UPDATE addresses 
        SET street = ?, city = ?, state = ?, country = ?, zip_code = ?
        WHERE user_id = ?
      `;
      await executeQuery(updateQuery, [
        addressData.street,
        addressData.city,
        addressData.state,
        addressData.country,
        addressData.zipCode,
        userId
      ]);
    } else {
      // Create new address
      const insertQuery = `
        INSERT INTO addresses (user_id, street, city, state, country, zip_code)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await executeQuery(insertQuery, [
        userId,
        addressData.street,
        addressData.city,
        addressData.state,
        addressData.country,
        addressData.zipCode
      ]);
    }
  } catch (error) {
    console.error('Error upserting address:', error);
    throw error;
  }
};

// Product operations
export const createProduct = async (productData: any) => {
  try {
    const query = `
      INSERT INTO products (title, description, images, seller_id, category, price, stocks)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await executeQuery(query, [
      productData.title,
      productData.description,
      JSON.stringify(productData.images),
      productData.sellerId,
      JSON.stringify(productData.category),
      productData.price,
      productData.stocks
    ]);
    return result;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getProducts = async (filters: {
  sellerId?: string;
  search?: string;
  page?: number;
  limit?: number;
} = {}) => {
  try {
    let query = 'SELECT * FROM products';
    const conditions = [];
    const params = [];
    
    if (filters.sellerId) {
      conditions.push('seller_id = ?');
      params.push(filters.sellerId);
    }
    
    if (filters.search) {
      conditions.push('(title LIKE ? OR description LIKE ?)');
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY created_at DESC';
    
    if (filters.limit) {
      const offset = ((filters.page || 1) - 1) * filters.limit;
      query += ` LIMIT ${filters.limit} OFFSET ${offset}`;
    }
    
    const results = await executeQuery(query, params) as any[];
    
    // Parse JSON fields
    return results.map(product => ({
      ...product,
      images: JSON.parse(product.images || '[]'),
      category: JSON.parse(product.category || '[]')
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const query = 'SELECT * FROM products WHERE id = ?';
    const results = await executeQuery(query, [id]) as any[];
    
    if (results.length === 0) return null;
    
    const product = results[0];
    return {
      ...product,
      images: JSON.parse(product.images || '[]'),
      category: JSON.parse(product.category || '[]')
    };
  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const query = 'DELETE FROM products WHERE id = ?';
    const result = await executeQuery(query, [id]);
    return result;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Cart operations
export const getCartByUserId = async (userId: string) => {
  try {
    const query = `
      SELECT c.*, p.title, p.images, p.price as product_price
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
    `;
    const results = await executeQuery(query, [userId]) as any[];
    
    return results.map(item => ({
      ...item,
      product: {
        id: item.product_id,
        title: item.title,
        images: JSON.parse(item.images || '[]'),
        price: item.product_price
      }
    }));
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (userId: string, productId: string, quantity: number = 1) => {
  try {
    // Get product price
    const product = await getProductById(productId);
    if (!product) throw new Error('Product not found');
    
    const query = `
      INSERT INTO cart (user_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    `;
    
    const result = await executeQuery(query, [userId, productId, quantity, product.price]);
    return result;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartQuantity = async (cartId: string, quantity: number) => {
  try {
    if (quantity <= 0) {
      const deleteQuery = 'DELETE FROM cart WHERE id = ?';
      return await executeQuery(deleteQuery, [cartId]);
    } else {
      const updateQuery = 'UPDATE cart SET quantity = ? WHERE id = ?';
      return await executeQuery(updateQuery, [quantity, cartId]);
    }
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    throw error;
  }
};

export const deleteCartItem = async (cartId: string) => {
  try {
    const query = 'DELETE FROM cart WHERE id = ?';
    const result = await executeQuery(query, [cartId]);
    return result;
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};

export default pool;