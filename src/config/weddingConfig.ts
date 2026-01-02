export interface WeddingConfig {
  couple: {
    groom: string;
    bride: string;
  };
  event: {
    date: string;
    time: string;
    location: string;
    dateLabel: string;
    timeLabel: string;
    locationLabel: string;
  };
  message: {
    greeting: string;
    body: string[];
    invitationText: string;
  };
  audio: {
    url: string;
    volume: number;
  };
  navigation: {
    neshan: string;
    googleMaps: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: "امین",
    bride: "مهتا"
  },
  event: {
    date: "پنجشنبه، ۲۳ بهمن ۱۴۰۳",
    time: "از ساعت ۱۱:۳۰  الی ۱۴:۰۰",
    location: "آدرس\nشهرک آزمایش، بلوار آریافر، خیابان معتمدی، پلاک ۲۰\n",
    dateLabel: "📅 تاریخ:",
    timeLabel: "⏰ ساعت:",
    locationLabel: "📍 مکان:"
  },
  message: {
    greeting: "به نام خدا",
    body: [
      "آری گفتنِ دو دل",
      "آغاز قصه‌ای ماندگار است",
      "خوشحال می‌شویم",
      "در شب عقدکنون و بله‌برون‌مان",
      "در کنار ما باشید."
    ],
    invitationText: "برای مشاهده کارت ضربه بزنید"
  },
  audio: {
    url: "./assets/wedding-music.mp3",
    volume: 0.5
  },
  navigation: {
    neshan: "https://nshn.ir/f9_bv_CqVx4bPL",
    googleMaps: "https://maps.app.goo.gl/6LSK9L1ucMmy7wcx9"
  }
};
