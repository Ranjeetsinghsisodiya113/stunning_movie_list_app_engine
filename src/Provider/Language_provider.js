import { Alert, ToastAndroid, I18nManager, Platform } from "react-native";
import { localStorage } from './localStorageProvider';
import { AsyncStorage } from 'react-native';
import { config } from "./configProvider";
import RNRestart from 'react-native-restart';
import { consolepro } from './Messageconsolevalidationprovider/Consoleprovider'
global.language_key = 1;
class Language_provider {

  language_get = async () => {
    var item = await localStorage.getItemObject('language');
    console.log('check launguage option', item)

    consolepro.consolelog('is rtl', I18nManager.isRTL)
    consolepro.consolelog('is rtl config', config.textalign)

    if (item != null) {
      console.log('kya bat h developer', config.language)
      config.language = item;
    }
    console.log('language_key123', config.language)
    if (item != null) {
      if (item == 0) {

        config.textalign = 'left'
        config.inverted = false
      } else {

        config.textalign = 'right'
        config.inverted = true
      }

    } else {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      config.textalign = 'left'
      config.inverted = false
      localStorage.setItemObject('language', 0)

    }
  }

  language_set = async (languagem) => {

    console.log('I18nManager.isRTL Developer', I18nManager.isRTL)
    if (languagem == 0) {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      config.textalign = 'left';
      config.inverted = false
      localStorage.setItemObject('language', 0)
      localStorage.removeItem('languagecathc')
      localStorage.removeItem('languagesetenglish');
      config.language = 0
    }
    else {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
      config.textalign = 'right';
      config.inverted = true
      localStorage.setItemObject('language', 1)
      localStorage.setItemObject('languagecathc', 0)
      config.language = 1
    }

    setTimeout(() => {
      RNRestart.Restart()
    }, 500);
  }
  // Media option ///////////////////
  MediaCamera = ['Choose Camera', ''];
  Mediagallery = ['Choose Gallery', ''];
  cancelmedia = ['Cancel', ''];

  //-----------not for developer use start ------------------//
  go_back_txt = ['Go back', 'Go back']
  do_you_want_exit_txt = ['Do you want to exit app?', 'Do you want to exit app']
  do_you_want_goback_txt = ['Do you want to go back', 'Do you want to go back']
  verify_txt = ['Verify', 'Verify']
  resend_txt = ['Resend', 'Resend']
  email_txt = ['Email', 'Email']
  OTP_txt = ['OTP', 'OTP']
  Logout_txt = ['Logout', 'Logout']
  are_you_logout = ['Are you sure, you want to logout?', 'Are you sure , you want to logout?']
  notification_arr = ['Notification', 'Notification']
  terms_and_condition_txt = ['I accept all terms and conditions and privacy policy', 'Terms and Conditions', 'Terms and Conditions']
  privacy_policy_txt = ['Privacy Policy', 'Privacy Policy']
  about_us_txt = ['About Us', 'About Us']
  delete_account_txt = ['Delete Account', 'حذف الحساب']
  are_you_sure_delete_txt = ['Are you sure you want to delete your account?', 'هل انت متأكد من حذف الحساب؟']
  content_not_found = ['Content Not Available', 'Content Not Available']
  Contactus = ['Contact Us', 'Contact Us']
  changepassword_txt = ['Change Password', 'Change Password']
  Setting = ['Setting', 'Setting']
  notification = ['NOTIFICATIONS', 'notification']
  rate_app = ['Rate App', 'Rate App']
  share_app = ['Share App', 'Share App']
  Logout = ['Logout', 'Logout']
  Show = ['Show', 'Show']
  Hide = ['Hide', 'Hide']

  resendOtp = ['Resend OTP']

  //--for chat start --------

  online_txt = ['Online',]
  offline_txt = ['Offline',]
  type_something_txt = ['Type Something',]

