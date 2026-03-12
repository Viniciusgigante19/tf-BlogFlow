DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'blogdb') THEN
      CREATE DATABASE blogdb;
   END IF;
END
$$;