// API Configuration for Hybrid Deployment
// This allows switching between different backend environments

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  endpoints: {
    contact: string;
    courses: string;
    newsletter: string;
  };
  headers: Record<string, string>;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Environment configurations
const configurations: Record<string, ApiConfig> = {
  // Development with local PHP backend
  development: {
    baseUrl: 'http://localhost:8080',
    timeout: 10000,
    retries: 3,
    endpoints: {
      contact: '/api/contact',
      courses: '/api/courses',
      newsletter: '/api/newsletter',
    },
    headers: {
      'Content-Type': 'application/json',
    }
  },
  
  // Development with Netlify Functions (local)
  development_netlify: {
    baseUrl: 'http://localhost:8080',
    timeout: 15000,
    retries: 2,
    endpoints: {
      contact: '/.netlify/functions/contact',
      courses: '/.netlify/functions/courses',
      newsletter: '/.netlify/functions/newsletter',
    },
    headers: {
      'Content-Type': 'application/json',
    }
  },
  
  // Production with PHP backend (separate hosting)
  production_php: {
    baseUrl: import.meta.env.VITE_PHP_API_URL || 'https://your-php-backend.com',
    timeout: 10000,
    retries: 3,
    endpoints: {
      contact: '/api/contact',
      courses: '/api/courses', 
      newsletter: '/api/newsletter',
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },
  
  // Production with Netlify Functions
  production_netlify: {
    baseUrl: '',
    timeout: 15000,
    retries: 2,
    endpoints: {
      contact: '/.netlify/functions/contact',
      courses: '/.netlify/functions/courses',
      newsletter: '/.netlify/functions/newsletter',
    },
    headers: {
      'Content-Type': 'application/json',
    }
  },
  
  // Production with Vercel Functions
  production_vercel: {
    baseUrl: '',
    timeout: 15000,
    retries: 2,
    endpoints: {
      contact: '/api/contact',
      courses: '/api/courses',
      newsletter: '/api/newsletter',
    },
    headers: {
      'Content-Type': 'application/json',
    }
  },
  
  // Static build (no backend)
  static: {
    baseUrl: '',
    timeout: 5000,
    retries: 1,
    endpoints: {
      contact: '/contact',
      courses: '/data/courses.json',
      newsletter: '/newsletter',
    },
    headers: {
      'Content-Type': 'application/json',
    }
  }
};

// Detect deployment platform
const getDeploymentPlatform = (): string => {
  // Check for Vercel
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return 'vercel';
  }
  
  // Check for Netlify
  if (typeof window !== 'undefined' && (
    window.location.hostname.includes('netlify.app') ||
    window.location.hostname.includes('netlify.com')
  )) {
    return 'netlify';
  }
  
  return 'unknown';
};

// Get current environment
const getEnvironment = (): string => {
  const isDev = import.meta.env.DEV;
  const useNetlifyFunctions = import.meta.env.VITE_USE_NETLIFY_FUNCTIONS === 'true';
  const platform = getDeploymentPlatform();
  
  if (isDev) {
    // Development environment
    if (useNetlifyFunctions) {
      return 'development_netlify';
    }
    return 'development';
  }
  
  // Production environment
  if (useNetlifyFunctions || platform === 'netlify') {
    return 'production_netlify';
  }
  
  if (platform === 'vercel') {
    return 'production_vercel';
  }
  
  // Check if it's a static build
  if (import.meta.env.MODE === 'static') {
    return 'static';
  }
  
  // Default to PHP backend
  return 'production_php';
};

// Environment detection utilities
export const isNetlifyEnvironment = (): boolean => {
  return getEnvironment().includes('netlify');
};

export const isVercelEnvironment = (): boolean => {
  return getEnvironment().includes('vercel');
};

export const isPHPEnvironment = (): boolean => {
  return getEnvironment().includes('php');
};

export const isStaticEnvironment = (): boolean => {
  return getEnvironment() === 'static';
};

