export class baseUrl {
  //  public static BASE_URL: string = "http://localhost:8080/api/v1/";
  public static BASE_URL: string = "https://pro-assessment.herokuapp.com/api/v1/";
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
    public static ALERT_TITLE = "Are you sure?"
    public static UPLOAD_QN_TEXT = "You want all of these questions uploaded!"
    public static CONFIRM_UPLOAD_BTN = "Yes, upload it!"
    public static INACTIVE_TEXT = "You want this question to move to inactive!"
    public static ACTIVE_TEXT = "You want this question to move to active!"
    public static DELETE_TEXT = "You won't be able to revert this!"
    public static CONFIRM_DELETE_BTN = "Yes, delete it!"
    public static CONFIRM_INACTIVE_BTN = "Yes, Move it!"
    public static CANCEL_BTN = "No, cancel!"
}

export class commonFunctions {
  //i/p - array
  //o/p - array
  public static FIND_DUPLICATES = (arr: any) => {
    let sorted_arr = arr.slice().sort(); // You can define the comparing function here.
    // JS by default uses a crappy string compare.
    // (we use slice to clone the array so the
    // original array won't be modified)
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return results;
  };
}
