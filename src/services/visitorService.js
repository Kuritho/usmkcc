// src/services/visitorService.js
import { supabase } from '../supabase/supabaseClient';

// Get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Track a new visitor
export const trackVisitor = async () => {
  try {
    const today = getTodayDate();
    
    // Check if we already tracked a visitor today (using localStorage)
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    
    // If already visited today, don't track again
    if (lastVisitDate === today) {
      return { success: true, alreadyTracked: true };
    }
    
    // Track new visitor
    const { data, error } = await supabase
      .from('visitors')
      .insert([
        { 
          visit_date: today,
          user_agent: navigator.userAgent,
          referrer: document.referrer || 'direct',
          page_visited: window.location.pathname
        }
      ]);
    
    if (error) {
      console.error('Error tracking visitor:', error);
      return { success: false, error: error.message };
    }
    
    // Store today's date in localStorage
    localStorage.setItem('lastVisitDate', today);
    
    return { success: true, alreadyTracked: false };
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return { success: false, error: error.message };
  }
};

// Get total visitor count
export const getTotalVisitors = async () => {
  try {
    const { count, error } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error getting total visitors:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, count };
  } catch (error) {
    console.error('Error getting total visitors:', error);
    return { success: false, error: error.message };
  }
};

// Get today's visitor count
export const getTodayVisitors = async () => {
  try {
    const today = getTodayDate();
    
    const { count, error } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true })
      .eq('visit_date', today);
    
    if (error) {
      console.error('Error getting today\'s visitors:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, count };
  } catch (error) {
    console.error('Error getting today\'s visitors:', error);
    return { success: false, error: error.message };
  }
};

// Get visitor statistics (total, today, this week, this month)
export const getVisitorStats = async () => {
  try {
    const today = getTodayDate();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];
    
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    const monthAgoStr = monthAgo.toISOString().split('T')[0];
    
    // Get total
    const { count: totalCount, error: totalError } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true });
    
    if (totalError) throw totalError;
    
    // Get today
    const { count: todayCount, error: todayError } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true })
      .eq('visit_date', today);
    
    if (todayError) throw todayError;
    
    // Get this week
    const { count: weekCount, error: weekError } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true })
      .gte('visit_date', weekAgoStr);
    
    if (weekError) throw weekError;
    
    // Get this month
    const { count: monthCount, error: monthError } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true })
      .gte('visit_date', monthAgoStr);
    
    if (monthError) throw monthError;
    
    return { 
      success: true, 
      data: {
        total: totalCount || 0,
        today: todayCount || 0,
        thisWeek: weekCount || 0,
        thisMonth: monthCount || 0
      }
    };
  } catch (error) {
    console.error('Error getting visitor stats:', error);
    return { success: false, error: error.message };
  }
};