  //-----------------------chat page-------------------------------//
  chattextinputmessage = ['Message', '']
  chataction = ['Action', 'Action', '']
  chatreport = ['Report User', '']
  chatclear = ['Clear Chat', '']
  chatcancel = ['Cancel', '']
  reportmessagepopup = ['Are your sure you want to ? report', '']
  chatclearpopup = ['Are your sure you to ? clear chat', '']
  ChooseMedia = ['Choose', ''];
  Confirm = ["Confirm", '']
  block_permission = ['Are you sure? you want to block this user', '']
  unblock_permission = ['Are you sure? you want to unblock this user', '']
  select_option_txt = ['Select Option', '']
  report_txt = ['Report', '']
  chats_txt = ['Chats', '']
  block_txt = ['Block', '']
  unblock_txt = ['Unblock', '']
  cancel_txt = ['Cancel', '']
  submit_txt = ['Submit', '']
  reason_txt = ['Reason', '']
  search_here_txt = ['Search here',]
  you_blocked_this_user = ['You Block this person']
  no_txt = ['No', 'No']
  yes_txt = ['Yes', 'Yes']
  //--for chat end --------

  //-------create password start-------------//
  create_password_txt = ['Create Password']
  //-------create password end -------------//
  //-------Delete Account start-------------//
  delete_acc_txt = ['Delete Account']
  delete_acc_headingtxt = ['DELETE ACCOUNT']
  //-------Delete Account end -------------//
  //-------FAQ's"start-------------//
  faq_txt = ["FAQ's"]
  //-------FAQ's"end -------------//

  //-----------notification start ---------//
  notifications_txt = ['Notifications']
  clear_all = ['Clear All']
  info = ['Information']
  areyousure_txt = ['Are you sure, you want to clear notifications?']
  //-----------notification end

  //----------signup----------//
  signup_txt = ['Sign up']
  fullname_txt = ['Full Name']
  mobile_no_txt = ['Mobile Number']
  address_txt = ['Address']
  pincode_txt = ['Pin Code']
  cpass_txt = ['Confirm Password']
  iaccept_txt = ['I Accept all']
  terms_txt = ['terms & conditions']
  changepassword_txt = ['Change Password']
  and_txt = ['and']
  Privacy_policy_txt = ['privacy policy']
  you_already_txt = ['Already have an account?']
  email_txt = ['Email']
  india_txt = ['India']
  canada_txt = ['Canada']
  enter_password = ['Password'];
  login_txt = ['Login'];
  Dont_have_account = ["Don't have an account?"];
  forgot_txt = ["Forgot Password?"];
  forget_password = ["Forget Password"];
  service_provider = ["Service Provider"]
  customer = ['Customer'];
  first_name = ["First Name"];
  last_name = ["Last Name"];
  phone_no_txt = ['Phone Number']
  mobile_no_txt = ["Mobile Number"];
  firstName = ["Enter first name"];
  lastName = ["Enter last name"];
  Number = ["Enter mobile number"];
  email = ["Enter email"];
  pwd = ["Enter password"];
  cpwd = ["Confirm password"];
  or = ["Or"];

  rateNowTxt = ["Rate Now"];

  currentPassword = ["Current Password"];
  newPassword = ["New Password"];
  confirmNewPassword = ["Confirm New Password"];

  modifyNumber = ["Modify Number"];
  enterVerificationCodeTxt = ["Enter Verification Code"];

  pleaseEnterFourDigitCodeTxt = ['Please enter the 4-digits code sent to']

  Send_txt = ["Send"];

  update_txt = ["Update"];

  Avinash = ["Avinash Chauhan"];

  location = ["A 70, Mount Kailash Apartment"];

  categories = ["Categories"];
  viewAll = ["View All"];
  mostBookedServicesTxt = ["Most Booked Services"]

  basinTxt = ["Basin & Sink"];
  subTxt = ["Waste Pipe Leakage"];
  rating = ["4.5"];
  rs = ["₹ 100"];

  findDeepCleanTxt = ['Find Deep clean'];
  servicesTxt = ['Services'];
  nearYouTxt = ['near you'];
  electricalTxt = ["Electrial"];
  plumberTxt = ["Plumber"];
  searchTxt = ['Search'];

  bookingDetailsTxt = ["Booking Details"];
  serviceDetailsTxt = ["Service Details"];
  providerDetailsTxt = ["Provider Detail"];
  customerDetailsTxt = ["Customer Details"];
  bookingId = ["Booking ID: #9238982382"];

