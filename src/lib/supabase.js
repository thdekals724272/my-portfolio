import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pzgkprifhxlzrkdygvvc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6Z2twcmlmaHhsenJrZHlndnZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyOTM4NzUsImV4cCI6MjA5Nzg2OTg3NX0.jSIs6UnSG7y6ayW1-3SupeQxa0R92O59tq0nEpU-Qrc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
