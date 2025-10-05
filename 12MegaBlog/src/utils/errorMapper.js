export class AppUserError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'AppUserError';
    this.code = options.code;
    this.cause = options.cause;
    this.context = options.context;
  }
}

// Map Appwrite and generic errors to friendly user-facing messages
export function getFriendlyMessage(err, context = 'general') {
  // If already an AppUserError, keep its message
  if (err instanceof AppUserError) return err.message;

  const code = err?.code || err?.response?.status;
  const rawMsg = (err?.message || '').toLowerCase();

  // Network issues
  if (rawMsg.includes('network') || rawMsg.includes('fetch failed')) {
    return 'Network issue — please check your connection and try again.';
  }

  // Auth contexts
  if (context.startsWith('auth.')) {
    if (code === 401 || rawMsg.includes('invalid credentials') || rawMsg.includes('invalid email/password')) {
      return 'Incorrect email or password. Please try again.';
    }
    if (code === 429) {
      return 'Too many attempts. Please wait a moment and try again.';
    }
    if (code === 409 || rawMsg.includes('already exists')) {
      return 'An account with this email already exists.';
    }
    return 'We couldn’t complete the authentication. Please try again.';
  }

  // Storage / image
  if (context.startsWith('image.')) {
    if (code === 404) return 'Image not found or no longer available.';
    if (code === 403) return 'You don’t have permission to view this image.';
    return 'We couldn’t load the image. You can still read the post.';
  }

  // Database / posts
  if (context.startsWith('post.')) {
    if (code === 404) return 'That post was not found. It may have been removed.';
    if (code === 403) return 'You don’t have permission to do that.';
    return 'Something went wrong with the post. Please try again.';
  }

  // Default fallback
  return 'Something went wrong. Please try again.';
}