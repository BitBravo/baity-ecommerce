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
    
  }
};