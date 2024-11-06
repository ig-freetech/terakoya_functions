import { useState } from "react";
import { toast } from "react-hot-toast";

import { useEditBookingPlace } from "@apis/(booking)/bookingEditPlace";
import { useFetchBookingList } from "@apis/(booking)/bookingList";
import { BookingItem, PLACE } from "@apis/(booking)/common";
import { TODAY_JST, ISO_FORMAT } from "@utils/datetime";

/**テラコヤ種別 (terakoya_type) */
export const TERAKOYA_TYPE = {
  "-1": "-",
  1: "カフェ塾テラコヤ(池袋)",
  2: "オンラインテラコヤ(多摩)",
  3: "テラコヤ中等部(池袋)",
  4: "テラコヤ中等部(渋谷)",
  5: "ひばりヶ丘校",
  6: "神田校",
  7: "長沢校",
  8: "長南校",
  9: "谷口校",
  10: "芦田校",
  11: "忠海校",
  12: "土肥校",
  13: "泊川校",
  14: "菅田校",
  15: "山守校",
  16: "片田校",
  17: "中松校",
  18: "中津原校",
  19: "長若校",
  20: "外丸校",
  21: "上ノ加江校",
  22: "下市校",
  23: "修正校",
  24: "二升石校",
  25: "生板校",
  26: "万沢校",
  27: "徳光校",
  28: "海浦校",
  0: "その他",
} as const;

export const useManage = () => {
  const [targetDate, setTargetDate] = useState<string>(
    TODAY_JST.format(ISO_FORMAT)
  );

  const { data } = useFetchBookingList(targetDate, {
    onError: () => {
      toast.error("予約情報の取得に失敗しました");
    },
  });

  const { mutate: updatePlace } = useEditBookingPlace();

  const onSelect = (place: number, item: BookingItem) => {
    updatePlace(
      { ...item, place: place as PLACE },
      {
        onSuccess: () => {
          // Multi Line + Emoji Toast
          // https://react-hot-toast.com/
          // toast(
          //   `
          //   下記の予約情報の拠点を更新しました。\n
          //   予約日: ${item.date}\n
          //   生徒: ${item.name}\n
          //   参加希望: ${TERAKOYA_TYPE[item.terakoya_type]}
          //   `,
          //   { icon: "✅" }
          // );
          toast.success("拠点を更新しました");
        },
        onError: () => {
          toast.error("拠点の更新に失敗しました");
        },
      }
    );
  };

  return {
    bookingItemList: data?.item_list ?? [],
    setTargetDate,
    onSelect,
  };
};
