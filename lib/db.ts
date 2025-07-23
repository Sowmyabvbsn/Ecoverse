import { supabase, supabaseAdmin } from './supabase';

// User operations
export const getUserByEmail = async (email: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user by email:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select(`
        *,
        addresses(*)
      `)
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user by id:', error);
      return null;
    }
    
    // Transform the data to match the expected structure
    if (data && data.addresses && data.addresses.length > 0) {
      data.address = data.addresses[0];
    }
    
    return data;
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
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([{
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'BUYER'
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: any) => {
  try {
    // Update user data
    const { data, error } = await supabaseAdmin
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    // Handle address separately if provided
    if (userData.address) {
      await upsertAddress(id, userData.address);
    }
    
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Address operations
export const upsertAddress = async (userId: string, addressData: any) => {
  try {
    const { error } = await supabaseAdmin
      .from('addresses')
      .upsert({
        user_id: userId,
        street: addressData.street,
        city: addressData.city,
        state: addressData.state,
        country: addressData.country,
        zip_code: addressData.zipCode
      });
    
    if (error) throw error;
  } catch (error) {
    console.error('Error upserting address:', error);
    throw error;
  }
};

// Product operations
export const createProduct = async (productData: any) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .insert([{
        title: productData.title,
        description: productData.description,
        images: productData.images,
        seller_id: productData.sellerId,
        category: productData.category,
        price: productData.price,
        stocks: productData.stocks
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
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
    let query = supabase
      .from('products')
      .select('*');
    
    if (filters.sellerId) {
      query = query.eq('seller_id', filters.sellerId);
    }
    
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    
    query = query.order('created_at', { ascending: false });
    
    if (filters.limit) {
      const from = ((filters.page || 1) - 1) * filters.limit;
      const to = from + filters.limit - 1;
      query = query.range(from, to);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching product by id:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Cart operations
export const getCartByUserId = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('cart')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return data || [];
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
    
    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();
    
    if (existingItem) {
      // Update quantity
      const { data, error } = await supabaseAdmin
        .from('cart')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } else {
      // Insert new item
      const { data, error } = await supabaseAdmin
        .from('cart')
        .insert([{
          user_id: userId,
          product_id: productId,
          quantity,
          price: product.price
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartQuantity = async (cartId: string, quantity: number) => {
  try {
    if (quantity <= 0) {
      const { error } = await supabaseAdmin
        .from('cart')
        .delete()
        .eq('id', cartId);
      
      if (error) throw error;
      return true;
    } else {
      const { data, error } = await supabaseAdmin
        .from('cart')
        .update({ quantity })
        .eq('id', cartId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    throw error;
  }
};

export const deleteCartItem = async (cartId: string) => {
  try {
    const { error } = await supabaseAdmin
      .from('cart')
      .delete()
      .eq('id', cartId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};