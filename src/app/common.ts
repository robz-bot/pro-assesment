export class baseUrl {
    public static BASE_URL: string = "http://localhost:8080/api/v1/";
    // public static BASE_URL: string = "https://healthreview.herokuapp.com/api/v1/";
  }
  
  export class apiKey {
    public static API_KEY: string = "h1r5pr0";
  }
  
  export class patterns {
    public static ONLY_ALPHNUMERIC_PATTERN = new RegExp("^[a-zA-Z0-9]*$");
    public static EMPCODE_PATTERN = new RegExp("^[a-zA-Z0-9]+[-][a-zA-Z0-9]+$");
  }
  