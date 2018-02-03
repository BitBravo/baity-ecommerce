import validator from 'validator';//https://github.com/chriso/validator.js

const mycities = [{id:1,name_ar:"الرياض"},{id:2,name_ar:"مكة المكرمة"},{id:3,name_ar:"المدينة المنورة"},{id:4,name_ar:"الدمام"},{id:5,name_ar:"جدة"},{id:6,name_ar:"بريدة"},{id:7,name_ar:"أبها"},{id:8,name_ar:"جازان"},{id:9,name_ar:"حائل"},{id:10,name_ar:"تبوك"},{id:11,name_ar:"نجران"},{id:12,name_ar:"الجوف"},{id:13,name_ar:"الباحة"},{id:14,name_ar:"الحدود الشمالية"},{id:15,name_ar:"الطائف"},{id:16,name_ar:"الأحساء"},{id:17,name_ar:"الخرج"},{id:18,name_ar:"ينبع"},{id:19,name_ar:"حفر الباطن"},{id:20,name_ar:"القطيف"},{id:21,name_ar:"عنيزة"},{id:22,name_ar:"خميس مشيط"},{id:23,name_ar:"المجمعة"},{id:24,name_ar:"الزلفي"},{id:25,name_ar:"وادي الدواسر"},{id:26,name_ar:"الدوادمي"},{id:27,name_ar:"الدرعية"},{id:28,name_ar:"شقراء"},{id:29,name_ar:"عفيف"},{id:30,name_ar:"القويعية"},{id:31,name_ar:"العلا"},{id:32,name_ar:"رابغ"},{id:33,name_ar:"الجبيل"},{id:34,name_ar:"الخفجي"},{id:35,name_ar:"بقيق"},{id:36,name_ar:"الرس"},{id:37,name_ar:"البكيرية"},{id:38,name_ar:"المذنب"},{id:39,name_ar:"بيشة"},{id:40,name_ar:"ظهران الجنوب"},{id:41,name_ar:"النماص"},{id:42,name_ar:"محائل"},{id:43,name_ar:"بلجرشي"},{id:44,name_ar:"تيماء"},{id:45,name_ar:"صبياء"},{id:46,name_ar:"فيفا"},{id:47,name_ar:"القريات"},{id:48,name_ar:"الأفلاج"},{id:49,name_ar:"حوطة بني تميم"},{id:50,name_ar:"الغاط"},{id:51,name_ar:"السليل"},{id:52,name_ar:"ضرماء"},{id:53,name_ar:"حريملاء"},{id:54,name_ar:"مرات"},{id:55,name_ar:"المزاحمية"},{id:56,name_ar:"ثادق"},{id:57,name_ar:"الحريق"},{id:58,name_ar:"حوطة سدير"},{id:59,name_ar:"تمير"},{id:60,name_ar:"روضة سدير"},{id:61,name_ar:"جلاجل"},{id:62,name_ar:"الرين"},{id:63,name_ar:"الدلم"},{id:64,name_ar:"الحناكية"},{id:65,name_ar:"خيبر"},{id:66,name_ar:"بدر"},{id:67,name_ar:"وادي الفرع"},{id:68,name_ar:"القنفذة"},{id:69,name_ar:"الليث"},{id:70,name_ar:"خليص"},{id:71,name_ar:"رأس تنورة"},{id:72,name_ar:"النعيرية"},{id:73,name_ar:"البدائع"},{id:74,name_ar:"الأسياح"},{id:75,name_ar:"رياض الخبراء"},{id:76,name_ar:"الخبراء"},{id:77,name_ar:"تثليث"},{id:78,name_ar:"أحد رفيدة"},{id:79,name_ar:"تنومه"},{id:80,name_ar:"سرات عبيدة"},{id:81,name_ar:"بلقرن"},{id:82,name_ar:"البقعاء"},{id:83,name_ar:"تربة حائل"},{id:84,name_ar:"قلوه"},{id:85,name_ar:"المندق"},{id:86,name_ar:"ضباء"},{id:87,name_ar:"الوجه"},{id:88,name_ar:"أملج"},{id:89,name_ar:"حقل"},{id:90,name_ar:"بيش"},{id:91,name_ar:"أبي عريش"},{id:92,name_ar:"صامطة"},{id:93,name_ar:"شروره"},{id:94,name_ar:"دومة الجندل"},{id:95,name_ar:"طبرجل"},{id:96,name_ar:"صوير"},{id:97,name_ar:"رفحاء"},{id:98,name_ar:"طريف"},{id:99,name_ar:"رنية"},{id:100,name_ar:"تربة"},{id:101,name_ar:"الخرمة"},{id:102,name_ar:"رماح"},{id:103,name_ar:"الحلوة"},{id:104,name_ar:"الهياثم"},{id:105,name_ar:"العيينة والجبيلة"},{id:106,name_ar:"الرويضة"},{id:107,name_ar:"ساجر"},{id:108,name_ar:"البجادية"},{id:109,name_ar:"نفي"},{id:110,name_ar:"القصب"},{id:111,name_ar:"الهدار"},{id:112,name_ar:"الأرطاوية"},{id:113,name_ar:"الجمجوم"},{id:114,name_ar:"المهد"},{id:115,name_ar:"ينبع النخل"},{id:116,name_ar:"العيص"},{id:117,name_ar:"الكامل"},{id:118,name_ar:"أضم"},{id:119,name_ar:"القوز"},{id:120,name_ar:"العريضة الجنوية"},{id:121,name_ar:"قرية العليا"},{id:122,name_ar:"الرفيعة"},{id:123,name_ar:"مليجه"},{id:124,name_ar:"ضريه"},{id:125,name_ar:"عيون الجواء"},{id:126,name_ar:"النبهانية"},{id:127,name_ar:"الشماسية"},{id:128,name_ar:"عقلة الصقور"},{id:129,name_ar:"البصر"},{id:130,name_ar:"دخنه"},{id:131,name_ar:"رجال ألمع"},{id:132,name_ar:"المجاردة"},{id:133,name_ar:"طريب"},{id:134,name_ar:"الحرجة"},{id:135,name_ar:"بللسمر"},{id:136,name_ar:"البشائر"},{id:137,name_ar:"موقق"},{id:138,name_ar:"الحائط"},{id:139,name_ar:"السليمي"},{id:140,name_ar:"الشملي"},{id:141,name_ar:"سميراء"},{id:142,name_ar:"جبه"},{id:143,name_ar:"الروضة"},{id:144,name_ar:"الكهفه"},{id:145,name_ar:"الخطه"},{id:146,name_ar:"المخواة"},{id:147,name_ar:"العقيق"},{id:148,name_ar:"القرى"},{id:149,name_ar:"البدع"},{id:150,name_ar:"أحد المسارحة"},{id:151,name_ar:"فرسان"},{id:152,name_ar:"الطوال"},{id:153,name_ar:"ضمد"},{id:154,name_ar:"العارضة"},{id:155,name_ar:"وادي جازان"},{id:156,name_ar:"الموسم"},{id:157,name_ar:"يدمه"},{id:158,name_ar:"حبونا"},{id:159,name_ar:"سلطانة"},{id:160,name_ar:"العويقيلة"},{id:161,name_ar:"المويه"},{id:162,name_ar:"يبرين"},{id:163,name_ar:"الجمش"},{id:164,name_ar:"أشيقر"},{id:165,name_ar:"حلبان"},{id:166,name_ar:"عروى"},{id:167,name_ar:"الحمر"},{id:168,name_ar:"بدائع العيضان"},{id:169,name_ar:"الحصاة"},{id:170,name_ar:"الجلة وتبراك"},{id:171,name_ar:"البديع"},{id:172,name_ar:"الحيانة والبرك"},{id:173,name_ar:"السر"},{id:174,name_ar:"عسفان"},{id:178,name_ar:"مدركة"},{id:179,name_ar:"الحسو"},{id:180,name_ar:"النخيل"},{id:181,name_ar:"المسيجد والقاحة"},{id:182,name_ar:"العشاش"},{id:183,name_ar:"السويرقية"},{id:184,name_ar:"ثرب"},{id:185,name_ar:"الصلصة"},{id:186,name_ar:"سليلة جهينة والمربع"},{id:187,name_ar:"حجر"},{id:188,name_ar:"المظيليف"},{id:189,name_ar:"الحلي"},{id:190,name_ar:"شواق"},{id:191,name_ar:"عريضة الشمالية"},{id:192,name_ar:"سبت الجارة"},{id:193,name_ar:"غميقة"},{id:194,name_ar:"الصرار"},{id:195,name_ar:"اللهابه"},{id:196,name_ar:"عريره"},{id:197,name_ar:"القليب"},{id:198,name_ar:"جوف بن هاجر (الجودة)"},{id:199,name_ar:"عين دار"},{id:200,name_ar:"القوارة"},{id:201,name_ar:"قبه"},{id:202,name_ar:"أبانات"},{id:203,name_ar:"الفوارة"},{id:204,name_ar:"العمار"},{id:205,name_ar:"قصيباء"},{id:206,name_ar:"شري"},{id:207,name_ar:"الفويلق"},{id:208,name_ar:"قصر بن عقيل"},{id:209,name_ar:"الدليمية"},{id:210,name_ar:"البطين"},{id:211,name_ar:"الظاهرية"},{id:212,name_ar:"بارق"},{id:213,name_ar:"البرك"},{id:214,name_ar:"بحر أبو سكينة"},{id:215,name_ar:"وادي بن هشبل"},{id:216,name_ar:"الربوعة"},{id:217,name_ar:"الحازمي"},{id:218,name_ar:"بللحمر"},{id:219,name_ar:"الفرشة"},{id:220,name_ar:"قنا"},{id:221,name_ar:"الصبيخه"},{id:222,name_ar:"بن عمرو"},{id:223,name_ar:"صمخ"},{id:224,name_ar:"النقيع"},{id:225,name_ar:"الثنية وتبالة"},{id:226,name_ar:"الأمواه"},{id:227,name_ar:"الواديين"},{id:228,name_ar:"الساحل"},{id:229,name_ar:"الشنان"},{id:230,name_ar:"الغزالة"},{id:231,name_ar:"الحليفة السفلى"},{id:232,name_ar:"فيد"},{id:233,name_ar:"الأجفر"},{id:234,name_ar:"أبنوان"},{id:235,name_ar:"الحجرة"},{id:236,name_ar:"غامد الزناد"},{id:237,name_ar:"بن حسن"},{id:238,name_ar:"بن كبير"},{id:239,name_ar:"معشوقة"},{id:240,name_ar:"بئر بن هرماس"},{id:241,name_ar:"قليبه"},{id:243,name_ar:"المنجور"},{id:244,name_ar:"الشبحه"},{id:245,name_ar:"بداء"},{id:246,name_ar:"أبو راكه"},{id:247,name_ar:"الدرب"},{id:248,name_ar:"الدائر"},{id:249,name_ar:"العدابي"},{id:250,name_ar:"هروب"},{id:251,name_ar:"الريث"},{id:252,name_ar:"الحرث"},{id:253,name_ar:"الشقيق"},{id:254,name_ar:"السهى"},{id:255,name_ar:"الحقو"},{id:256,name_ar:"الحاكمية"},{id:257,name_ar:"العالية"},{id:258,name_ar:"القفل"},{id:259,name_ar:"فوز العصافرة"},{id:260,name_ar:"بدر الجنوب"},{id:261,name_ar:"ثار"},{id:262,name_ar:"خباش"},{id:263,name_ar:"الوديعة"},{id:264,name_ar:"الحصينية"},{id:265,name_ar:"بئر عسكر"},{id:266,name_ar:"العيساوية"},{id:267,name_ar:"أبو عجرم"},{id:268,name_ar:"الناصفة"},{id:269,name_ar:"زلوم"},{id:270,name_ar:"الحديثة"},{id:271,name_ar:"نصاب"},{id:272,name_ar:"لينه"},{id:273,name_ar:"التمياط"},{id:274,name_ar:"الشريم"},{id:275,name_ar:"ابن هباس"},{id:276,name_ar:"أم خنصر"},{id:277,name_ar:"ميسان"},{id:278,name_ar:"بن سعد"},{id:279,name_ar:"المحاني"},{id:280,name_ar:"قيا"},{id:281,name_ar:"ظلم"},{id:282,name_ar:"قريع بن مالك"},{id:283,name_ar:"سلوى"},{id:284,name_ar:"البطحاء"},{id:285,name_ar:"القيصومة"},{id:286,name_ar:"الصداوي"},{id:287,name_ar:"السعيرة"},{id:288,name_ar:"الذييبة"},{id:289,name_ar:"الظهران"},{id:290,name_ar:"الخبر"}]
const mybusinesstypes = [
  ['factory','مصنع'],
  ['showroom','معرض'],
  ['freework','عمل حر'],
  ['estore','متجر الكتروني'],
  ['designer','مصمم'],
  ['consultant','استشاري']
];
const mybusinesscategories = [
  ['arch desing', 'تصميم معماري'],
  ['interior desing', 'تصميم داخلي'],
  ['wooden work', 'الأعمال الخشبية'],
  ['antiques', 'تحف'],
  ['furniture', 'اثاث'],
  ['kitchens', 'مطابخ'],
  ['floors', 'أرضيات'],
  ['paintings', 'لوحات']
];

