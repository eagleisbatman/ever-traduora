/**
 * Traduora API Client
 * Handles OAuth2 authentication and API requests
 */

const API_URL = process.env.NEXT_PUBLIC_TRADUORA_API_URL || '';
const CLIENT_ID = process.env.NEXT_PUBLIC_TRADUORA_CLIENT_ID || '';
const CLIENT_SECRET = process.env.NEXT_PUBLIC_TRADUORA_CLIENT_SECRET || '';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface ApiResponse<T> {
  data: T;
}

class ApiClient {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  /**
   * Get OAuth2 access token using client credentials
   */
  async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    if (!API_URL || !CLIENT_ID || !CLIENT_SECRET) {
      throw new Error('Traduora API credentials not configured. Please set NEXT_PUBLIC_TRADUORA_API_URL, NEXT_PUBLIC_TRADUORA_CLIENT_ID, and NEXT_PUBLIC_TRADUORA_CLIENT_SECRET');
    }

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Authentication failed' }));
        throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: TokenResponse = await response.json();
      this.accessToken = data.access_token;
      // Set expiry to 1 hour minus 5 minutes buffer
      this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;

      return this.accessToken;
    } catch (error) {
      console.error('Failed to get Traduora access token:', error);
      throw new Error('Failed to authenticate with Traduora API');
    }
  }

  /**
   * Make authenticated API request
   */
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = await this.getAccessToken();

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data: ApiResponse<T> = await response.json();
    return data.data;
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();