  completedTxt = ["Completed"];
  dateTxt = ["Date :"];
  dateNumberTxt = ["27-Apr-2023"];
  timeTxt = ["Time :"];
  timeNumberTxt = [" 09 : 00 AM"];
  VisitingChargesTxt = ["Visiting Charges :"];
  wastePipeTxt = ["Waste Pipe Leakage"];
  blockageTxt = ["Wash Basin Blockage"];
  removalTxt = ["Removal"];
  customerNAmeTxt = ["Customer Name"];

  numberTxt = ["+91 1234567895"];

  avinashMail = ['avinashchauhan@gmail.com'];

  customerAddress = ["Customer Address"];
  addressTxt = ["271 / Raman Smruti Bldg V P Road,Delhi,400004,India"];

  problemImg = ["Images of problem area"];

  mayankTxt = ["Mayank Patidar"];
  mayankNoTxt = ["+91 9836476483"];
  trackingTxt = ["Tracking"];
  rateNowTxt = ["Rate Now"];

  acceptedtx = ["Accepted"];
  ontTheWayTxt = ["On the way"];
  reachedTxt = ["Reached"];
  startWorkTxt = ["Start Work"];
  completeWorkTxt = ["Complete Work"];
  completeWorkTxt = ["Complete Work"];
  showLessTxt = ["Show less"];

  trackingDetailsTxt = ['27-Apr-2023,8:30 PM'];
  showLessTxt = ['Show less'];
  messageTxt = ["Messages"];
  profileTxt = ["Profile"];
  editProfileTxt = ["Edit Profile"];
  manageAddressTxt = ["Manage Address"];
  myRatingsTxt = ["My Ratings"];
  faqTxt = ["FAQ's"];
  termsConditionTxt = ["Terms & Condition"];
  wastePipeLeakageTxt = ["Waste Pipe Leakage, Wash Basin Blockage"];
  removal2Txt = ["Removal"];
  providerTxt = ["Provider"];
  userRivewTxt = ["Fantastic Company! Excellent Customer Serice, efficient"];
  processTxt = ["process"];
  groutingTxt = ["Grouting"];

  //  =========01-08-23===============================


  Welcome_to_agriCab = ["Welcome to AgriCab"];
  lorem_ipsum_txt = ["Lorem ipsum dolor sit amet, consectetur. \nPretium lectus sit veverra urna"];
  SignUp_upperTxt = ["SIGN UP"];
  Step_1_txt = ["STEP 1 OF 5"];
  Step_2_txt = ["STEP 2 OF 5"];
  Step_3_txt = ["STEP 3 OF 5"];
  Step_4_txt = ["STEP 4 OF 5"];
  Step_5_txt = ["STEP 5 OF 5"];
  Step_6_txt = ["STEP 6 OF 6"];
  cellPhoneNumber_txt = ["Cellphone number"];
  allYourInfo_txt = ["All your information is encrypted and stored\nsecurely. We'll never share your phone number or any personal data"];
  cell_no_txt = ["Cell number"];
  twentySeven_txt = ["+27"];
  enter_your_cellNo = ["Enter your cell number"];
  warn_txt = ["*Your cell number must be a South African number\n  to sign up"];
  next_txt = ["Next"];
  already_signed_up_txt = ["Already Signed Up?"];
  log_in_txt = ["Log in"];
  Are_you_txt = ["Are you?"];
  customer_txt = ["Customer"];
  Owner_txt = ["Owner"];
  we_sent_an_txt = ["We sent an SMS with a 4-digit code to your\nnumber: +27 82382 76890. Please enter it so\nwe can be sure that this number belongs to you"];
  dontRecieve_txt = ["Didn't recieve the OTP?"];
  send_otp_again_txt = ["Send OTP again"];
  change_phone_number_txt = ["Change phone number"];
  Personal_Details_txt = ["Personal details"];
  first_name_txt = ["First name"];
  enter_your_first_name = ["Enter your first name"];
  enter_your_Surname = ["Enter your surname"];
  enter_your_email = ["Enter your email address"];
  surname_txt = ["Surname"];
  sex_at_birth_txt = ["Sex at birth"];
  female_txt = ["Female"];
  Male_txt = ["Male"];
  not_to_txt = ["Prefer not to specify"];
  email_address_txt = ["Email address"];
  optional_txt = ["Optional"];
  Add_Id_or_passport_txt = ["Add ID or passport\nnumber"];
  lorem_ipsum_txt_2 = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ullamcorper sagittis ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed tempus orci vitae vestibulum facilisis. Donec bibendum venenatis est a sodales"];
  select_identification_type_txt = ["Select identification type"];
  Sa_ID_txt = ["SA ID number"];
  enter_your_digit_id = ["Enter your 13-digit ID number"];
  passport_number = ["Passport number"];
  agreement_txt = ["Agreement"];
  iagree_to_the_txt = ["I agree to the"];
  if_you_rather_txt = ["If you'd rather not read all the information,\nthe important bits are:"];
  lorem_ipsum_txt_3 = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ullamcorper sagittis ullamcorper pellentesque morbi"]
  lorem_ipsum_txt_4 = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ullamcorper sagittis ullamcorper pellentesque morbi Duis ullamcorper"]

