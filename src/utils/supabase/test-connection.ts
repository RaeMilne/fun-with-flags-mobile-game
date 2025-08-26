import { supabase } from './client';

export async function testSupabaseConnection() {
  try {
    // Try to query a system table to test connection
    const { error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .limit(1);

    if (error) {
      // If we get a permission error, that means we can reach the API
      if (error.message.includes('permission') || error.message.includes('schema')) {
        return { success: true, message: 'Connection successful - API reachable' };
      }
      return { success: false, message: `Connection failed: ${error.message}` };
    }

    return { success: true, message: 'Connection successful' };
  } catch (err) {
    return { 
      success: false, 
      message: `Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}` 
    };
  }
}
