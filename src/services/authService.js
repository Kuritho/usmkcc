// src/services/authService.js
import { supabase } from '../supabase/supabaseClient';

export const authService = {
  // Admin login with Supabase
  async adminLogin(username, password) {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .eq('role', 'admin')
        .single();

      if (error) {
        console.error('Admin login error:', error);
        return { 
          success: false, 
          error: 'Invalid username or password.' 
        };
      }
      
      // Check password against password_hash
      if (data.password_hash === password) {
        // Store session
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminUser', JSON.stringify({
          id: data.id,
          username: data.username,
          role: data.role || 'admin'
        }));
        
        return { 
          success: true, 
          user: {
            id: data.id,
            username: data.username,
            role: data.role || 'admin'
          }
        };
      } else {
        return { 
          success: false, 
          error: 'Invalid username or password.' 
        };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      };
    }
  },

  // RESO Panel login
  async resoLogin(username, password) {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .eq('role', 'reso')
        .single();

      if (error) {
        console.error('RESO login error:', error);
        return { 
          success: false, 
          error: 'Invalid username or password.' 
        };
      }
      
      // Check password against password_hash
      if (data.password_hash === password) {
        // Store RESO session
        localStorage.setItem('resoAuthenticated', 'true');
        localStorage.setItem('resoUser', JSON.stringify({
          id: data.id,
          username: data.username,
          role: data.role || 'reso'
        }));
        
        return { 
          success: true, 
          user: {
            id: data.id,
            username: data.username,
            role: data.role || 'reso'
          }
        };
      } else {
        return { 
          success: false, 
          error: 'Invalid username or password.' 
        };
      }
    } catch (error) {
      console.error('RESO login error:', error);
      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      };
    }
  },

  // Generic login that handles both admin and reso
  async login(username, password, role) {
    if (role === 'admin') {
      return this.adminLogin(username, password);
    } else if (role === 'reso') {
      return this.resoLogin(username, password);
    } else {
      return { 
        success: false, 
        error: 'Invalid role specified.' 
      };
    }
  },

  // Logout - clears both admin and reso sessions
  async logout() {
    try {
      // Clear local storage
      localStorage.removeItem('adminAuthenticated');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('resoAuthenticated');
      localStorage.removeItem('resoUser');
      
      // Sign out from Supabase auth if using it
      const { error } = await supabase.auth.signOut();
      if (error) console.warn('Supabase signout warning:', error);
      
      return { success: true };
    } catch (error) {
      // Still clear local storage even if Supabase signout fails
      localStorage.removeItem('adminAuthenticated');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('resoAuthenticated');
      localStorage.removeItem('resoUser');
      return { success: true };
    }
  },

  // Check if any user is authenticated
  isAuthenticated() {
    const isAdminAuth = localStorage.getItem('adminAuthenticated') === 'true';
    const isResoAuth = localStorage.getItem('resoAuthenticated') === 'true';
    const adminUser = localStorage.getItem('adminUser');
    const resoUser = localStorage.getItem('resoUser');
    
    // Check admin session
    if (isAdminAuth && adminUser) {
      try {
        JSON.parse(adminUser);
        return true;
      } catch {
        // Invalid admin session, clear it
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminUser');
      }
    }
    
    // Check RESO session
    if (isResoAuth && resoUser) {
      try {
        JSON.parse(resoUser);
        return true;
      } catch {
        // Invalid RESO session, clear it
        localStorage.removeItem('resoAuthenticated');
        localStorage.removeItem('resoUser');
      }
    }
    
    return false;
  },

  // Check if authenticated with specific role
  isAuthenticatedWithRole(role) {
    if (role === 'admin') {
      const isAuth = localStorage.getItem('adminAuthenticated') === 'true';
      const adminUser = localStorage.getItem('adminUser');
      if (isAuth && adminUser) {
        try {
          const user = JSON.parse(adminUser);
          return user.role === 'admin';
        } catch {
          return false;
        }
      }
      return false;
    } else if (role === 'reso') {
      const isAuth = localStorage.getItem('resoAuthenticated') === 'true';
      const resoUser = localStorage.getItem('resoUser');
      if (isAuth && resoUser) {
        try {
          const user = JSON.parse(resoUser);
          return user.role === 'reso';
        } catch {
          return false;
        }
      }
      return false;
    }
    return false;
  },

  // Get current user (checks both admin and reso sessions)
  getCurrentUser() {
    // Check admin session first
    const adminUser = localStorage.getItem('adminUser');
    if (adminUser) {
      try {
        const user = JSON.parse(adminUser);
        if (user.role === 'admin') {
          return user;
        }
      } catch {
        // Invalid JSON, ignore
      }
    }
    
    // Check RESO session
    const resoUser = localStorage.getItem('resoUser');
    if (resoUser) {
      try {
        const user = JSON.parse(resoUser);
        if (user.role === 'reso') {
          return user;
        }
      } catch {
        // Invalid JSON, ignore
      }
    }
    
    return null;
  },

  // Get user role
  getUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  },

  // Get admin user specifically
  getAdminUser() {
    const adminUser = localStorage.getItem('adminUser');
    if (adminUser) {
      try {
        return JSON.parse(adminUser);
      } catch {
        return null;
      }
    }
    return null;
  },

  // Get RESO user specifically
  getResoUser() {
    const resoUser = localStorage.getItem('resoUser');
    if (resoUser) {
      try {
        return JSON.parse(resoUser);
      } catch {
        return null;
      }
    }
    return null;
  },

  // Update user session
  updateSession(user) {
    if (user.role === 'admin') {
      localStorage.setItem('adminUser', JSON.stringify(user));
      localStorage.setItem('adminAuthenticated', 'true');
    } else if (user.role === 'reso') {
      localStorage.setItem('resoUser', JSON.stringify(user));
      localStorage.setItem('resoAuthenticated', 'true');
    }
  },

  // Check if admin is authenticated (backward compatibility)
  isAdminAuthenticated() {
    return this.isAuthenticatedWithRole('admin');
  },

  // Check if RESO is authenticated
  isResoAuthenticated() {
    return this.isAuthenticatedWithRole('reso');
  }
};

export default authService;