  keep_me_informed_txt = ["keep me informed (Optional)"]


  // ======02-08-23==========

  logo_txt = ["LOGO"]
  exit_app_txt = ["Exit App"]
  hello_albert = ["Hello Albert,"]
  how_can_we_txt = ["how can we help you"]
  today_txt = ["today :)"]
  home_txt = ["Home"]
  liveMap_txt = ["Live Map"]
  tractors_txt = ["Tractors"]
  settings_txt = ["Setting"]
  addNew_trip = ["Add New Trip"]
  pickUp_location_txt = ["Your pick up location"]
  dropOff_location_txt = ["Your drop-off location"]
  selectLocation_txt = ["Select location"]
  continue_txt = ["Continue"]
  live_map_txt = ["LIVE MAP"]
  Tractors_heading = ["TRACTORS"]
  settings_upper_txt = ["SETTINGS"]
  Albert_roy = ["Albert Roy"]
  albertMail = ["Albertroy12@gmail.com"]
  albertNoTxt = ["YYMMDDSSSSCAZ"]
  editProfile_txt = ["Edit Profile"]
  MyTrips_txt = ["My Trips"]
  MyWallet_txt = ["My Wallet"]
  emergency_contactUs = ["Emergency Contacts"]
  myCard_txt = ["My Card"]
  wallet_txt = ["MY WALLET"]
  transaction_txt = ["Transaction History"]
  currentBalanceTxt = ["Current Balance"]
  emergencyContact = ["EMERGENCY CONTACT"]
  addEmergencyContact = ["Add your emergency contact"]
  Driver_btn = ["Driver"]
  Add_contact_txt = ["ADD CONTACT"]
  name_txt = ["Name"]
  addContact_txt = ['Add Contact']
  enter_your_name = ['Enter your name']
  myCard = ['MY CARD']
  EditProfile = ['EDIT PROFILE']
  cahngeProfilePic = ['Change Profile Picture']
  termsAndCondition_uppertxt = ['TERMS & CONDITION']
  privacyPolicy_uppertxt = ['PRIVACY POLICY']
  aboutUs_uppertxt = ['ABOUT US']
  MyTrips_upperTxt = ['MY TRIPS']

  //-----------not for developer use end ------------------//
  // ranjeet

  bookingId_txt = ['Booking ID: ']
  private_txt = ['Private']
  business_txt = ['Business']
  accept_txt = ['Accept']
  reject_txt = ['Reject']
  Pending = ['Pending']
  Ongoing = ['Ongoing']
  Completed = ['Completed']
  assign_driver_details = ['Assign Driver Details']
  BookingDetails = ['BOOKING DETAILS']
  your_trip = ['Your Trip']
  customer_info_txt = ['Customer Informaion']
  Total_KM = ['Total km']
  price_per_KM = ['Price/km']
  Total_price_txt = ['Total price']
  Track_loction = ['Track Location']
  LiveMap_txt = ['LIVE MAP']
  Tractor_txt = ['TRACTORS']
  Driver_txt = ['DRIVERS']
  Driverdetail_txt = ['Driver Details']

