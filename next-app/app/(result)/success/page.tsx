import Result from "../result";

const SUCCESS_RESULT_TEXTS = [
  "【予約完了】",
  "予約処理が完了しました。",
  "ご登録頂いたメールアドレス宛てに予約完了メールも送信しましたのでご確認下さい。",
  "メールが届かない場合は",
  "npoterakoya2021@gmail.com",
  "からのメールを受け取れるよう受信設定を行なって下さい。",
];

export default function Page() {
  return <Result texts={SUCCESS_RESULT_TEXTS} />;
}
