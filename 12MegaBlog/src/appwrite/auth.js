import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";
import { AppUserError, getFriendlyMessage } from '../utils/errorMapper.js';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

    }

    // Create user account with email & password
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Automatically log in after account creation
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error);
            const msg = getFriendlyMessage(error, 'auth.signup');
            throw new AppUserError(msg, { code: error?.code, cause: error, context: 'auth.signup' });
        }
    }

    // Log in user with email & password
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            const msg = getFriendlyMessage(error, 'auth.login');
            throw new AppUserError(msg, { code: error?.code, cause: error, context: 'auth.login' });
        }
    }

    // Check if user has an active session
    async getSession() {
        try {
            return await this.account.getSession('current');
        } catch (error) {
            // No active session - user is not logged in
            return null;
        }
    }

    // Get current logged-in user
    async getCurrentUser() {
        try {
            // First check if there's an active session to avoid unnecessary API calls
            const session = await this.getSession();
            if (!session) {
                return null;
            }
            return await this.account.get();
        } catch (error) {
            // Don't log errors for unauthenticated users - this is expected
            if (error.code === 401) {
                // User is not logged in (guest user) - this is normal
                return null;
            }
            // Log other unexpected errors
            console.error("AuthService :: getCurrentUser :: error", error);
        }

        return null;
    }

    // Logout current session
    async logout() {
        
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;