  AssignTo = ['Assign to']
  Add_tractor = ['ADD TRACTOR']
  vehicle_registoration = ['Vehicle registration']
  enter_vehicle_registoration = ['Enter your vehicle registration']
  Make_txt = ['Make']
  select_Make_txt = ['Select make']
  Model_txt = ['Model']
  select_model_txt = ['Select model']
  oddometer = ['Odometer']
  enter_oddometer = ['Enter odometer']
  select_model_txt = ['Select model']
  tractor_product = ['Tractor product']
  enter_tractor_product = ['Enter tractor product']
  Booking_price_per_km = ['Booking price(per km)']
  Enter_Booking_price_per_km = ['Enter Booking Price']
  Add = ['Add']
  distance_history_txt = ['Distance History (in km)']
  reminder_txt = ['Reminders']
  add_reminder_txt = ['Add Reminder']
  no_reminder_txt = ['No reminders  within the next 30 days']
  Edit_tractor = ['EDIT']
  trip_log_txt = ['TRIP LOGS']
  trip_hisrory_txt = ['TRIP HISTORY']
  distance_hisroryheading_txt = ['DISTANCE HISTORY']
  vehicle_information_txt = ['VEHICLE INFORMATION']
  Latest_txt = ['Latest']
  GPS_coor_txt = ['GPS Coordinates']
  Battery_txt = ['Battery']
  Status_txt = ['Status']
  Update_on_txt = ['Update on']
  vehicle_details_txt = ['Vehicle Detail']
  Tractor_Product_txt = ['Tractor Product']
  Alias_txt = ['Alias']
  Avatar_txt = ['Avatar']
  Vehicle_Registoration_txt = ['Vehicle Registoration']
  Make_Model_txt = ['Make and Model']
  Tractor_Product_txt = ['Tractor Product']
  Add_Driver_txt = ['ADD DRIVER']
  DriverFirstName_txt = ['Driver first name']
  DriverSurName_txt = ['Driver surname']
  DriverCellnumber_txt = ['Driver cell number']
  DriverEmail_txt = ['Driver Email']
  EnterDriverFirstName_txt = [' Enter driver first name']
  EnterDriverSurName_txt = ['Enter driver surname']
  EnterDriverCellnumber_txt = ['Eneter driver cell number']
  EnterDriverEmail_txt = ['Enter driver Email']
  EnterIDNumber_txt = ['Enter your 3 digit ID number']
  Driver_Information = ['Driver Information']
  
  Review = ['Review']
  lorem_ipsum_ow_txt=['Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit ']
  DRIVERINFORMATION_txt=['DRIVER INFORMATION']
  Driver_SA_ID_TXT=['Driver SA ID numver']
  book_txt=['Book']
  Book_heading_txt=['BOOK']
  select_type_txt=['Select type']
  your_pickup_location=['Your pick-up location']
  your_drop_off_location=['Your drop-off location']
  select_location_txt=['Select location']
  Pay_now_txt=['Pay now']
  Add_card=['ADD CARD']
  Add_card_btn=['Add Card']
  card_number_txt=['Card number']
  card_holder_name_text=['Card holder name'] 
  Expiration_date=['Expiration date']
  Cvv_txt=['CVV']
  
  
  //mohit
  details = ['Details']
  vehicle_info = ['Vehicle Information']
  trip = ['Trip Log']
  provete = ['Private']
  business = ['Business']
  trip_hisrory = ['Trip History (km)']


  // ======Surbhi==========
  williamhe = ['William Henry']
  ongoing_txt = ['Ongoing']
  pending_txt = ['Pending']
  private_txt = ['Private']
  business_txt = ['Business']
  BookingD_txt = ['BOOKING DETAILS']
  vehicleinfo = ['Vehicle Information']
  customerinfo = ['Customer Information']
  yourtrip = ['Your Trip']
  totalKM = ['Total km']
  priceKM = ['Price/km']
  totalprice = ['Total Price']
  startwork = ['Start Work']

   // ======Surbhi 03-08-23==========
   reachedpick = ['Reached pick-up location']
   reacheddrop = ['Reached drop-off location']
   customerreview = ['Customer Review']
   datecan = ['11 Jul 2023,11:00 AM']
   
RATENOW=["RATE NOW"]
   rateDivider = ['Rate a driver']
   enter_msg = ['Enter Message']
   filter = ['FILTER']
   reset = ['Reset']
   done = ['Done']
}
export const Lang_chg = new Language_provider();