//Shared patterns
const spacesPattern = /^([\s]+)$/;

//exported util functions and properties
export default {
  //converts indian digits into arabic ١ -> 1, ٢ -> 2 ...etc
  hindiToArabicDigits(str) {

    var result =  str
                      .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(d) {
                        return d.charCodeAt(0) - 1632;
                      });
                      // .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(d) {
                      //   return d.charCodeAt(0) - 1776;
                      // })
    return result;

  },
  //Select fields options for business profile form
  get BusinessProfileOptions() {
    return {
      get businessTypes() {
        return mybusinesstypes;
      },
      get cities() {
        return mycities;
      },
      get businessCategories() {
        return mybusinesscategories;
      }
    }
  },
  //validators for business profile form
  phoneNoValid(phoneNo){
    // const phoneNoPattern = /^(05)\d{8}$/;
    // return phoneNoPattern.test(phoneNo);
    return validator.isMobilePhone(phoneNo, 'ar-SA')
  },
  get phoneNoErrorMsg() {
    return "رقم الجوال غير صالح. يجب أن يكون رقم الجوال بالصيغة التالية: 05XXXXXXXX";
  },
  bussNameValid(bussName){
    const bussNamePattern = /^([.0-9\w\s\u00C0-\u1FFF\u2C00-\uD7FF-]{3,80})$/i;

    return bussNamePattern.test(bussName) && !spacesPattern.test(bussName);
  },
  get bussNameErrorMsg() {
    return "يجب أن يكون طول اسم الشركة بين ثلاثة أحرف وخمسين حرف لا يحتوي على رموز غير معروفة";
  },
  userNameValid(userName){
    const bussNamePattern = /^([.0-9\w\s\u00C0-\u1FFF\u2C00-\uD7FF-]{3,80})$/i;

    return bussNamePattern.test(userName) && !spacesPattern.test(userName);
  },
  get bussNameErrorMsg() {
    return "يجب أن يكون طول الاسم بين ثلاثة أحرف وخمسين حرف لا يحتوي على رموز غير معروفة";
  },
  bussDescValid(desc){
    const bussDescPattern = /^([.0-9\w\s\u00C0-\u1FFF\u2C00-\uD7FF-]{10,200})$/i;
    return bussDescPattern.test(desc) && !spacesPattern.test(desc);
  },
  get bussDescErrorMsg() {
    return " يجب أن يكون طول النبذة عن الشركة أو المؤسسة بين عشرة أحرف  و ٢٠٠ حرف"
  },
  bussWebsiteValid(website){
    return validator.isURL(website, {protocols: ['http','https']});
  },
  get bussWebsiteErrorMsg() {
    return "صيغة عنوان الموقع غير صحيحة "
  },
  emailValid(email){
    return validator.isEmail(email);
  },
  get emailErrorMsg() {
    return "البريد الالكتروني غير صحيح ";
  },
  passwordValid(password){
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(password) && !spacesPattern.test(password);
  },
  get passwordErrorMsg() {
    return "  يجب أن تكون كلمة السر خليط من الحروف اللاتينية والأرقام بطول لا يقل عن ٨ أحرف";
  }

};
