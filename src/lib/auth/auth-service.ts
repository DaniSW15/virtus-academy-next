// Tipos para las respuestas de la API
interface AuthResponse {
    user: {
        id: string;
        email: string;
        name: string;
    };
    token: string;
}

class AuthService {
    private static instance: AuthService;
    private static baseUrl = '/api/auth'; // Ajusta esto según tu API

    private constructor() {}

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(email: string, password: string, rememberMe: boolean = false): Promise<AuthResponse> {
        try {
            const response = await fetch(`${AuthService.baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, rememberMe }),
            });

            if (!response.ok) {
                throw new Error('Error en la autenticación');
            }

            const data = await response.json();
            // Guardar el token en localStorage
            localStorage.setItem('auth_token', data.token);
            return data;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    async register(email: string, password: string, name: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`${AuthService.baseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });

            if (!response.ok) {
                throw new Error('Error en el registro');
            }

            const data = await response.json();
            localStorage.setItem('auth_token', data.token);
            return data;
        } catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
    }

    async verifyCode(code: string): Promise<boolean> {
        try {
            const response = await fetch(`${AuthService.baseUrl}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                throw new Error('Código inválido');
            }

            return true;
        } catch (error) {
            console.error('Error en verificación:', error);
            throw error;
        }
    }

    async resendVerificationCode(): Promise<void> {
        try {
            const response = await fetch(`${AuthService.baseUrl}/resend-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al reenviar el código');
            }
        } catch (error) {
            console.error('Error al reenviar código:', error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            await fetch(`${AuthService.baseUrl}/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                },
            });
            localStorage.removeItem('auth_token');
        } catch (error) {
            console.error('Error en logout:', error);
            throw error;
        }
    }

    async getCurrentUser(): Promise<AuthResponse['user'] | null> {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) return null;

            const response = await fetch(`${AuthService.baseUrl}/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener usuario');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            return null;
        }
    }
}

export default AuthService.getInstance();