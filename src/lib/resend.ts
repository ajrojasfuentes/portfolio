// Resend client singleton (server-only)
// Mock mode: logs to console when RESEND_API_KEY is missing

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function sendEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.log("[MOCK EMAIL]", data);
    return { success: true };
  }

  try {
    // Real Resend API call would go here
    // For now, mock mode is the default
    console.log("[MOCK EMAIL]", data);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
