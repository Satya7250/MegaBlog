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

    // Get current logged-in user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
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
