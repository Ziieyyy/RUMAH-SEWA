import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase is not initialized. Check your environment variables.");
    // Return a mock client placeholder just to avoid breaking the build
    const chainableMock = {
      select: () => chainableMock,
      eq: () => chainableMock,
      order: () => chainableMock,
      single: () => chainableMock,
      insert: () => chainableMock,
      update: () => chainableMock,
      delete: () => chainableMock,
      then: (resolve: any) => resolve({ data: null, error: new Error("Supabase is mocked") })
    };

    return {
      auth: { getUser: async () => ({ data: { user: null } }) },
      from: () => chainableMock,
      storage: {
        from: () => ({
          upload: async () => ({ error: new Error("Supabase is mocked") }),
          getPublicUrl: () => ({ data: { publicUrl: "" } })
        })
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
