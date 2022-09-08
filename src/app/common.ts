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
  public static EMAIL_PATTERN = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
}

export class buttonValue {
  public static START_ASSESS = "Start Assessment";
  public static LOADING_ASSESS = "Loading Assessment...";
}

export class message {
  public static SOMETHING_WRONG =
    "Something went wrong. Please contact administrator";
}
