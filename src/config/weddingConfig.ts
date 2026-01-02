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
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: "امین",
    bride: "مهتا"
  },
  event: {
    date: "جمعه، ۲۴ شهریور ۱۴۰۳",
    time: "از ساعت ۱۹ الی ۲۳",
    location: "تهران",
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
    url: "https://irsv.upmusics.com/Downloads/Musics/Mohammad%20Noori%20%7C%20Az%20Cheshm%20To%20Mibinam(128).mp3",
    volume: 0.5
  }
};
