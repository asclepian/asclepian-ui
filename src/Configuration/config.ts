// config.ts
export interface DynamicConfig {
    apiUrl: string;
    environment: "DEV" | "TST" | "AKC" | "PROD";
  }
  
  export const defaultConfig: DynamicConfig = {
    apiUrl: "",
    environment: "DEV"
  };
  
  class GlobalConfig {
    config: DynamicConfig = defaultConfig;
  }
  
  export const globalConfig = new GlobalConfig();
  
  export const globalConfigUrl = "config.json";