export const isDevelopmentEnvironment = (): boolean => {
  return import.meta.env.DEV;
};

// API client utility
export class ApiClient {
  private config: ApiConfig;
  private abortControllers: Map<string, AbortController> = new Map();
  
  constructor() {
    this.config = apiConfig;
    
    // Log current configuration in development
    if (isDevelopmentEnvironment()) {
      console.log('API Client Configuration:', {
        environment: getEnvironment(),
        baseUrl: this.config.baseUrl,
        endpoints: this.config.endpoints
      });
    }
  }
  
  private getFullUrl(endpoint: string): string {
    return `${this.config.baseUrl}${endpoint}`;
  }
  
  private async makeRequest(
    url: string,
    options: RequestInit,
    retries: number = this.config.retries
  ): Promise<Response> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          return response;
        }
        
        // Don't retry on client errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          throw new Error(`Client error: ${response.status} ${response.statusText}`);
        }
        
        // Retry on server errors (5xx) or network errors
        if (attempt === retries) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
        
      } catch (error) {
        if (attempt === retries) {
          throw error;
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
    
    throw new Error('Max retries exceeded');
  }
  
  async post<T = unknown>(endpoint: keyof ApiConfig['endpoints'], data: unknown): Promise<ApiResponse<T>> {
    try {
      // Handle static environment
      if (isStaticEnvironment()) {
        console.warn('API calls not available in static environment');
        return {
          success: false,
          error: 'API functionality not available in static mode'
        };
      }
      
      const url = this.getFullUrl(this.config.endpoints[endpoint]);
      
      const response = await this.makeRequest(url, {
        method: 'POST',
        headers: this.config.headers,
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      return {
        success: true,
        data: result,
      };
      
    } catch (error) {
      console.error(`API POST error for ${endpoint}:`, error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
  
  async get<T = unknown>(endpoint: keyof ApiConfig['endpoints'], params?: Record<string, string>): Promise<ApiResponse<T>> {
    try {
      let url = this.getFullUrl(this.config.endpoints[endpoint]);
      
      if (params) {
        const searchParams = new URLSearchParams(params);
        url += `?${searchParams.toString()}`;
      }
      
      const response = await this.makeRequest(url, {
        method: 'GET',
        headers: this.config.headers,
      });
      
      const result = await response.json();
      
      return {
        success: true,
        data: result,
      };
      
    } catch (error) {
      console.error(`API GET error for ${endpoint}:`, error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
  
  // Cancel all pending requests
  cancelAllRequests(): void {
    this.abortControllers.forEach(controller => controller.abort());
    this.abortControllers.clear();
  }
  
  // Get current configuration (useful for debugging)
  getConfig(): ApiConfig {
    return { ...this.config };
  }
  
  // Health check endpoint
  async healthCheck(): Promise<boolean> {
    try {
      if (isStaticEnvironment()) {
        return true; // Static builds don't have health checks
      }
      
      const response = await fetch(this.config.baseUrl + '/health', {
        method: 'GET',
        headers: this.config.headers,
      });
      
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Export current configuration
export const apiConfig = configurations[getEnvironment()];

// Export environment info
export const environmentInfo = {
  current: getEnvironment(),
  isDev: isDevelopmentEnvironment(),
  isNetlify: isNetlifyEnvironment(),
  isVercel: isVercelEnvironment(),
  isPHP: isPHPEnvironment(),
  isStatic: isStaticEnvironment(),
};

// Export singleton instance
export const apiClient = new ApiClient();

// Development utilities
if (isDevelopmentEnvironment()) {
  // Make apiClient available globally for debugging
  (window as unknown as { apiClient: ApiClient; environmentInfo: typeof environmentInfo }).apiClient = apiClient;
  (window as unknown as { apiClient: ApiClient; environmentInfo: typeof environmentInfo }).environmentInfo = environmentInfo;
}
